"use client";

import { useCallback, useState } from "react";

export function useRewardsDemo(initialPoints: number) {
  const [points, setPoints] = useState(initialPoints);
  const [redeemed, setRedeemed] = useState<string[]>([]);

  const redeem = useCallback((rewardId: string, cost: number) => {
    setPoints((prev) => prev - cost);
    setRedeemed((prev) => (prev.includes(rewardId) ? prev : [...prev, rewardId]));
  }, []);

  return { points, redeem, redeemed };
}
