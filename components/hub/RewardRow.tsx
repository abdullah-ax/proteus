"use client";

import { GlassCard } from "@/components/ui/GlassCard";

interface RewardRowProps {
  image: string;
  title: string;
  description: string;
  points: number;
  onClick?: () => void;
}

export function RewardRow({ image, title, description, points, onClick }: RewardRowProps) {
  return (
    <GlassCard onClick={onClick} className="flex items-center gap-4 p-3">
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.6),transparent_60%)]" />
        <span className="relative text-xs font-semibold text-white/80">PRO</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/60">{description}</p>
      </div>
      <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
        {points} pts
      </div>
    </GlassCard>
  );
}
