"use client";

import { motion } from "framer-motion";

interface ActivityToggleProps {
  value: "snorkeling" | "diving";
  onChange: (v: "snorkeling" | "diving") => void;
}

export function ActivityToggle({ value, onChange }: ActivityToggleProps) {
  return (
    <div className="relative flex w-full h-11 rounded-xl bg-white/[0.06] p-[3px]">
      <motion.div
        className="absolute top-[3px] h-[calc(100%-6px)] w-[calc(50%-3px)] rounded-[10px] bg-white"
        animate={{ left: value === "snorkeling" ? 3 : "calc(50%)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <button
        className={`relative z-10 flex-1 text-[13px] font-medium rounded-[10px] transition-colors ${
          value === "snorkeling" ? "text-ocean-deep" : "text-white/70"
        }`}
        onClick={() => onChange("snorkeling")}
      >
        Snorkeling
      </button>
      <button
        className={`relative z-10 flex-1 text-[13px] font-medium rounded-[10px] transition-colors ${
          value === "diving" ? "text-ocean-deep" : "text-white/70"
        }`}
        onClick={() => onChange("diving")}
      >
        Diving
      </button>
    </div>
  );
}
