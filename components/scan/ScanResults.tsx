"use client";

import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useRewardsContext } from "@/app/RewardsProvider";
import { SPECIES_FUN_FACTS } from "@/lib/mockData";
import { SpeciesCard } from "./SpeciesCard";
import { PointsBanner } from "./PointsBanner";
import { OceanButton } from "@/components/ui/OceanButton";

interface ScanResultsProps {
  imageId: Id<"images">;
  onReset: () => void;
  onBack: () => void;
}

export function ScanResults({ imageId, onReset, onBack }: ScanResultsProps) {
  const detections = useQuery(api.fishDetections.getByImage, { imageId }) ?? [];
  const { addPoints } = useRewardsContext();
  const awardedRef = useRef(false);

  const pointsEarned = detections.length * 50;

  useEffect(() => {
    if (!awardedRef.current && detections.length > 0) {
      addPoints(pointsEarned);
      awardedRef.current = true;
    }
  }, [detections.length, pointsEarned, addPoints]);

  const funFacts = useMemo(() => SPECIES_FUN_FACTS.default, []);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <PointsBanner points={pointsEarned} />
      <div className="grid gap-4 md:grid-cols-2">
        {detections.length === 0 && (
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-sm text-white/70">
            No species detected yet. Try another scan.
          </div>
        )}
        {detections.map((detection, index) => (
          <SpeciesCard
            key={detection._id}
            commonName={detection.commonName ?? "Unknown"}
            scientificName={detection.species ?? "Unknown"}
            confidence={detection.confidence ?? 0}
            imageUrl={detection.croppedUrl}
            funFact={funFacts[index % funFacts.length]}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <OceanButton variant="ghost" onClick={onBack}>
          Back to Hub
        </OceanButton>
        <OceanButton onClick={onReset}>Scan Another</OceanButton>
      </div>
    </div>
  );
}
