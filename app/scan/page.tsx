"use client";

import { useEffect, useState } from "react";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { UnderwaterFormCard } from "@/components/demo/UnderwaterFormCard";
import { ScanningHologramLayer } from "@/components/demo/ScanningHologramLayer";
import { SpeciesResultCard } from "@/components/demo/SpeciesResultCard";
import { PointsEarnedBanner } from "@/components/demo/PointsEarnedBanner";
import { Button } from "@/components/ui/button";
import { SCAN_RESULTS } from "@/lib/mockData";
import { useRouter } from "next/navigation";

type Stage = "form" | "scanning" | "results";

export default function ScanPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("form");

  useEffect(() => {
    if (stage === "scanning") {
      const timer = setTimeout(() => setStage("results"), 4200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [stage]);

  return (
    <OceanLayout className="font-sans">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        {stage === "form" && <UnderwaterFormCard onScan={() => setStage("scanning")} />}

        {stage === "scanning" && (
          <div className="mx-auto w-full max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold text-white">Identifying Species…</h2>
            <p className="text-sm text-white/70">Mapping reef life…</p>
            <ScanningHologramLayer />
          </div>
        )}

        {stage === "results" && (
          <div className="mx-auto w-full max-w-4xl space-y-5">
            <h2 className="text-2xl font-semibold text-white">Identification Complete</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {SCAN_RESULTS.species.map((species) => (
                <SpeciesResultCard key={species.name} {...species} />
              ))}
            </div>
            <PointsEarnedBanner points={SCAN_RESULTS.pointsAwarded} />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="ghost" onClick={() => router.push("/")}>Back to Hub</Button>
              <Button onClick={() => setStage("form")}>Scan Another</Button>
            </div>
          </div>
        )}
      </main>
    </OceanLayout>
  );
}
