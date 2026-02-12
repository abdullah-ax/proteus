"use client";

import { useState } from "react";
import { REWARDS, REWARD_CATEGORIES } from "@/lib/mockData";
import { RewardRow } from "./RewardRow";

interface RewardsSectionProps {
  onRewardClick: (rewardId: string) => void;
}

export function RewardsSection({ onRewardClick }: RewardsSectionProps) {
  const [category, setCategory] = useState("all");

  const filtered = category === "all"
    ? REWARDS
    : REWARDS.filter((r) => r.category === category);

  return (
    <section className="px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">Rewards</h2>
        <span className="text-xs text-white/70">{filtered.length} available</span>
      </div>

      <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
        {REWARD_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              category === cat.id
                ? "bg-white text-ocean-deep"
                : "bg-white/10 text-white/80 border border-white/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((reward) => (
          <RewardRow
            key={reward.id}
            reward={reward}
            onClick={() => onRewardClick(reward.id)}
          />
        ))}
      </div>
    </section>
  );
}
