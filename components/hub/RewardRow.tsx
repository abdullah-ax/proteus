"use client";

import Image from "next/image";
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
      <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/15">
        <Image src={image} alt={title} fill className="object-cover" />
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
