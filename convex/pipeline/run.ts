"use node";

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { RunnableSequence, RunnableLambda } from "@langchain/core/runnables";
import type { PipelineState } from "./types";
import { extractMetadata } from "./stages/metadata";
import { checkDuplicate } from "./stages/duplicateCheck";
import { recolor } from "./stages/recoloration";
import { extractFish } from "./stages/fishExtraction";
import { classifyFish } from "./stages/classification";

export const execute = internalAction({
  args: { imageId: v.id("images") },
  handler: async (ctx, { imageId }) => {
    const image = await ctx.runQuery(internal.images.getInternal, { imageId });
    if (!image) throw new Error(`Image ${imageId} not found`);

    const blob = await ctx.storage.get(image.storageId);
    if (!blob) throw new Error("Image blob not found in storage");
    const imageBuffer = await blob.arrayBuffer();

    const initialState: PipelineState = {
      imageId,
      storageId: image.storageId,
      imageBuffer,
    };

    // Stage 2: Metadata extraction + Red Sea verification
    const metadataStage = new RunnableLambda({
      func: async (state: PipelineState) => {
        await ctx.runMutation(internal.images.updatePipelineStatus, {
          imageId,
          status: "metadata_extracted",
          currentStage: "Extracting metadata",
        });
        const result = await extractMetadata(state);
        await ctx.runMutation(internal.images.updateExif, {
          imageId,
          exif: result.exif ?? {},
          isRedSeaVerified: result.isRedSeaVerified ?? false,
        });
        return result;
      },
    });

    // Stage 3: Perceptual hash duplicate check
    const duplicateStage = new RunnableLambda({
      func: async (state: PipelineState) => {
        await ctx.runMutation(internal.images.updatePipelineStatus, {
          imageId,
          status: "duplicate_checked",
          currentStage: "Checking for duplicates",
        });
        const result = await checkDuplicate(state, ctx as any);
        if (result.isDuplicate) {
          throw new Error(
            `Near-duplicate detected. Similar to existing image: ${result.duplicateOfId}`
          );
        }
        if (!result.pHashVector) {
          throw new Error("Pipeline stage returned no pHash vector");
        }
        await ctx.runMutation(internal.images.updatePHash, {
          imageId,
          pHashVector: result.pHashVector,
        });
        return result;
      },
    });

    // Stage 4: Underwater color correction
    const recolorationStage = new RunnableLambda({
      func: async (state: PipelineState) => {
        await ctx.runMutation(internal.images.updatePipelineStatus, {
          imageId,
          status: "recolored",
          currentStage: "Analyzing color profile",
        });
        const result = await recolor(state, ctx as any);
        await ctx.runMutation(internal.images.updateRecoloration, {
          imageId,
          wasRecolored: result.wasRecolored ?? false,
          recoloredStorageId: result.recoloredStorageId,
        });
        return result;
      },
    });

    // Stage 5: Fish detection via Gemini vision
    const fishExtractionStage = new RunnableLambda({
      func: async (state: PipelineState) => {
        await ctx.runMutation(internal.images.updatePipelineStatus, {
          imageId,
          status: "fish_extracted",
          currentStage: "Detecting fish",
        });
        const result = await extractFish(state, ctx as any);
        for (const detection of result.fishDetections ?? []) {
          await ctx.runMutation(internal.fishDetections.create, {
            imageId,
            bbox: detection.bbox,
            croppedStorageId: detection.croppedStorageId,
          });
        }
        await ctx.runMutation(internal.images.updateFishCount, {
          imageId,
          fishCount: result.fishDetections?.length ?? 0,
        });
        return result;
      },
    });

    // Stage 6: Species classification via Gemini
    const classificationStage = new RunnableLambda({
      func: async (state: PipelineState) => {
        await ctx.runMutation(internal.images.updatePipelineStatus, {
          imageId,
          status: "classified",
          currentStage: "Classifying species",
        });
        const result = await classifyFish(state);
        const detections = await ctx.runQuery(
          internal.fishDetections.getByImageInternal,
          { imageId }
        );
        for (const classification of result.classifications ?? []) {
          const detection = detections[classification.detectionIndex];
          if (detection) {
            await ctx.runMutation(internal.fishDetections.updateClassification, {
              detectionId: detection._id,
              species: classification.species,
              commonName: classification.commonName,
              confidence: classification.confidence,
              classificationDetails: classification.details,
            });
          }
        }
        return result;
      },
    });

    const pipeline = RunnableSequence.from([
      metadataStage,
      duplicateStage,
      // recolorationStage, // Disabled per user request
      fishExtractionStage,
      classificationStage,
    ]);

    try {
      await pipeline.invoke(initialState);
      await ctx.runMutation(internal.images.updatePipelineStatus, {
        imageId,
        status: "completed",
      });
    } catch (error) {
      await ctx.runMutation(internal.images.updatePipelineStatus, {
        imageId,
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
});
