"use client";

import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REWARDS } from "@/lib/mockData";

type Reward = (typeof REWARDS)[number];

interface VoucherViewProps {
  reward: Reward;
  onClose: () => void;
}

export default function VoucherView({ reward, onClose }: VoucherViewProps) {
  const generateQRCode = () => "/placeholder.svg?height=200&width=200&query=qr-code";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/40 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-300 to-green-600 rounded-full flex items-center justify-center mb-6 text-2xl">
            ✓
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Redemption Confirmed
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Your voucher has been generated successfully
          </p>

          <div className="w-full bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-300 rounded-2xl p-6 mb-6">
            <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-2">
              {reward.category} Voucher
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {reward.title}
            </h3>
            <p className="text-sm text-gray-700 mb-4">{reward.vendor}</p>
            <p className="text-xs text-gray-600 mb-4">{reward.description}</p>

            <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <img
                  src={generateQRCode()}
                  alt="Voucher QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-900 mb-2">
              Show this QR at the vendor to redeem
            </p>
            <p className="text-xs text-gray-600">
              Valid for one-time use at {reward.location}
            </p>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
            <Download size={18} />
            Download Voucher
          </Button>

          <p className="text-xs text-gray-500 mt-4">
            Check your email for a copy of this voucher
          </p>
        </div>
      </div>
    </div>
  );
}
