"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { ArrowLeft } from "lucide-react";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { api } from "@/convex/_generated/api";

interface FishdexDetailPageProps {
  params: { slug: string };
}

export default function FishdexDetailPage({ params }: FishdexDetailPageProps) {
  const router = useRouter();
  const detail = useQuery(api.fishDetections.getFishdexSpeciesDetail, {
    slug: params.slug,
  });

  const confidencePct = Math.round((detail?.stats.confidenceAvg ?? 0) * 100);

  if (detail === null) {
    return (
      <OceanLayout className="flex flex-col min-h-screen">
        <header className="flex items-center gap-3 px-5 py-4">
          <button
            onClick={() => router.push("/fishdex")}
            className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center"
          >
            <ArrowLeft className="w-[18px] h-[18px] text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">Species not found</h1>
        </header>
        <div className="px-5">
          <GlassCard className="p-6 text-center">
            <p className="text-sm text-white/70">This fish is not in the Red Sea list.</p>
          </GlassCard>
        </div>
      </OceanLayout>
    );
  }

  return (
    <OceanLayout className="flex flex-col min-h-screen">
      <header className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => router.push("/fishdex")}
          className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center"
        >
          <ArrowLeft className="w-[18px] h-[18px] text-white" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-white">
            {detail?.species.commonName ?? "Fishdex"}
          </h1>
          <p className="text-xs text-white/70">
            {detail?.species.scientificName ?? ""}
          </p>
        </div>
      </header>

      <div className="px-5 space-y-4">
        <GlassCard className="p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20" />
          <div className="flex-1 space-y-1">
            <p className="text-sm text-white/70">Family</p>
            <p className="text-base font-semibold text-white">
              {detail?.species.family ?? "Unknown"}
            </p>
            <p className="text-[11px] text-white/60">
              {detail?.stats.sightings ?? 0} total sightings
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 space-y-3">
          <p className="text-xs text-white/70 font-medium tracking-wide">Sightings</p>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg bg-white/10 px-2.5 py-1.5">
              <p className="text-[10px] text-white/60">Recent 7d</p>
              <p className="text-sm text-white font-semibold">
                {detail?.stats.recentSightings ?? 0}
              </p>
            </div>
            <div className="flex-1 rounded-lg bg-white/10 px-2.5 py-1.5">
              <p className="text-[10px] text-white/60">Confidence avg</p>
              <p className="text-sm text-white font-semibold">{confidencePct}%</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="px-5 pt-5 pb-8">
        <h2 className="text-sm font-semibold text-white mb-3">Recent Captures</h2>
        <div className="grid grid-cols-2 gap-3">
          {(detail?.detections ?? []).map((det) => (
            <GlassCard key={det._id} className="p-2">
              <div className="h-28 rounded-xl bg-white/10 overflow-hidden">
                {det.croppedUrl || det.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={det.croppedUrl ?? det.imageUrl ?? ""}
                    alt="Capture"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10" />
                )}
              </div>
              <p className="mt-2 text-[10px] text-white/60">
                {det.confidence !== null
                  ? `${Math.round(det.confidence * 100)}% confidence`
                  : "Confidence unavailable"}
              </p>
            </GlassCard>
          ))}
          {detail && detail.detections.length === 0 && (
            <GlassCard className="p-6 col-span-2 text-center">
              <p className="text-sm text-white/70">No captures yet.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </OceanLayout>
  );
}
