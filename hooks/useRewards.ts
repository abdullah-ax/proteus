"use client";

import { useState, useCallback } from "react";
import { INITIAL_POINTS, REWARDS } from "@/lib/mockData";

export interface RedeemedReward {
  rewardId: string;
  redeemedAt: number;
  voucherCode: string;
}

export function useRewards() {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);

  const addPoints = useCallback((amount: number) => {
    setPoints((prev) => prev + amount);
  }, []);

  const redeemReward = useCallback(
    (rewardId: string): string | null => {
      const reward = REWARDS.find((r) => r.id === rewardId);
      if (!reward || points < reward.points) return null;
      if (redeemedRewards.some((r) => r.rewardId === rewardId)) return null;

      const voucherCode = `PROTEUS-${Date.now().toString(36).toUpperCase()}`;
      setPoints((prev) => prev - reward.points);
      setRedeemedRewards((prev) => [
        ...prev,
        { rewardId, redeemedAt: Date.now(), voucherCode },
      ]);
      return voucherCode;
    },
    [points, redeemedRewards]
  );

  const getVoucherCode = useCallback(
    (rewardId: string): string | null => {
      return (
        redeemedRewards.find((r) => r.rewardId === rewardId)?.voucherCode ??
        null
      );
    },
    [redeemedRewards]
  );

  const isRedeemed = useCallback(
    (rewardId: string): boolean => {
      return redeemedRewards.some((r) => r.rewardId === rewardId);
    },
    [redeemedRewards]
  );

  const getRewardStatus = useCallback(
    (rewardId: string): "locked" | "available" | "redeemed" => {
      if (isRedeemed(rewardId)) return "redeemed";
      const reward = REWARDS.find((r) => r.id === rewardId);
      if (!reward) return "locked";
      return points >= reward.points ? "available" : "locked";
    },
    [isRedeemed, points]
  );

  return {
    points,
    addPoints,
    redeemReward,
    getVoucherCode,
    getRewardStatus,
    isRedeemed,
    redeemedRewards,
  };
}
