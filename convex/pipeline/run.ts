"use node";

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { RunnableSequence, RunnableLambda } from "@langchain/core/runnables";
import type { PipelineState } from "./types";
import { extractMetadata } from "./stages/metadata";
import { checkDuplicate } from "./stages/duplicateCheck";
import { recolor } from "./stages/recoloration";
// import { extractFish } from "./stages/fishExtraction";
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

    // Stage 3: Metadata-based duplicate check
    const duplicateStage = new RunnableLambda({
      func: async (state: PipelineState) => {
        await ctx.runMutation(internal.images.updatePipelineStatus, {
          imageId,
          status: "duplicate_checked",
          currentStage: "Checking for duplicates",
        });
        const result = await checkDuplicate(state, ctx as any);

        // Store duplicate warning but don't block pipeline
        if (result.duplicateWarning) {
          await ctx.runMutation(internal.images.updateDuplicateWarning, {
            imageId,
            warning: result.duplicateWarning,
          });
        }

        // Only block for exact duplicates
        if (result.isDuplicate) {
          throw new Error(result.duplicateWarning ?? "Duplicate image detected");
        }

        if (result.sha256) {
          await ctx.runMutation(internal.images.updateSha256, {
            imageId,
            sha256: result.sha256,
          });
        }

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
    // const fishExtractionStage = new RunnableLambda({
    //   func: async (state: PipelineState) => {
    //     await ctx.runMutation(internal.images.updatePipelineStatus, {
    //       imageId,
    //       status: "fish_extracted",
    //       currentStage: "Detecting fish",
    //     });
    //     const result = await extractFish(state, ctx as any);
    //     for (const detection of result.fishDetections ?? []) {
    //       await ctx.runMutation(internal.fishDetections.create, {
    //         imageId,
    //         bbox: detection.bbox,
    //         croppedStorageId: detection.croppedStorageId,
    //       });
    //     }
    //     await ctx.runMutation(internal.images.updateFishCount, {
    //       imageId,
    //       fishCount: result.fishDetections?.length ?? 0,
    //     });
    //     return result;
    //   },
    // });

    // Stage 6: Species classification with Red Sea guardrails
    const classificationStage = new RunnableLambda({
      func: async (state: PipelineState) => {
        await ctx.runMutation(internal.images.updatePipelineStatus, {
          imageId,
          status: "classified",
          currentStage: "Classifying fish species",
        });
        const result = await classifyFish(state);

        // Count unique species (excluding Unknown/errors)
        const validSpecies = new Set(
          result.classifications
            ?.filter((c) =>
              c.confidence > 0 &&
              c.species !== "Unknown" &&
              c.species !== "Parse Error" &&
              c.species !== "No Match"
            )
            .map((c) => c.species) ?? []
        );

        const uniqueSpeciesCount = validSpecies.size;

        // Create detection records with classifications
        for (const classification of result.classifications ?? []) {
          const detection = state.fishDetections?.[classification.detectionIndex];

          const detectionId = await ctx.runMutation(internal.fishDetections.create, {
            imageId,
            bbox: detection?.bbox ?? { x: 0, y: 0, width: 1, height: 1 },
            croppedStorageId: detection?.croppedStorageId,
          });

          await ctx.runMutation(internal.fishDetections.updateClassification, {
            detectionId,
            species: classification.species,
            commonName: classification.commonName,
            confidence: classification.confidence,
            classificationDetails: classification.details,
          });
        }

        await ctx.runMutation(internal.images.updateFishCount, {
          imageId,
          fishCount: result.classifications?.length ?? 0,
          uniqueSpeciesCount,
        });

        return result;
      },
    });

    const pipeline = RunnableSequence.from([
      metadataStage,
      duplicateStage,        // Re-enabled with metadata checking
      // recolorationStage,  // Keep disabled - not needed for demo
      // fishExtractionStage,   // Re-enabled: extracts ALL fish
      classificationStage,   // Classifies EACH fish vs Red Sea DB
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
