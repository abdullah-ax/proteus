"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { ArrowLeft, Filter } from "lucide-react";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { api } from "@/convex/_generated/api";
import { slugify } from "@/lib/slug";

export default function FishdexPage() {
  const router = useRouter();
  const stats = useQuery(api.fishDetections.getFishdexStats, { limit: 12 });

  const totalSpecies = stats?.totalSpecies ?? 0;
  const unlockedCount = stats?.unlockedCount ?? 0;
  const progressPct = totalSpecies > 0 ? Math.round((unlockedCount / totalSpecies) * 100) : 0;
  const confidencePct = Math.round((stats?.confidenceAvg ?? 0) * 100);

  return (
    <OceanLayout className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center"
          >
            <ArrowLeft className="w-[18px] h-[18px] text-white" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">Fishdex</h1>
            <p className="text-xs text-white/70">
              Red Sea database · {totalSpecies.toLocaleString()} species
            </p>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center">
          <Filter className="w-[18px] h-[18px] text-white" />
        </button>
      </header>

      <div className="px-5">
        <GlassCard className="space-y-3">
          <p className="text-xs text-white/70 font-medium tracking-wide">Unlocked Progress</p>
          <div>
            <p className="text-xl font-semibold text-white">
              {unlockedCount.toLocaleString()} / {totalSpecies.toLocaleString()} unlocked
            </p>
            <p className="text-[11px] text-white/60">
              Based on unique detections in the pipeline
            </p>
          </div>
          <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full bg-ocean-surface"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg bg-white/10 px-2.5 py-1.5">
              <p className="text-[10px] text-white/60">New this week</p>
              <p className="text-sm text-white font-semibold">
                +{stats?.recentUnlocked ?? 0}
              </p>
            </div>
            <div className="flex-1 rounded-lg bg-white/10 px-2.5 py-1.5">
              <p className="text-[10px] text-white/60">Confidence avg</p>
              <p className="text-sm text-white font-semibold">
                {confidencePct}%
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="text-sm font-semibold text-white">Unlocked Fish</h2>
        <div className="flex gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-ocean-deep">
            All
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/15 text-white/80">
            Recent
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/15 text-white/80">
            Favorites
          </span>
        </div>
      </div>

      <div className="px-5 pb-8 pt-3 flex flex-col gap-3">
        {(stats?.species ?? []).map((fish) => (
          <Link
            key={fish.scientificName}
            href={`/fishdex/${slugify(fish.scientificName)}`}
          >
            <GlassCard className="p-3 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{fish.commonName}</p>
                <p className="text-[11px] text-white/60">{fish.scientificName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-ocean-surface"
                      style={{ width: `${Math.min(100, fish.count * 12)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/70">
                    {fish.count} sightings
                  </span>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}

        {stats && stats.species.length === 0 && (
          <GlassCard className="p-6 text-center">
            <p className="text-sm text-white/70">No unlocked species yet.</p>
          </GlassCard>
        )}
      </div>
    </OceanLayout>
  );
}
