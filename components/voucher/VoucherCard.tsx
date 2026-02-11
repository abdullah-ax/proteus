"use client";
import { QRCodeCanvas } from "qrcode.react";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";

interface VoucherCardProps {
  title: string;
  vendor: string;
  image: string;
  code: string;
  terms: string;
  onBack: () => void;
}

export function VoucherCard({ title, vendor, image, code, terms, onBack }: VoucherCardProps) {
  return (
    <GlassCard strong className="mx-auto w-full max-w-lg p-6">
      <div className="relative h-44 w-full overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.5),transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
        <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.3em] text-white/60">Voucher</div>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-white/60">{vendor}</p>
      </div>
      <div className="mt-6 flex items-center justify-center rounded-2xl bg-white p-4">
        <QRCodeCanvas value={code} size={140} bgColor="#ffffff" fgColor="#0B3C6D" />
      </div>
      <p className="mt-4 text-center text-xs text-white/70">Voucher code: {code}</p>
      <p className="mt-4 text-xs text-white/60">{terms}</p>
      <div className="mt-6 flex justify-end">
        <OceanButton onClick={onBack}>Back to Hub</OceanButton>
      </div>
    </GlassCard>
  );
}
