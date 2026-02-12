"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRewardsContext } from "@/app/RewardsProvider";
import { REWARDS } from "@/lib/mockData";
import { OceanButton } from "@/components/ui/OceanButton";
import { X, MapPin, Store } from "lucide-react";

interface RewardDetailPopupProps {
  rewardId: string | null;
  onClose: () => void;
}

export function RewardDetailPopup({ rewardId, onClose }: RewardDetailPopupProps) {
  const router = useRouter();
  const { points, redeemReward, isRedeemed } = useRewardsContext();
  const reward = REWARDS.find((r) => r.id === rewardId);

  if (!reward) return null;

  const canAfford = points >= reward.points;
  const alreadyRedeemed = isRedeemed(reward.id);

  const handleRedeem = () => {
    const code = redeemReward(reward.id);
    if (code) {
      onClose();
      router.push(`/voucher/${reward.id}`);
    }
  };

  return (
    <AnimatePresence>
      {rewardId && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card-strong w-full max-w-md rounded-t-3xl p-6 pb-10"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <img
                src={reward.image}
                alt={reward.title}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <button onClick={onClose} className="p-1.5 rounded-full bg-white/10">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1">{reward.title}</h3>
            <p className="text-sm text-white/70 mb-3">{reward.description}</p>

            <div className="flex items-center gap-4 mb-5 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Store className="w-3.5 h-3.5" /> {reward.vendor}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {reward.location}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 mb-5">
              <span className="text-sm text-white/70">Cost</span>
              <span className="text-lg font-semibold font-mono text-ocean-surface">
                {reward.points} pts
              </span>
            </div>

            {alreadyRedeemed ? (
              <OceanButton variant="outline" size="lg" className="w-full" disabled>
                Already Redeemed
              </OceanButton>
            ) : (
              <OceanButton
                size="lg"
                className="w-full"
                disabled={!canAfford}
                onClick={handleRedeem}
              >
                {canAfford ? "Redeem Now" : `Need ${reward.points - points} more pts`}
              </OceanButton>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
