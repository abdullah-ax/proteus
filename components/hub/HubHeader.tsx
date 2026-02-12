"use client";

import { useRewardsContext } from "@/app/RewardsProvider";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function HubHeader() {
  const { points } = useRewardsContext();

  return (
    <header className="flex items-center justify-between px-5 py-4">
      <h1 className="text-xl font-semibold tracking-[3px] font-mono text-white">
        PROTEUS
      </h1>
      <motion.div
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25"
        whileTap={{ scale: 0.95 }}
      >
        <Trophy className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium font-mono text-white">
          {points.toLocaleString()}
        </span>
      </motion.div>
    </header>
  );
}
