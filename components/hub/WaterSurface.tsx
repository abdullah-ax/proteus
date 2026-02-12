"use client";

import { motion } from "framer-motion";
import { BubbleButton } from "./BubbleButton";
import { Scan, Fish, Map } from "lucide-react";

interface WaterSurfaceProps {
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onScanClick: () => void;
  onFishdexClick: () => void;
  onMapClick: () => void;
}

export function WaterSurface({
  isHovered,
  onHoverStart,
  onHoverEnd,
  onScanClick,
  onFishdexClick,
  onMapClick,
}: WaterSurfaceProps) {
  return (
    <motion.div
      className="relative w-full h-[180px] mt-auto"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={{ y: isHovered ? -120 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* Wave SVG */}
      <svg className="absolute top-0 w-full h-10" viewBox="0 0 430 40" preserveAspectRatio="none">
        <path
          d="M0 20 Q50 0 107.5 20 Q165 40 215 20 Q265 0 322.5 20 Q380 40 430 20 L430 40 L0 40 Z"
          fill="rgba(255,255,255,0.06)"
          className="animate-wave"
        />
      </svg>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-mid/60 to-ocean-deep" />

      {/* Bubble buttons */}
      <div className="absolute inset-0 flex items-center justify-center gap-8 pt-10">
        <BubbleButton icon={Fish} label="Fishdex" size="sm" onClick={onFishdexClick} />
        <BubbleButton icon={Scan} label="Scan" size="lg" onClick={onScanClick} />
        <BubbleButton icon={Map} label="Map" size="sm" onClick={onMapClick} />
      </div>
    </motion.div>
  );
}
