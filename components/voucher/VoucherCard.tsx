"use client";

import Image from "next/image";
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
      <div className="relative h-44 w-full overflow-hidden rounded-3xl border border-white/15">
        <Image src={image} alt={title} fill className="object-cover" />
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
