"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { FISH_SILHOUETTES } from "@/lib/mockData";

interface ScanningAnimationProps {
  imageId: Id<"images">;
  onComplete: () => void;
}

export function ScanningAnimation({ imageId, onComplete }: ScanningAnimationProps) {
  const image = useQuery(api.images.getById, { imageId });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % FISH_SILHOUETTES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (image?.pipelineStatus === "completed") {
      onComplete();
    }
  }, [image?.pipelineStatus, onComplete]);

  const status = image?.currentStage ?? "Analyzing marine life";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6">
      <div className="relative flex h-64 w-full items-center justify-center rounded-[32px] border border-white/10 bg-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,165,245,0.35),transparent_60%)]" />
        <AnimatePresence mode="wait">
          <motion.svg
            key={index}
            viewBox="0 0 120 100"
            className="h-40 w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.path
              d={FISH_SILHOUETTES[index]}
              fill="none"
              stroke="#7DD3FC"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="neon-glow"
            />
          </motion.svg>
        </AnimatePresence>
        <motion.div
          className="absolute bottom-6 flex items-center gap-3"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <span className="h-2 w-2 rounded-full bg-ocean-surface" />
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Scanning</p>
        </motion.div>
      </div>
      <div className="text-center">
        <p className="text-sm text-white/70">{status}...</p>
        <p className="mt-1 text-xs text-white/50">Pipeline status: {image?.pipelineStatus ?? "starting"}</p>
      </div>
    </div>
  );
}
