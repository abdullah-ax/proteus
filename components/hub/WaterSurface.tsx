"use client";

import { motion } from "framer-motion";
import { Fish, Gift, Map } from "lucide-react";
import { BubbleButton } from "./BubbleButton";

interface WaterSurfaceProps {
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onScan: () => void;
}

const bubbles = [
  {
    id: "scan",
    label: "Scan",
    icon: <Fish className="h-4 w-4" />,
    idle: { x: -180, y: 40, scale: 1 },
    hover: { x: 0, y: -40, scale: 1.3 },
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: <Gift className="h-4 w-4" />,
    idle: { x: 0, y: 90, scale: 1 },
    hover: { x: -120, y: -10, scale: 1.1 },
  },
  {
    id: "sites",
    label: "Sites",
    icon: <Map className="h-4 w-4" />,
    idle: { x: 160, y: 30, scale: 1 },
    hover: { x: 120, y: -10, scale: 1.1 },
  },
];

export function WaterSurface({ isHovered, onHoverStart, onHoverEnd, onScan }: WaterSurfaceProps) {
  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={isHovered ? { y: -120 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="relative mt-12 h-56 overflow-hidden rounded-[32px] border border-white/10 bg-white/5"
    >
      <svg
        viewBox="0 0 1200 200"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C200,80 350,140 500,120 C650,100 800,60 1000,90 C1100,110 1160,130 1200,140 L1200,200 L0,200 Z"
          fill="rgba(66, 165, 245, 0.35)"
        />
        <path
          d="M0,140 C220,120 360,160 520,140 C680,120 840,90 1040,110 C1120,120 1180,140 1200,150 L1200,200 L0,200 Z"
          fill="rgba(30, 136, 229, 0.35)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {bubbles.map((bubble, index) => (
          <motion.div
            key={bubble.id}
            animate={isHovered ? bubble.hover : bubble.idle}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: index * 0.05 }}
            className="absolute"
          >
            <BubbleButton
              label={bubble.label}
              icon={bubble.icon}
              onClick={bubble.id === "scan" ? onScan : undefined}
              className={bubble.id === "scan" ? "h-16 w-16" : ""}
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-4 left-6 text-xs uppercase tracking-[0.25em] text-white/70">
        Surface Hover
      </div>
    </motion.div>
  );
}
