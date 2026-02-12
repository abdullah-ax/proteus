"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface BubbleButtonProps {
  icon: LucideIcon;
  label: string;
  size?: "sm" | "lg";
  onClick: () => void;
}

export function BubbleButton({ icon: Icon, label, size = "sm", onClick }: BubbleButtonProps) {
  const dim = size === "lg" ? "w-[72px] h-[72px]" : "w-14 h-14";
  const iconSize = size === "lg" ? "w-[22px] h-[22px]" : "w-[18px] h-[18px]";

  return (
    <motion.button
      className={`${dim} rounded-full bg-white/[0.18] border border-white/30 flex flex-col items-center justify-center gap-1`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Icon className={`${iconSize} text-white`} />
      <span className="text-[9px] font-medium text-white/80">{label}</span>
    </motion.button>
  );
}
