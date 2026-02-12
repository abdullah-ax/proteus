"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import { GlassCard } from "@/components/ui/GlassCard";
import { api } from "@/convex/_generated/api";
import { usePreloadImages } from "@/hooks/usePreloadImages";

export default function FishdexDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const detail = useQuery(
    api.fishDetections.getFishdexSpeciesDetail,
    slug ? { slug } : "skip"
  );

  const confidencePct = Math.round((detail?.stats.confidenceAvg ?? 0) * 100);
  const captureUrls =
    detail?.detections
      ?.map((det) => det.croppedUrl ?? det.imageUrl ?? null)
      .filter((url): url is string => Boolean(url)) ?? [];
  usePreloadImages(captureUrls);

  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A1F3C] via-[#0F3057] to-[#0B3C6D]">
        <Header />
        <div className="max-w-5xl mx-auto px-6 pt-6 pb-12">
          <header className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.push("/fishdex")}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
            >
              <ArrowLeft className="w-[18px] h-[18px] text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">Loading…</h1>
          </header>
        </div>
      </div>
    );
  }

  if (detail === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A1F3C] via-[#0F3057] to-[#0B3C6D]">
        <Header />
        <div className="max-w-5xl mx-auto px-6 pt-6 pb-12">
          <header className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.push("/fishdex")}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
            >
              <ArrowLeft className="w-[18px] h-[18px] text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">Species not found</h1>
          </header>
          <GlassCard className="p-6 text-center">
            <p className="text-sm text-white/70">This fish is not in the Red Sea list.</p>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F3C] via-[#0F3057] to-[#0B3C6D]">
      <Header />
      <div className="max-w-5xl mx-auto px-6 pt-6 pb-12">
        <header className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.push("/fishdex")}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-[18px] h-[18px] text-white" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {detail?.species.commonName ?? "Fishdex"}
            </h1>
            <p className="text-xs text-[#CFE3F7]">
              {detail?.species.scientificName ?? ""}
            </p>
          </div>
        </header>

        <div className="space-y-4">
          <GlassCard className="p-5 flex items-center gap-4">
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

          <GlassCard className="p-5 space-y-3">
            <p className="text-xs text-white/70 font-medium tracking-wide">Sightings</p>
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg bg-white/10 px-3 py-2">
                <p className="text-[10px] text-white/60">Recent 7d</p>
                <p className="text-sm text-white font-semibold">
                  {detail?.stats.recentSightings ?? 0}
                </p>
              </div>
              <div className="flex-1 rounded-lg bg-white/10 px-3 py-2">
                <p className="text-[10px] text-white/60">Confidence avg</p>
                <p className="text-sm text-white font-semibold">{confidencePct}%</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="pt-6">
          <h2 className="text-sm font-semibold text-white mb-3">Recent Captures</h2>
          <div className="grid grid-cols-2 gap-3">
            {(detail?.detections ?? []).map((det) => (
              <GlassCard key={det._id} className="p-2">
                <div className="h-32 rounded-xl bg-white/10 overflow-hidden">
                  {det.croppedUrl || det.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={det.croppedUrl ?? det.imageUrl ?? ""}
                      alt="Capture"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
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
      </div>
    </div>
  );
}
