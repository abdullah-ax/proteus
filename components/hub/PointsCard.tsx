"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useRewardsContext } from "@/app/RewardsProvider";

export function PointsCard() {
  const { points } = useRewardsContext();
  const [display, setDisplay] = useState(points);

  useEffect(() => {
    let current = display;
    const diff = points - current;
    if (diff === 0) return;
    const step = Math.max(1, Math.round(Math.abs(diff) / 20));
    const interval = setInterval(() => {
      current += diff > 0 ? step : -step;
      if ((diff > 0 && current >= points) || (diff < 0 && current <= points)) {
        current = points;
        clearInterval(interval);
      }
      setDisplay(current);
    }, 30);
    return () => clearInterval(interval);
  }, [points]);

  return (
    <GlassCard strong className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Current Points</p>
          <p className="mt-2 text-3xl font-semibold text-white">{display.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <Trophy className="h-6 w-6 text-ocean-surface" />
        </div>
      </div>
      <p className="mt-4 text-sm text-white/70">
        Keep exploring to unlock premium experiences across the Red Sea.
      </p>
    </GlassCard>
  );
}
