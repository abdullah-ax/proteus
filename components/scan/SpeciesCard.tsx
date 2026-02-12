"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SPECIES_FUN_FACTS } from "@/lib/mockData";

interface SpeciesCardProps {
  name: string;
  confidence: number;
  index: number;
}

export function SpeciesCard({ name, confidence, index }: SpeciesCardProps) {
  const funFact = SPECIES_FUN_FACTS[name] || SPECIES_FUN_FACTS.default;
  const confidencePct = Math.round(confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-white">{name}</h3>
          <span className="text-xs font-mono text-ocean-surface">{confidencePct}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/15 mb-3">
          <div
            className="h-full rounded-full bg-ocean-surface"
            style={{ width: `${confidencePct}%` }}
          />
        </div>
        <p className="text-xs text-white/60 leading-relaxed">{funFact}</p>
      </GlassCard>
    </motion.div>
  );
}
