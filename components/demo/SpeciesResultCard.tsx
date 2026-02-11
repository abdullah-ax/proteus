"use client";

import { GlassCard } from "@/components/ui/GlassCard";

interface SpeciesResultCardProps {
  name: string;
  description: string;
  funFacts: string[];
}

export function SpeciesResultCard({ name, description, funFacts }: SpeciesResultCardProps) {
  return (
    <GlassCard className="p-5">
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="mt-2 text-sm text-white/70">{description}</p>
      <ul className="mt-3 space-y-2 text-xs text-white/70">
        {funFacts.map((fact) => (
          <li key={fact}>• {fact}</li>
        ))}
      </ul>
    </GlassCard>
  );
}
