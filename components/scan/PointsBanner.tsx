"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PointsBannerProps {
  points: number;
}

export function PointsBanner({ points }: PointsBannerProps) {
  return (
    <motion.div
      className="flex items-center justify-center gap-2 py-3 px-6 mx-5 rounded-2xl bg-ocean-surface/20 border border-ocean-surface/30"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", delay: 0.3 }}
    >
      <Sparkles className="w-5 h-5 text-ocean-surface" />
      <span className="text-lg font-semibold text-white">
        +{points} points earned!
      </span>
    </motion.div>
  );
}
