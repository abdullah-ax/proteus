"use client";

import { OceanLayout } from "@/components/layout/OceanLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { VOUCHER } from "@/lib/mockData";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";

export default function VoucherPage() {
  const router = useRouter();
  return (
    <OceanLayout className="ocean-font">
      <main className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6 py-12">
        <GlassCard strong className="w-full p-6">
          <h2 className="text-2xl font-semibold text-white">{VOUCHER.title}</h2>
          <p className="text-sm text-white/70">{VOUCHER.vendor}</p>
          <p className="mt-3 text-sm text-white/70">{VOUCHER.description}</p>

          <div className="mt-6 flex items-center justify-center rounded-2xl bg-white p-4">
            <QRCodeCanvas value={VOUCHER.code} size={160} fgColor="#0B2A45" />
          </div>
          <p className="mt-4 text-center text-xs text-white/70">
            Show this QR at the vendor to redeem.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <OceanButton variant="ghost" onClick={() => router.push("/")}>Back</OceanButton>
            <OceanButton>Download</OceanButton>
          </div>
        </GlassCard>
      </main>
    </OceanLayout>
  );
}
