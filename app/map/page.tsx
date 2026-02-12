"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import Header from "@/components/header";
import { GlassCard } from "@/components/ui/GlassCard";

const SPOTS = [
  {
    name: "Ras Mohammed",
    desc: "Iconic reef walls · strong currents",
    sightings: 42,
    species: 12,
  },
  {
    name: "Blue Hole",
    desc: "Dahab · sinkhole drop-off",
    sightings: 26,
    species: 9,
  },
  {
    name: "Thistlegorm Wreck",
    desc: "WWII cargo ship · giant corals",
    sightings: 18,
    species: 14,
  },
];

export default function MapPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F3C] via-[#0F3057] to-[#0B3C6D]">
      <Header />
      <div className="max-w-5xl mx-auto px-6 pt-6 pb-12">
        <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-[18px] h-[18px] text-white" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-white">Red Sea Map</h1>
            <p className="text-xs text-[#CFE3F7]">Dive sites · reefs · sightings</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <SlidersHorizontal className="w-[18px] h-[18px] text-white" />
        </button>
      </header>

      <div className="bg-white/8 border border-white/15 rounded-2xl p-5 shadow-lg">
        <GlassCard className="p-3">
          <div className="h-[340px] rounded-2xl bg-white/10 relative overflow-hidden">
            <div className="absolute left-3 top-3 rounded-xl bg-ocean-deep/70 px-3 py-2">
              <p className="text-[10px] text-white/70">Active Zone</p>
              <p className="text-sm font-semibold text-white">Ras Mohammed</p>
              <p className="text-[10px] text-white/60">24 sightings · 8 species</p>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-ocean-deep">
              Dive Sites
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/15 text-white/80">
              Reefs
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/15 text-white/80">
              Sightings
            </span>
          </div>
        </GlassCard>
      </div>

      <div className="pt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Red Sea Dive Spots</h2>
          <p className="text-[11px] text-white/60">Sorted by activity</p>
        </div>

        {SPOTS.map((spot) => (
          <GlassCard key={spot.name} className="p-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{spot.name}</p>
              <p className="text-[11px] text-white/60">{spot.desc}</p>
              <div className="flex gap-3 mt-2 text-[10px] text-white/70">
                <span>{spot.sightings} sightings</span>
                <span>{spot.species} species</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      </div>
    </div>
  );
}
