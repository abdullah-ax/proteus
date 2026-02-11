"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { ScanForm } from "@/components/scan/ScanForm";
import { ScanningAnimation } from "@/components/scan/ScanningAnimation";
import { ScanResults } from "@/components/scan/ScanResults";
import { useScanFlow } from "@/hooks/useScanFlow";

export default function ScanPage() {
  const router = useRouter();
  const { stage, imageId, submitForm, completeScanning, reset } = useScanFlow();

  return (
    <OceanLayout className="ocean-font">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          {stage === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ScanForm onSubmitted={submitForm} />
            </motion.div>
          )}
          {stage === "scanning" && imageId && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScanningAnimation imageId={imageId} onComplete={completeScanning} />
            </motion.div>
          )}
          {stage === "results" && imageId && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ScanResults imageId={imageId} onReset={reset} onBack={() => router.push("/")} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </OceanLayout>
  );
}
