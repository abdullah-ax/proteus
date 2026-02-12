"use client";

import { useState, useCallback } from "react";
import { INITIAL_POINTS, REWARDS } from "@/lib/mockData";

interface RedeemedReward {
  rewardId: string;
  voucherCode: string;
  redeemedAt: number;
}

export function useRewards() {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [redeemed, setRedeemed] = useState<RedeemedReward[]>([]);

  const addPoints = useCallback((amount: number) => {
    setPoints((prev) => prev + amount);
  }, []);

  const redeemReward = useCallback(
    (rewardId: string) => {
      const reward = REWARDS.find((r) => r.id === rewardId);
      if (!reward || points < reward.points) return null;

      const voucherCode = `PROTEUS-${rewardId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      setPoints((prev) => prev - reward.points);
      const entry: RedeemedReward = { rewardId, voucherCode, redeemedAt: Date.now() };
      setRedeemed((prev) => [...prev, entry]);
      return voucherCode;
    },
    [points]
  );

  const isRedeemed = useCallback(
    (rewardId: string) => redeemed.some((r) => r.rewardId === rewardId),
    [redeemed]
  );

  const getVoucherCode = useCallback(
    (rewardId: string) => redeemed.find((r) => r.rewardId === rewardId)?.voucherCode ?? null,
    [redeemed]
  );

  return { points, addPoints, redeemReward, isRedeemed, getVoucherCode, redeemed };
}
