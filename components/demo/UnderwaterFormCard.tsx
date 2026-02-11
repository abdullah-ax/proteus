"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { ActivityToggle } from "./ActivityToggle";
import { ConditionalDiveFields } from "./ConditionalDiveFields";
import { UploadDropzone } from "./UploadDropzone";

interface UnderwaterFormCardProps {
  onScan: () => void;
}

export function UnderwaterFormCard({ onScan }: UnderwaterFormCardProps) {
  const [activity, setActivity] = useState<"snorkeling" | "diving">("snorkeling");
  const [site, setSite] = useState("");

  return (
    <GlassCard strong className="p-6">
      <h2 className="text-2xl font-semibold text-white">Scan Fish</h2>
      <p className="mt-2 text-sm text-white/70">
        Upload a clear underwater photo to identify species.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Activity</p>
          <ActivityToggle value={activity} onChange={setActivity} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Dive Site Name</p>
          <input
            value={site}
            onChange={(event) => setSite(event.target.value)}
            placeholder="Ras Mohammed"
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
          />
        </div>

        <ConditionalDiveFields active={activity === "diving"} />

        <UploadDropzone />

        <OceanButton size="lg" onClick={onScan}>
          Confirm & Scan
        </OceanButton>
      </div>
    </GlassCard>
  );
}
