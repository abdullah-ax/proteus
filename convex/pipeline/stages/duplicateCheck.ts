"use node";

import type { ActionCtx } from "../../_generated/server";
import type { PipelineState } from "../types";
import { internal } from "../../_generated/api";
import crypto from "crypto";

export async function checkDuplicate(
  state: PipelineState,
  ctx: ActionCtx
): Promise<PipelineState> {
  // Compute SHA256 hash for exact duplicate detection
  const sha256 = crypto
    .createHash("sha256")
    .update(Buffer.from(state.imageBuffer))
    .digest("hex");

  // Check for exact duplicates by SHA256
  const existingImages = await ctx.runQuery(internal.images.getBySha256, { sha256 });

  // Filter out the current image (exclude self from duplicate check)
  const duplicates = existingImages.filter(
    (img) => img._id.toString() !== state.imageId.toString()
  );

  if (duplicates.length > 0) {
    const existing = duplicates[0];
    const uploadDate = new Date(existing._creationTime).toLocaleDateString();
    return {
      ...state,
      sha256,
      isDuplicate: true,
      duplicateOfId: existing._id,
      duplicateWarning: `Are you sure you haven't sent this before? This exact image was uploaded on ${uploadDate}.`,
    };
  }

  // Check for likely duplicates by EXIF metadata
  if (state.exif?.timestamp && state.exif?.camera) {
    const similarImages = await ctx.runQuery(internal.images.getByMetadata, {
      timestamp: state.exif.timestamp,
      camera: state.exif.camera,
    });

    // Filter out the current image
    const similarDuplicates = similarImages.filter(
      (img) => img._id.toString() !== state.imageId.toString()
    );

    if (similarDuplicates.length > 0) {
      return {
        ...state,
        sha256,
        isDuplicate: false,
        duplicateWarning: `Are you sure you haven't sent this before? A similar photo was found from the same camera at ${state.exif.timestamp}.`,
      };
    }
  }

  return { ...state, sha256, isDuplicate: false };
}
