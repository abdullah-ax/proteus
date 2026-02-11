"use client";

import { motion } from "framer-motion";

interface PointsBannerProps {
  points: number;
}

export function PointsBanner({ points }: PointsBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-center"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/70">Scan Complete</p>
      <p className="mt-2 text-2xl font-semibold text-white">+{points} points earned</p>
    </motion.div>
  );
}
