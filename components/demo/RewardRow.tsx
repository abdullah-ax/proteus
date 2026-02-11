"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";

interface RewardRowProps {
  image: string;
  title: string;
  description: string;
  points: number;
  onClick: () => void;
}

export function RewardRow({ image, title, description, points, onClick }: RewardRowProps) {
  return (
    <GlassCard onClick={onClick} className="flex items-center gap-4 p-3">
      <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/20">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/70">{description}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-white/70">{points} pts</span>
        <button className="rounded-xl bg-ocean-button px-3 py-1 text-xs font-semibold text-white">
          Redeem
        </button>
      </div>
    </GlassCard>
  );
}
