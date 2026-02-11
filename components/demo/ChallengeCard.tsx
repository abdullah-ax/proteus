"use client";

import { CHALLENGES } from "@/lib/mockData";
import { GlassCard } from "@/components/ui/GlassCard";

export function ChallengesCard() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Seasonal Challenges</p>
        <span className="text-xs text-white/60">Live</span>
      </div>
      <div className="mt-4 space-y-4">
        {CHALLENGES.map((challenge) => (
          <div key={challenge.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white">{challenge.title}</p>
              <span className="text-xs text-white/70">+{challenge.reward} pts</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-ocean-surface"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
