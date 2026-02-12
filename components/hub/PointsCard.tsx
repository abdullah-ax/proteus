"use client";

import { useRewardsContext } from "@/app/RewardsProvider";
import { GlassCard } from "@/components/ui/GlassCard";
import { TrendingUp } from "lucide-react";

export function PointsCard() {
  const { points } = useRewardsContext();

  return (
    <GlassCard className="flex-1">
      <p className="text-[11px] font-medium text-white/70 tracking-wider">Your Points</p>
      <p className="text-[32px] font-medium font-mono text-white tracking-tight leading-tight">
        {points.toLocaleString()}
      </p>
      <div className="flex items-center gap-1 mt-1">
        <TrendingUp className="w-3.5 h-3.5 text-green-400" />
        <span className="text-[11px] font-medium text-green-400">+150 this week</span>
      </div>
    </GlassCard>
  );
}
