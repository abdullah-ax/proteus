"use client";

import { useState, useCallback } from "react";
import type { Id } from "../convex/_generated/dataModel";

export type ScanStage = "form" | "scanning" | "results";

export interface ScanFormData {
  activity: "snorkeling" | "diving";
  diveSite: string;
  depth?: number;
  duration?: number;
  buddyName?: string;
  diverId?: string;
}

export function useScanFlow() {
  const [stage, setStage] = useState<ScanStage>("form");
  const [formData, setFormData] = useState<ScanFormData | null>(null);
  const [imageId, setImageId] = useState<Id<"images"> | null>(null);

  const submitForm = useCallback(
    (data: ScanFormData, uploadedImageId: Id<"images">) => {
      setFormData(data);
      setImageId(uploadedImageId);
      setStage("scanning");
    },
    []
  );

  const completeScanning = useCallback(() => {
    setStage("results");
  }, []);

  const reset = useCallback(() => {
    setStage("form");
    setFormData(null);
    setImageId(null);
  }, []);

  return { stage, formData, imageId, submitForm, completeScanning, reset };
}
