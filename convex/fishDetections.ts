import { query, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { RED_SEA_SPECIES, findRedSeaSpeciesByAnyName } from "./pipeline/data/redSeaSpecies";

const INVALID_SPECIES = new Set(["Unknown", "Parse Error", "No Match"]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

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

export const getFishdexStats = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const detections = await ctx.db.query("fishDetections").collect();
    const counts = new Map<
      string,
      { scientificName: string; commonName: string; count: number }
    >();

    let confidenceSum = 0;
    let confidenceCount = 0;
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentSpecies = new Set<string>();

    for (const det of detections) {
      if (!det.species || INVALID_SPECIES.has(det.species)) continue;
      const matched =
        findRedSeaSpeciesByAnyName(det.species) ??
        (det.commonName ? findRedSeaSpeciesByAnyName(det.commonName) : null);
      const scientificName = matched?.scientificName ?? det.species;
      const commonName = matched?.commonName ?? det.commonName ?? scientificName;

      const existing = counts.get(scientificName);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(scientificName, { scientificName, commonName, count: 1 });
      }

      if (det.confidence !== undefined) {
        confidenceSum += det.confidence;
        confidenceCount += 1;
      }

      if (det.createdAt >= oneWeekAgo) {
        recentSpecies.add(scientificName);
      }
    }

    const species = Array.from(counts.values()).sort((a, b) => b.count - a.count);
    const limited = limit ? species.slice(0, limit) : species;

    return {
      totalSpecies: RED_SEA_SPECIES.length,
      unlockedCount: counts.size,
      recentUnlocked: recentSpecies.size,
      confidenceAvg: confidenceCount > 0 ? confidenceSum / confidenceCount : 0,
      species: limited,
    };
  },
});

export const getFishdexSpeciesDetail = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const speciesMatch = RED_SEA_SPECIES.find(
      (species) => slugify(species.scientificName) === slug
    );

    if (!speciesMatch) {
      return null;
    }

    const scientificName = speciesMatch.scientificName;
    const detections = await ctx.db
      .query("fishDetections")
      .withIndex("by_species", (q) => q.eq("species", scientificName))
      .collect();

    const sorted = detections.sort((a, b) => b.createdAt - a.createdAt);
    const recent = sorted.slice(0, 12);

    let confidenceSum = 0;
    let confidenceCount = 0;
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    let recentCount = 0;

    for (const det of detections) {
      if (det.confidence !== undefined) {
        confidenceSum += det.confidence;
        confidenceCount += 1;
      }
      if (det.createdAt >= oneWeekAgo) {
        recentCount += 1;
      }
    }

    const enriched = await Promise.all(
      recent.map(async (det) => {
        const image = await ctx.db.get(det.imageId);
        const imageUrl = image ? await ctx.storage.getUrl(image.storageId) : null;
        const croppedUrl = det.croppedStorageId
          ? await ctx.storage.getUrl(det.croppedStorageId)
          : null;

        return {
          _id: det._id,
          imageId: det.imageId,
          confidence: det.confidence ?? null,
          createdAt: det.createdAt,
          imageUrl,
          croppedUrl,
        };
      })
    );

    return {
      species: speciesMatch,
      stats: {
        sightings: detections.length,
        recentSightings: recentCount,
        confidenceAvg: confidenceCount > 0 ? confidenceSum / confidenceCount : 0,
      },
      detections: enriched,
    };
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
