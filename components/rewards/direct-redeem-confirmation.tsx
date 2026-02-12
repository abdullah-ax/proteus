"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REWARDS } from "@/lib/mockData";

type Reward = (typeof REWARDS)[number];

interface DirectRedeemConfirmationProps {
  reward: Reward;
  totalPoints: number;
  onConfirm: (reward: Reward) => void;
  onCancel: () => void;
}

export default function DirectRedeemConfirmation({
  reward,
  totalPoints,
  onConfirm,
  onCancel,
}: DirectRedeemConfirmationProps) {
  const canRedeem = totalPoints >= reward.points;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/8 border border-white/15 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 p-2 rounded-lg transition-colors hover:bg-white/10 text-white"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Confirm Redemption
          </h3>
          <p className="text-sm mb-6 text-[#CFE3F7]">
            Are you sure you want to redeem this reward?
          </p>

          <div className="bg-white/8 border border-white/15 rounded-xl p-4 mb-6">
            <p className="font-semibold text-lg mb-1 text-white">{reward.title}</p>
            <p className="text-sm mb-3 text-[#CFE3F7]">{reward.description}</p>
            <div className="flex justify-between items-center text-white/70">
              <span>Cost:</span>
              <span className="font-semibold text-lg text-white">
                {reward.points} points
              </span>
            </div>
          </div>

          {canRedeem ? (
            <p className="text-sm mb-6 text-[#CFE3F7]">
              You have <span className="font-semibold text-white">{totalPoints}</span>{" "}
              points available
            </p>
          ) : (
            <p className="text-sm mb-6 text-[#FFB6C1]">
              You need <span className="font-semibold">{reward.points - totalPoints}</span>{" "}
              more points
            </p>
          )}

          <div className="flex gap-3">
            <Button
              onClick={onCancel}
              className="flex-1 rounded-lg font-medium transition-all border border-white/15 bg-white/8 text-[#CFE3F7]"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onConfirm(reward)}
              disabled={!canRedeem}
              className="flex-1 text-white font-semibold rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: canRedeem ? "#1E88E5" : "rgba(30,136,229,0.5)",
              }}
            >
              Redeem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
