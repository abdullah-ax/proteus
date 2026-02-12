"use client";

import Image from "next/image";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { REWARDS } from "@/lib/mockData";

interface RewardPopupProps {
  rewardId: string | null;
  onClose: () => void;
  onConfirm: (rewardId: string, points: number) => void;
}

export function RewardPopup({ rewardId, onClose, onConfirm }: RewardPopupProps) {
  const [confirming, setConfirming] = useState(false);
  if (!rewardId) return null;

  const reward = REWARDS.find((item) => item.id === rewardId);
  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <GlassCard className="w-full max-w-lg p-6">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/20">
          <Image src={reward.image} alt={reward.title} fill className="object-cover" />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-white">{reward.title}</h3>
          <p className="text-sm text-white/70">{reward.vendor}</p>
          <p className="mt-2 text-sm text-white/70">{reward.description}</p>
          <p className="mt-2 text-xs text-white/60">{reward.location}</p>
          <p className="mt-2 text-xs text-white/70">{reward.points} pts required</p>
        </div>

        {!confirming && (
          <div className="mt-6 flex justify-end gap-3">
            <OceanButton variant="ghost" onClick={onClose}>Close</OceanButton>
            <OceanButton onClick={() => setConfirming(true)}>Redeem</OceanButton>
          </div>
        )}

        {confirming && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/80">
              Confirm redemption? Points will be deducted and a voucher will be generated.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <OceanButton variant="ghost" onClick={() => setConfirming(false)}>
                Cancel
              </OceanButton>
              <OceanButton onClick={() => onConfirm(reward.id, reward.points)}>
                Confirm
              </OceanButton>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
