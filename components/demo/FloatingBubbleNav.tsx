"use client";

import { motion } from "framer-motion";
import { Fish, Map, Plus } from "lucide-react";

export function FloatingBubbleNav({ active, onScan }: { active: boolean; onScan: () => void }) {
  const bubbles = [
    { id: "fish", label: "FishDex", icon: <Fish className="h-4 w-4" />, x: -140, scale: 1 },
    { id: "scan", label: "Scan Fish", icon: <Plus className="h-5 w-5" />, x: 0, scale: 1.2 },
    { id: "map", label: "Explore Map", icon: <Map className="h-4 w-4" />, x: 140, scale: 1 },
  ];

  return (
    <div className="relative h-24">
      {bubbles.map((bubble) => (
        <motion.button
          key={bubble.id}
          type="button"
          onClick={bubble.id === "scan" ? onScan : undefined}
          animate={active ? { y: 0, x: bubble.x, scale: bubble.scale, opacity: 1 } : { y: 40, x: bubble.x, scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
          className="absolute left-1/2 flex h-14 w-14 -translate-x-1/2 flex-col items-center justify-center gap-1 rounded-full border border-white/30 bg-white/15 text-white backdrop-blur"
        >
          {bubble.icon}
          <span className="text-[10px] font-semibold uppercase tracking-wide">{bubble.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
