"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";

interface SpeciesCardProps {
  commonName: string;
  scientificName: string;
  confidence: number;
  imageUrl?: string | null;
  funFact: string;
}

export function SpeciesCard({ commonName, scientificName, confidence, imageUrl, funFact }: SpeciesCardProps) {
  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {imageUrl ? (
            <Image src={imageUrl} alt={commonName} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-white/60">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{commonName}</p>
          <p className="text-xs text-white/60 italic">{scientificName}</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-ocean-surface"
              style={{ width: `${Math.round(confidence * 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-white/60">
            Confidence: {Math.round(confidence * 100)}%
          </p>
        </div>
      </div>
      <p className="text-xs text-white/70">{funFact}</p>
    </GlassCard>
  );
}
