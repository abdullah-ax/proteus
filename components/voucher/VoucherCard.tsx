"use client";

import { QRCodeSVG } from "qrcode.react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MOCK_VOUCHER } from "@/lib/mockData";
import { MapPin, Store } from "lucide-react";

interface VoucherCardProps {
  reward: {
    image: string;
    title: string;
    vendor: string;
    location: string;
  };
  voucherCode: string;
}

export function VoucherCard({ reward, voucherCode }: VoucherCardProps) {
  return (
    <GlassCard strong className="p-6 max-w-sm mx-auto text-center">
      <img
        src={reward.image}
        alt={reward.title}
        className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold text-white mb-1">{reward.title}</h2>

      <div className="flex items-center justify-center gap-4 mb-5 text-xs text-white/60">
        <span className="flex items-center gap-1">
          <Store className="w-3.5 h-3.5" /> {reward.vendor}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" /> {reward.location}
        </span>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-2xl p-4 inline-block mb-4">
        <QRCodeSVG value={voucherCode} size={160} level="M" />
      </div>

      <p className="text-sm font-mono text-ocean-surface mb-4 tracking-wider">
        {voucherCode}
      </p>

      <p className="text-xs text-white/40 leading-relaxed">
        {MOCK_VOUCHER.terms}
      </p>
    </GlassCard>
  );
}
