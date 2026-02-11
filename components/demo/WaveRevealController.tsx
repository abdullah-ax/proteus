"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WaveSurface } from "./WaveSurface";
import { FloatingBubbleNav } from "./FloatingBubbleNav";

export function WaveRevealController({
  children,
  onScan,
}: {
  children: React.ReactNode;
  onScan: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <motion.div
        animate={hovered ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative mt-6"
      >
        <WaveSurface raised={hovered} />
        <div className="absolute inset-0 flex items-center justify-center">
          <FloatingBubbleNav active={hovered} onScan={onScan} />
        </div>
      </div>
    </div>
  );
}
