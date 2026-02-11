"use client";

import Image from "next/image";
import { useState } from "react";
import { REWARDS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface RewardPopupProps {
  rewardId: string | null;
  onClose: () => void;
  onConfirm: (rewardId: string, points: number) => void;
}

export function RewardPopup({ rewardId, onClose, onConfirm }: RewardPopupProps) {
  const [confirming, setConfirming] = useState(false);
  const reward = REWARDS.find((item) => item.id === rewardId);

  return (
    <Dialog open={Boolean(rewardId)} onOpenChange={(open) => !open && onClose()}>
      {reward && (
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{reward.title}</DialogTitle>
            <DialogDescription>{reward.vendor}</DialogDescription>
          </DialogHeader>
          <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/20">
            <Image src={reward.image} alt={reward.title} fill className="object-cover" />
          </div>
          <div className="mt-4 text-sm text-white/70">
            <p>{reward.description}</p>
            <p className="mt-2 text-xs text-white/60">{reward.location}</p>
            <p className="mt-2 text-xs text-white/70">{reward.points} pts required</p>
          </div>

          {!confirming && (
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>Close</Button>
              <Button onClick={() => setConfirming(true)}>Redeem</Button>
            </div>
          )}

          {confirming && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/80">
                Confirm redemption? Points will be deducted and a voucher will be generated.
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setConfirming(false)}>Cancel</Button>
                <Button onClick={() => onConfirm(reward.id, reward.points)}>Confirm</Button>
              </div>
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
