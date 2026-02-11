"use client";

import { motion } from "framer-motion";

export function WaveSurface({ raised }: { raised: boolean }) {
  return (
    <motion.div
      animate={raised ? { y: -80 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="relative mt-8 h-28 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <svg
        viewBox="0 0 1200 200"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,110 C200,70 360,140 520,110 C700,80 860,50 1040,80 C1120,100 1180,120 1200,130 L1200,200 L0,200 Z"
          fill="rgba(66,165,245,0.4)"
        />
        <path
          d="M0,130 C220,120 380,160 540,140 C720,120 880,90 1040,110 C1120,120 1180,140 1200,150 L1200,200 L0,200 Z"
          fill="rgba(30,136,229,0.35)"
        />
      </svg>
    </motion.div>
  );
}
