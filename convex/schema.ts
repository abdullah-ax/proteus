import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  images: defineTable({
    storageId: v.id("_storage"),
    fileName: v.string(),
    contentType: v.string(),
    fileSize: v.number(),
    uploadedBy: v.string(),
    sha256: v.optional(v.string()),
    duplicateWarning: v.optional(v.string()),

    pipelineStatus: v.union(
      v.literal("uploaded"),
      v.literal("metadata_extracted"),
      v.literal("duplicate_checked"),
      v.literal("recolored"),
      v.literal("fish_extracted"),
      v.literal("classified"),
      v.literal("completed"),
      v.literal("failed")
    ),
    pipelineError: v.optional(v.string()),
    currentStage: v.optional(v.string()),

    exif: v.optional(
      v.object({
        latitude: v.optional(v.float64()),
        longitude: v.optional(v.float64()),
        timestamp: v.optional(v.string()),
        camera: v.optional(v.string()),
      })
    ),
    isRedSeaVerified: v.optional(v.boolean()),

    pHashVector: v.optional(v.array(v.float64())),

    recoloredStorageId: v.optional(v.id("_storage")),
    wasRecolored: v.optional(v.boolean()),

    fishCount: v.optional(v.number()),
    uniqueSpeciesCount: v.optional(v.number()),

    createdAt: v.number(),
  })
    .index("by_sha256", ["sha256"])
    .index("by_status", ["pipelineStatus"])
    .index("by_uploaded_by", ["uploadedBy"])
    .index("by_created_at", ["createdAt"])
    .vectorIndex("by_phash", {
      vectorField: "pHashVector",
      dimensions: 64,
      filterFields: ["pipelineStatus"],
    }),

  fishDetections: defineTable({
    imageId: v.id("images"),
    bbox: v.object({
      x: v.float64(),
      y: v.float64(),
      width: v.float64(),
      height: v.float64(),
    }),
    croppedStorageId: v.optional(v.id("_storage")),
    species: v.optional(v.string()),
    commonName: v.optional(v.string()),
    confidence: v.optional(v.float64()),
    classificationDetails: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_image", ["imageId"])
    .index("by_species", ["species"]),
});
