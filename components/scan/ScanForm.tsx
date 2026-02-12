"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { ActivityToggle } from "./ActivityToggle";
import { DiveSiteSelector } from "./DiveSiteSelector";
import { DropZone } from "@/components/upload/DropZone";
import { useUpload } from "@/hooks/useUpload";
import { Scan } from "lucide-react";

interface ScanFormProps {
  onSubmit: (data: { activity: "snorkeling" | "diving"; diveSite: string; depth?: number; duration?: number }, imageId: string) => void;
}

export function ScanForm({ onSubmit }: ScanFormProps) {
  const [activity, setActivity] = useState<"snorkeling" | "diving">("snorkeling");
  const [diveSite, setDiveSite] = useState("Ras Mohammed");
  const [depth, setDepth] = useState<number | undefined>();
  const [duration, setDuration] = useState<number | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const { upload, isUploading, error } = useUpload();

  const handleSubmit = useCallback(async () => {
    if (!file) return;
    try {
      const imageId = await upload(file);
      onSubmit({ activity, diveSite, depth, duration }, imageId as string);
    } catch {
      // error is handled by useUpload
    }
  }, [file, upload, onSubmit, activity, diveSite, depth, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-5"
    >
      <GlassCard className="p-5 space-y-5">
        <div>
          <label className="text-xs font-medium text-white/70 tracking-wider mb-2 block">
            Activity Type
          </label>
          <ActivityToggle value={activity} onChange={setActivity} />
        </div>

        <div>
          <label className="text-xs font-medium text-white/70 tracking-wider mb-2 block">
            Dive Site
          </label>
          <DiveSiteSelector value={diveSite} onChange={setDiveSite} />
        </div>

        {activity === "diving" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex gap-3"
          >
            <div className="flex-1">
              <label className="text-xs font-medium text-white/70 tracking-wider mb-2 block">
                Depth (m)
              </label>
              <input
                type="number"
                value={depth ?? ""}
                onChange={(e) => setDepth(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="15"
                className="w-full h-11 px-3.5 rounded-xl bg-white/[0.06] border border-white/12 text-white text-sm placeholder-white/40 focus:outline-none focus:border-ocean-surface/50"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-white/70 tracking-wider mb-2 block">
                Duration (min)
              </label>
              <input
                type="number"
                value={duration ?? ""}
                onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="45"
                className="w-full h-11 px-3.5 rounded-xl bg-white/[0.06] border border-white/12 text-white text-sm placeholder-white/40 focus:outline-none focus:border-ocean-surface/50"
              />
            </div>
          </motion.div>
        )}

        <div>
          <label className="text-xs font-medium text-white/70 tracking-wider mb-2 block">
            Upload Photo
          </label>
          <DropZone onFile={setFile} disabled={isUploading} />
          {file && (
            <p className="mt-2 text-xs text-white/60 truncate">{file.name}</p>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <OceanButton
          size="lg"
          className="w-full flex items-center justify-center gap-2"
          disabled={!file || isUploading}
          onClick={handleSubmit}
        >
          <Scan className="w-[18px] h-[18px]" />
          {isUploading ? "Uploading..." : "Start Scan"}
        </OceanButton>
      </GlassCard>
    </motion.div>
  );
}
