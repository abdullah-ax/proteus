"use client";

import { motion } from "framer-motion";
import { useRewardsContext } from "@/app/RewardsProvider";

export function HubHeader() {
  const { points } = useRewardsContext();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Proteus</p>
        <h1 className="font-display text-4xl text-white md:text-5xl">
          Red Sea Exploration Hub
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/70">
          Discover the reef, earn stewardship points, and unlock rewards for protecting marine life.
        </p>
      </div>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="self-start md:self-auto"
      >
        <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Points</p>
          <p className="text-2xl font-semibold text-white">{points.toLocaleString()}</p>
        </div>
      </motion.div>
    </div>
  );
}
