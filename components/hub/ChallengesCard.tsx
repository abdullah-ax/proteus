"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { CHALLENGES } from "@/lib/mockData";

export function ChallengesCard() {
  return (
    <GlassCard className="flex-1">
      <p className="text-[11px] font-medium text-white/70 tracking-wider mb-2.5">Challenges</p>
      <div className="flex flex-col gap-2.5">
        {CHALLENGES.slice(0, 2).map((ch) => (
          <div key={ch.id} className="flex items-center gap-2">
            <span className="text-sm">{ch.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{ch.title}</p>
              <div className="w-full h-1 mt-1 rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-ocean-surface"
                  style={{ width: `${ch.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
