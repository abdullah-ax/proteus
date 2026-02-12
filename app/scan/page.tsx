"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { ScanForm } from "@/components/scan/ScanForm";
import { ScanningAnimation } from "@/components/scan/ScanningAnimation";
import { ScanResults } from "@/components/scan/ScanResults";
import { useScanFlow } from "@/hooks/useScanFlow";
import { ArrowLeft } from "lucide-react";

export default function ScanPage() {
  const router = useRouter();
  const { step, imageId, submitForm, completeScanning, reset } = useScanFlow();

  return (
    <OceanLayout className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => step === "form" ? router.push("/") : reset()}
          className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center"
        >
          <ArrowLeft className="w-[18px] h-[18px] text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">
          {step === "form" ? "New Scan" : step === "scanning" ? "Scanning" : "Results"}
        </h1>
      </header>

      {/* Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <ScanForm
              key="form"
              onSubmit={(data, id) => submitForm(data as Parameters<typeof submitForm>[0], id)}
            />
          )}
          {step === "scanning" && imageId && (
            <ScanningAnimation
              key="scanning"
              imageId={imageId}
              onComplete={completeScanning}
            />
          )}
          {step === "results" && imageId && (
            <ScanResults
              key="results"
              imageId={imageId}
              onReset={reset}
            />
          )}
        </AnimatePresence>
      </div>
    </OceanLayout>
  );
}
