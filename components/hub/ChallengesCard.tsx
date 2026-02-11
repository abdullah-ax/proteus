"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { CHALLENGES } from "@/lib/mockData";
import { Eye, Fish, Trash2 } from "lucide-react";

const icons = {
  "trash-2": Trash2,
  eye: Eye,
  fish: Fish,
};

export function ChallengesCard() {
  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Seasonal Challenges</h3>
        <span className="text-xs text-white/60">Live</span>
      </div>
      <div className="mt-4 space-y-4">
        {CHALLENGES.map((challenge) => {
          const Icon = icons[challenge.icon];
          return (
            <div key={challenge.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-ocean-surface" />
                  <p className="text-sm font-medium text-white">{challenge.title}</p>
                </div>
                <span className="text-xs text-white/60">+{challenge.reward} pts</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-ocean-surface"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
