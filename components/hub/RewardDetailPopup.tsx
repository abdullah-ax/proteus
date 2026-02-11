"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { REWARDS } from "@/lib/mockData";
import { useRewardsContext } from "@/app/RewardsProvider";

interface RewardDetailPopupProps {
  rewardId: string | null;
  onClose: () => void;
}

export function RewardDetailPopup({ rewardId, onClose }: RewardDetailPopupProps) {
  const router = useRouter();
  const { points, redeemReward, isRedeemed, getVoucherCode } = useRewardsContext();
  const [error, setError] = useState<string | null>(null);

  if (!rewardId) return null;
  const reward = REWARDS.find((item) => item.id === rewardId);
  if (!reward) return null;

  const redeemed = isRedeemed(rewardId);

  const handleRedeem = () => {
    setError(null);
    if (redeemed) {
      router.push(`/voucher/${rewardId}`);
      return;
    }
    const code = redeemReward(rewardId);
    if (!code) {
      setError("Not enough points to redeem this reward.");
      return;
    }
    router.push(`/voucher/${rewardId}`);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <GlassCard className="w-full max-w-xl p-6">
        <div className="relative h-48 w-full overflow-hidden rounded-3xl border border-white/15">
          <Image src={reward.image} alt={reward.title} fill className="object-cover" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">{reward.title}</h3>
            <p className="text-sm text-white/60">
              {reward.vendor} · {reward.location}
            </p>
          </div>
          <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            {reward.points} pts
          </div>
        </div>
        <p className="mt-3 text-sm text-white/70">{reward.description}</p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
          Your balance: {points.toLocaleString()} points
          {redeemed && (
            <div className="mt-2 text-white/80">
              Voucher code: {getVoucherCode(rewardId)}
            </div>
          )}
        </div>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <OceanButton variant="ghost" onClick={onClose}>
            Close
          </OceanButton>
          <OceanButton onClick={handleRedeem}>
            {redeemed ? "View Voucher" : "Redeem Now"}
          </OceanButton>
        </div>
      </GlassCard>
    </div>
  );
}
