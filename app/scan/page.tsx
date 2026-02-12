"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { ScanForm } from "@/components/scan/ScanForm";
import { ScanningAnimation } from "@/components/scan/ScanningAnimation";
import { ScanResults } from "@/components/scan/ScanResults";
import { useScanFlow } from "@/hooks/useScanFlow";
import { ArrowLeft } from "lucide-react";

export default function ScanPage() {
  const router = useRouter();
  const { step, imageId, submitForm, completeScanning, reset } = useScanFlow();

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#0A1F3C] via-[#0F3057] to-[#0B3C6D]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(10,31,60,0.92) 0%, rgba(15,48,87,0.92) 55%, rgba(11,60,109,0.92) 100%), url('/scan-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header transparent />
      <div className="max-w-4xl mx-auto px-6 pt-6 pb-12">
        <header className="flex items-center gap-3 mb-6">
          <button
            onClick={() => (step === "form" ? router.push("/") : reset())}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-[18px] h-[18px] text-white" />
          </button>
          <h1 className="text-xl font-semibold text-white">
            {step === "form" ? "New Scan" : step === "scanning" ? "Scanning" : "Results"}
          </h1>
        </header>

        <div className="bg-white/8 border border-white/15 rounded-2xl p-6 shadow-lg">
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
      </div>
    </div>
  );
}
