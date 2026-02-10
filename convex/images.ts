import { mutation, query, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const create = mutation({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
    contentType: v.string(),
    fileSize: v.number(),
    sha256: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const existing = await ctx.db
      .query("images")
      .withIndex("by_sha256", (q) => q.eq("sha256", args.sha256))
      .first();

    if (existing) {
      await ctx.storage.delete(args.storageId);
      throw new Error("This exact image has already been uploaded");
    }

    const imageId = await ctx.db.insert("images", {
      storageId: args.storageId,
      fileName: args.fileName,
      contentType: args.contentType,
      fileSize: args.fileSize,
      uploadedBy: identity.tokenIdentifier,
      sha256: args.sha256,
      pipelineStatus: "uploaded",
      createdAt: Date.now(),
    });

    await ctx.scheduler.runAfter(0, internal.pipeline.run.execute, { imageId });

    return imageId;
  },
});

export const getById = query({
  args: { imageId: v.id("images") },
  handler: async (ctx, { imageId }) => {
    const image = await ctx.db.get(imageId);
    if (!image) return null;

    const url = await ctx.storage.getUrl(image.storageId);
    const recoloredUrl = image.recoloredStorageId
      ? await ctx.storage.getUrl(image.recoloredStorageId)
      : null;

    return { ...image, url, recoloredUrl };
  },
});

export const list = query({
  handler: async (ctx) => {
    const images = await ctx.db
      .query("images")
      .withIndex("by_created_at")
      .order("desc")
      .take(50);

    return Promise.all(
      images.map(async (image) => ({
        ...image,
        url: await ctx.storage.getUrl(image.storageId),
      }))
    );
  },
});

// --- Internal functions used by pipeline ---

export const getInternal = internalQuery({
  args: { imageId: v.id("images") },
  handler: async (ctx, { imageId }) => {
    return await ctx.db.get(imageId);
  },
});

export const updatePipelineStatus = internalMutation({
  args: {
    imageId: v.id("images"),
    status: v.string(),
    currentStage: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, { imageId, status, currentStage, error }) => {
    const updates: Record<string, any> = {
      pipelineStatus: status,
      currentStage,
    };
    if (error !== undefined) {
      updates.pipelineError = error;
    }
    await ctx.db.patch(imageId, updates);
  },
});

export const updateExif = internalMutation({
  args: {
    imageId: v.id("images"),
    exif: v.object({
      latitude: v.optional(v.float64()),
      longitude: v.optional(v.float64()),
      timestamp: v.optional(v.string()),
      camera: v.optional(v.string()),
    }),
    isRedSeaVerified: v.boolean(),
  },
  handler: async (ctx, { imageId, exif, isRedSeaVerified }) => {
    await ctx.db.patch(imageId, { exif, isRedSeaVerified });
  },
});

export const updatePHash = internalMutation({
  args: {
    imageId: v.id("images"),
    pHashVector: v.array(v.float64()),
  },
  handler: async (ctx, { imageId, pHashVector }) => {
    await ctx.db.patch(imageId, { pHashVector });
  },
});

export const updateRecoloration = internalMutation({
  args: {
    imageId: v.id("images"),
    wasRecolored: v.boolean(),
    recoloredStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, { imageId, wasRecolored, recoloredStorageId }) => {
    await ctx.db.patch(imageId, { wasRecolored, recoloredStorageId });
  },
});

export const updateFishCount = internalMutation({
  args: {
    imageId: v.id("images"),
    fishCount: v.number(),
  },
  handler: async (ctx, { imageId, fishCount }) => {
    await ctx.db.patch(imageId, { fishCount });
  },
});
