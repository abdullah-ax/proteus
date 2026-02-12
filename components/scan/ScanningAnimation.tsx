"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FISH_SILHOUETTES } from "@/lib/mockData";
import type { Id } from "@/convex/_generated/dataModel";

interface ScanningAnimationProps {
  imageId: string;
  onComplete: () => void;
}

export function ScanningAnimation({ imageId, onComplete }: ScanningAnimationProps) {
  const [fishIndex, setFishIndex] = useState(0);
  const image = useQuery(api.images.getById, { imageId: imageId as Id<"images"> });

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center px-5 py-16"
    >
      {/* Holographic fish */}
      <div className="relative w-[200px] h-[160px] mb-8">
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
        {image?.pipelineStatus === "completed" ? "Redirecting..." : "This may take a moment"}
      </p>

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
