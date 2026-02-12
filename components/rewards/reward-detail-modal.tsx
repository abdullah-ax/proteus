"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REWARDS } from "@/lib/mockData";

type Reward = (typeof REWARDS)[number];

interface RewardDetailModalProps {
  reward: Reward;
  onClose: () => void;
  onConfirm: (reward: Reward) => void;
  totalPoints: number;
}

export default function RewardDetailModal({
  reward,
  onClose,
  onConfirm,
  totalPoints,
}: RewardDetailModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const canRedeem = totalPoints >= reward.points;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/8 border border-white/15 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg transition-colors z-10 hover:bg-white/10 text-white"
        >
          <X size={24} />
        </button>

        <div className="flex-1 overflow-y-auto p-8 pr-12">
          <div className="relative h-56 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-blue-400/20 to-blue-600/20">
            <img src={reward.image} alt={reward.title} className="w-full h-full object-cover" />
          </div>

          <h3 className="text-3xl font-semibold mb-2 text-white">{reward.title}</h3>
          <p className="text-sm font-semibold mb-6 text-[#1E88E5]">{reward.vendor}</p>

          <div className="space-y-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold mb-2 text-[#EAF6FF]">
                Description
              </p>
              <p className="text-sm text-[#CFE3F7]">{reward.description}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide font-semibold mb-2 text-[#EAF6FF]">
                Location
              </p>
              <p className="text-sm text-[#CFE3F7]">{reward.location}</p>
            </div>

            <div className="pt-4 border-t border-white/15">
              <p className="text-xs uppercase tracking-wide font-semibold mb-3 text-[#EAF6FF]">
                Points Required
              </p>
              <p className="text-3xl font-semibold text-white">{reward.points}</p>
            </div>
          </div>

          {showConfirmation && (
            <div className="p-4 rounded-lg mb-8 space-y-4 border border-white/15 bg-white/8">
              <p className="text-sm font-medium text-[#CFE3F7]">
                Confirm redemption? Points will be deducted and a voucher will be generated.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 rounded-lg font-medium transition-all border border-white/15 bg-white/8 text-[#CFE3F7]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => onConfirm(reward)}
                  className="flex-1 text-white font-semibold rounded-lg transition-all bg-[#1E88E5]"
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>

        {!showConfirmation && (
          <div className="border-t border-white/15 p-6">
            <Button
              onClick={() => setShowConfirmation(true)}
              disabled={!canRedeem}
              className="w-full text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: canRedeem ? "#1E88E5" : "rgba(30,136,229,0.5)" }}
            >
              {!canRedeem ? `Need ${reward.points - totalPoints} more points` : "Redeem"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
