"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FISH_SILHOUETTES } from "@/lib/mockData";

export function ScanningHologramLayer() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % FISH_SILHOUETTES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.25),transparent_65%)]" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-0 top-1/2 h-px w-full bg-white/20" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
      </div>
      <AnimatePresence mode="wait">
        <motion.svg
          key={index}
          viewBox="0 0 120 100"
          className="h-36 w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.path
            d={FISH_SILHOUETTES[index]}
            fill="none"
            stroke="#7DD3FC"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>
      </AnimatePresence>
    </div>
  );
}
