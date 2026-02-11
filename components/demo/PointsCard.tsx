"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export function PointsCard({ points }: { points: number }) {
  return (
    <GlassCard strong className="p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">Your Points</p>
      <p className="mt-3 text-4xl font-semibold text-white">{points.toLocaleString()}</p>
      <p className="mt-2 text-sm text-white/70">
        Earn more by scanning new species and supporting reef partners.
      </p>
    </GlassCard>
  );
}
