"use client";

import { createContext, useContext } from "react";
import { useRewards } from "@/hooks/useRewards";

type RewardsContextType = ReturnType<typeof useRewards>;

const RewardsContext = createContext<RewardsContextType | null>(null);

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const rewards = useRewards();
  return (
    <RewardsContext.Provider value={rewards}>
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewardsContext() {
  const ctx = useContext(RewardsContext);
  if (!ctx) throw new Error("useRewardsContext must be used within RewardsProvider");
  return ctx;
}
