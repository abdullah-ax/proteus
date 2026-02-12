"use client";

import { useState, useCallback } from "react";

export type ScanStep = "form" | "scanning" | "results";

interface ScanFormData {
  activity: "snorkeling" | "diving";
  diveSite: string;
  depth?: number;
  duration?: number;
}

export function useScanFlow() {
  const [step, setStep] = useState<ScanStep>("form");
  const [formData, setFormData] = useState<ScanFormData | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

  const submitForm = useCallback((data: ScanFormData, uploadedImageId: string) => {
    setFormData(data);
    setImageId(uploadedImageId);
    setStep("scanning");
  }, []);

  const completeScanning = useCallback(() => {
    setStep("results");
  }, []);

  const reset = useCallback(() => {
    setStep("form");
    setFormData(null);
    setImageId(null);
  }, []);

  return { step, formData, imageId, submitForm, completeScanning, reset };
}
