import { query, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const getByImage = query({
  args: { imageId: v.id("images") },
  handler: async (ctx, { imageId }) => {
    const detections = await ctx.db
      .query("fishDetections")
      .withIndex("by_image", (q) => q.eq("imageId", imageId))
      .collect();

    return Promise.all(
      detections.map(async (d) => ({
        ...d,
        croppedUrl: d.croppedStorageId
          ? await ctx.storage.getUrl(d.croppedStorageId)
          : null,
      }))
    );
  },
});

// --- Internal functions used by pipeline ---

export const getByImageInternal = internalQuery({
  args: { imageId: v.id("images") },
  handler: async (ctx, { imageId }) => {
    return await ctx.db
      .query("fishDetections")
      .withIndex("by_image", (q) => q.eq("imageId", imageId))
      .collect();
  },
});

export const create = internalMutation({
  args: {
    imageId: v.id("images"),
    bbox: v.object({
      x: v.float64(),
      y: v.float64(),
      width: v.float64(),
      height: v.float64(),
    }),
    croppedStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("fishDetections", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateClassification = internalMutation({
  args: {
    detectionId: v.id("fishDetections"),
    species: v.string(),
    commonName: v.string(),
    confidence: v.float64(),
    classificationDetails: v.optional(v.string()),
  },
  handler: async (ctx, { detectionId, species, commonName, confidence, classificationDetails }) => {
    await ctx.db.patch(detectionId, {
      species,
      commonName,
      confidence,
      classificationDetails,
    });
  },
});
