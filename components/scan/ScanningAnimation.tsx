"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FISH_SILHOUETTES } from "@/lib/mockData";
import { Fish } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

interface ScanningAnimationProps {
  imageId: string;
  onComplete: () => void;
}

export function ScanningAnimation({ imageId, onComplete }: ScanningAnimationProps) {
  const [fishIndex, setFishIndex] = useState(0);
  const image = useQuery(api.images.getById, { imageId: imageId as Id<"images"> });
  const status = image?.pipelineStatus ?? "uploaded";
  const currentStage = image?.currentStage ?? "Initializing pipeline";

  // Cycle through fish silhouettes
  useEffect(() => {
    const interval = setInterval(() => {
      setFishIndex((prev) => (prev + 1) % FISH_SILHOUETTES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Auto-transition when pipeline completes
  useEffect(() => {
    if (image?.pipelineStatus === "completed") {
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }
  }, [image?.pipelineStatus, onComplete]);

  const statusText = image?.pipelineStatus === "completed"
    ? "Analysis complete!"
    : image?.pipelineStatus === "failed"
      ? "Analysis failed"
      : "Analyzing your image...";

  const progressSteps = [
    "uploaded",
    "metadata_extracted",
    "duplicate_checked",
    "recolored",
    "fish_extracted",
    "classified",
    "completed",
  ];

  const progressIndex = progressSteps.indexOf(status);
  const progressPct = progressIndex >= 0 ? Math.round(((progressIndex + 1) / progressSteps.length) * 100) : 10;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center px-5 py-16"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-ocean-mid/20 via-transparent to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-32 h-48 w-48 rounded-full border border-ocean-surface/30"
          style={{ transform: "translateX(-50%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Rotating fish loader */}
      <div className="relative w-[220px] h-[180px] mb-8 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        >
          <div className="w-28 h-28 rounded-full border border-ocean-surface/40" />
        </motion.div>
        <motion.div
          className="absolute flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <Fish className="w-10 h-10 text-white/90" />
        </motion.div>

        {/* Holographic fish */}
        <AnimatePresence mode="wait">
          <motion.svg
            key={fishIndex}
            viewBox="0 0 160 160"
            className="w-full h-full neon-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.path
              d={FISH_SILHOUETTES[fishIndex]}
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.svg>
        </AnimatePresence>
      </div>

      {/* Status */}
      <motion.p
        className="text-lg font-medium text-white mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {statusText}
      </motion.p>
      <p className="text-sm text-white/50">
        {image?.pipelineStatus === "completed"
          ? "Redirecting..."
          : image?.pipelineStatus === "failed"
            ? "Something went wrong. Try again."
            : currentStage}
      </p>

      <div className="mt-6 w-full max-w-md">
        <div className="flex justify-between text-xs text-white/50 mb-2 uppercase tracking-wide">
          <span>Pipeline Progress</span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-ocean-surface"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-ocean-surface"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
