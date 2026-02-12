"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRewardsContext } from "@/app/RewardsProvider";
import { OceanButton } from "@/components/ui/OceanButton";
import { PointsBanner } from "./PointsBanner";
import { SpeciesCard } from "./SpeciesCard";
import { ArrowLeft, RotateCcw, Fish } from "lucide-react";
import { usePreloadImages } from "@/hooks/usePreloadImages";
import type { Id } from "@/convex/_generated/dataModel";

interface ScanResultsProps {
  imageId: string;
  onReset: () => void;
}

export function ScanResults({ imageId, onReset }: ScanResultsProps) {
  const router = useRouter();
  const { addPoints } = useRewardsContext();
  const hasRewarded = useRef(false);
  const [previewAspect, setPreviewAspect] = useState<number | null>(null);
  const detections = useQuery(api.fishDetections.getByImage, {
    imageId: imageId as Id<"images">,
  });
  const image = useQuery(api.images.getById, {
    imageId: imageId as Id<"images">,
  });
  const fishdexStats = useQuery(api.fishDetections.getFishdexStats, { limit: 5 });

  const pointsEarned = (detections?.length ?? 0) * 50;
  const primaryDetection = useMemo(() => {
    if (!detections || detections.length === 0) return null;
    return [...detections].sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0))[0];
  }, [detections]);

  const funFacts = useMemo(() => {
    if (!primaryDetection?.classificationDetails) {
      return {
        depth: "unknown",
        packs: "unknown",
        aggression: "unknown",
        ecosystemImpact: "unknown",
      };
    }
    try {
      const parsed = JSON.parse(primaryDetection.classificationDetails) as {
        depth?: string;
        packs?: string;
        aggression?: string;
        ecosystemImpact?: string;
      };
      return {
        depth: parsed.depth ?? "unknown",
        packs: parsed.packs ?? "unknown",
        aggression: parsed.aggression ?? "unknown",
        ecosystemImpact: parsed.ecosystemImpact ?? "unknown",
      };
    } catch {
      return {
        depth: "unknown",
        packs: "unknown",
        aggression: "unknown",
        ecosystemImpact: "unknown",
      };
    }
  }, [primaryDetection?.classificationDetails]);

  useEffect(() => {
    if (!hasRewarded.current && detections && detections.length > 0) {
      addPoints(pointsEarned);
      hasRewarded.current = true;
    }
  }, [detections, pointsEarned, addPoints]);

  const previewUrl = image?.url ?? "/placeholder.svg";
  const previewUrls = [previewUrl];
  usePreloadImages(previewUrls);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-4 px-5 pb-8"
    >
      {fishdexStats && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-white/70 tracking-wider">
              Fishdex Progress
            </p>
            <button
              className="text-xs text-ocean-surface flex items-center gap-1"
              onClick={() => router.push("/fishdex")}
            >
              <Fish className="w-3 h-3" />
              View Fishdex
            </button>
          </div>
          <p className="mt-2 text-sm text-white">
            {fishdexStats.unlockedCount.toLocaleString()} /{" "}
            {fishdexStats.totalSpecies.toLocaleString()} unlocked
          </p>
          <div className="mt-2 h-1.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full bg-ocean-surface"
              style={{
                width: `${Math.round(
                  (fishdexStats.unlockedCount / fishdexStats.totalSpecies) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      {pointsEarned > 0 && <PointsBanner points={pointsEarned} />}

      <h2 className="text-lg font-semibold text-white mt-2">
        Species Identified ({detections?.length ?? 0})
      </h2>

      <div className="flex flex-col gap-3">
        {detections?.map((d: { _id: string; speciesName?: string; species?: string; commonName?: string; confidence?: number; classificationDetails?: string }, i: number) => (
          (() => {
            let reasoning: string | undefined;
            if (d.classificationDetails) {
              try {
                const parsed = JSON.parse(d.classificationDetails) as { reasoning?: string };
                reasoning = parsed.reasoning;
              } catch {
                reasoning = undefined;
              }
            }
            return (
              <SpeciesCard
                key={d._id}
                name={d.speciesName || d.species || "Unknown species"}
                confidence={d.confidence ?? 0.85}
                index={i}
                reasoning={reasoning}
              />
            );
          })()
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-white">
          {primaryDetection?.commonName ?? primaryDetection?.species ?? "Fish Preview"}
        </p>
        <div className="rounded-xl border border-white/12 bg-white/8 p-2">
          <div
            className="rounded-lg bg-white/10 overflow-hidden"
            style={{
              aspectRatio: previewAspect ? `${previewAspect}` : "4 / 3",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Original"
              className="w-full h-full object-contain"
              loading="eager"
              decoding="async"
              onLoad={(event) => {
                const img = event.currentTarget;
                if (img.naturalWidth && img.naturalHeight) {
                  setPreviewAspect(img.naturalWidth / img.naturalHeight);
                }
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70">
          <div className="rounded-lg bg-white/10 px-2 py-1.5">
            Depth: <span className="text-white">{funFacts.depth}</span>
          </div>
          <div className="rounded-lg bg-white/10 px-2 py-1.5">
            Packs: <span className="text-white">{funFacts.packs}</span>
          </div>
          <div className="rounded-lg bg-white/10 px-2 py-1.5">
            Aggression: <span className="text-white">{funFacts.aggression}</span>
          </div>
          <div className="rounded-lg bg-white/10 px-2 py-1.5">
            Ecosystem: <span className="text-white">{funFacts.ecosystemImpact}</span>
          </div>
        </div>
      </div>

      {(!detections || detections.length === 0) && (
        <div className="glass-card p-6 text-center">
          <p className="text-sm text-white/70">No species detected in this image.</p>
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <OceanButton
          variant="outline"
          size="lg"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4" /> Hub
        </OceanButton>
        <OceanButton
          size="lg"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={onReset}
        >
          <RotateCcw className="w-4 h-4" /> Scan Again
        </OceanButton>
      </div>
    </motion.div>
  );
}
