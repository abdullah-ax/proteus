"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRewardsContext } from "@/app/RewardsProvider";
import { OceanButton } from "@/components/ui/OceanButton";
import { PointsBanner } from "./PointsBanner";
import { SpeciesCard } from "./SpeciesCard";
import { ArrowLeft, RotateCcw } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

interface ScanResultsProps {
  imageId: string;
  onReset: () => void;
}

export function ScanResults({ imageId, onReset }: ScanResultsProps) {
  const router = useRouter();
  const { addPoints } = useRewardsContext();
  const hasRewarded = useRef(false);
  const detections = useQuery(api.fishDetections.getByImage, {
    imageId: imageId as Id<"images">,
  });
  const image = useQuery(api.images.getById, {
    imageId: imageId as Id<"images">,
  });

  const pointsEarned = (detections?.length ?? 0) * 50;

  useEffect(() => {
    if (!hasRewarded.current && detections && detections.length > 0) {
      addPoints(pointsEarned);
      hasRewarded.current = true;
    }
  }, [detections, pointsEarned, addPoints]);

  const extractedUrl = detections?.find((d) => d.croppedUrl)?.croppedUrl ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-4 px-5 pb-8"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-white/70 tracking-wider">
          Scan Previews
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Original", url: image?.url ?? null },
            { label: "Recolored", url: image?.recoloredUrl ?? null },
            { label: "Extracted", url: extractedUrl },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/12 bg-white/8 p-2 flex flex-col gap-2"
            >
              <div className="h-16 rounded-lg bg-white/15 overflow-hidden">
                {item.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10" />
                )}
              </div>
              <p className="text-[11px] text-white/70 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {pointsEarned > 0 && <PointsBanner points={pointsEarned} />}

      <h2 className="text-lg font-semibold text-white mt-2">
        Species Identified ({detections?.length ?? 0})
      </h2>

      <div className="flex flex-col gap-3">
        {detections?.map((d: { _id: string; speciesName?: string; species?: string; confidence?: number }, i: number) => (
          <SpeciesCard
            key={d._id}
            name={d.speciesName || d.species || "Unknown species"}
            confidence={d.confidence ?? 0.85}
            index={i}
          />
        ))}
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
