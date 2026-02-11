"use client";

import { useState } from "react";
import { DropZone } from "@/components/upload/DropZone";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { ActivityToggle } from "./ActivityToggle";
import { DiveSiteSelector } from "./DiveSiteSelector";
import { useUpload } from "@/hooks/useUpload";
import type { ScanFormData } from "@/hooks/useScanFlow";
import type { Id } from "@/convex/_generated/dataModel";

interface ScanFormProps {
  onSubmitted: (formData: ScanFormData, imageId: Id<"images">) => void;
}

export function ScanForm({ onSubmitted }: ScanFormProps) {
  const { upload, isUploading, error } = useUpload();
  const [activity, setActivity] = useState<"snorkeling" | "diving">("snorkeling");
  const [diveSite, setDiveSite] = useState("");
  const [depth, setDepth] = useState("");
  const [duration, setDuration] = useState("");
  const [buddyName, setBuddyName] = useState("");
  const [diverId, setDiverId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file || !diveSite) return;
    const imageId = await upload(file);
    const payload: ScanFormData = {
      activity,
      diveSite,
      depth: activity === "diving" && depth ? Number(depth) : undefined,
      duration: activity === "diving" && duration ? Number(duration) : undefined,
      buddyName: buddyName || undefined,
      diverId: diverId || undefined,
    };
    onSubmitted(payload, imageId);
  };

  return (
    <GlassCard strong className="mx-auto w-full max-w-3xl p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-3xl text-white">Start a New Scan</h2>
          <p className="mt-2 text-sm text-white/70">
            Upload your Red Sea photo and let Proteus identify marine life in seconds.
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/60">Activity</p>
          <ActivityToggle value={activity} onChange={setActivity} />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/60">Dive Site</p>
            <DiveSiteSelector value={diveSite} onChange={setDiveSite} />
          </div>
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-white/60">Buddy Name</label>
            <input
              value={buddyName}
              onChange={(event) => setBuddyName(event.target.value)}
              placeholder="Optional"
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {activity === "diving" && (
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/60">Depth (m)</label>
              <input
                value={depth}
                onChange={(event) => setDepth(event.target.value)}
                placeholder="18"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/60">Duration (min)</label>
              <input
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                placeholder="45"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/60">Diver ID</label>
              <input
                value={diverId}
                onChange={(event) => setDiverId(event.target.value)}
                placeholder="Optional"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
              />
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/60">Upload</p>
          <DropZone onFile={setFile} disabled={isUploading} />
        </div>

        {error && <p className="text-sm text-red-300">{error}</p>}

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            By submitting you agree to share imagery for conservation research.
          </p>
          <OceanButton size="lg" onClick={handleSubmit} disabled={!file || !diveSite || isUploading}>
            {isUploading ? "Uploading..." : "Start Scan"}
          </OceanButton>
        </div>
      </div>
    </GlassCard>
  );
}
