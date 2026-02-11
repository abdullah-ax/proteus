"use client";

import { useMemo, useState } from "react";
import { REWARDS, REWARD_CATEGORIES } from "@/lib/mockData";
import { RewardRow } from "./RewardRow";

interface RewardsSectionProps {
  onSelectReward: (rewardId: string) => void;
  dimmed?: boolean;
}

export function RewardsSection({ onSelectReward, dimmed }: RewardsSectionProps) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const rewards = useMemo(() => {
    return REWARDS.filter((reward) => {
      const matchesCategory = category === "All" || reward.category === category;
      const query = search.toLowerCase();
      const matchesSearch =
        reward.title.toLowerCase().includes(query) ||
        reward.description.toLowerCase().includes(query) ||
        reward.vendor.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <div className={dimmed ? "opacity-15 transition-opacity duration-200" : "transition-opacity duration-200"}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Rewards Marketplace</h3>
          <p className="text-xs text-white/60">Redeem points for unique Red Sea experiences.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white"
          >
            {REWARD_CATEGORIES.map((item) => (
              <option key={item} value={item} className="text-slate-900">
                {item}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search rewards"
            className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50"
          />
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {rewards.map((reward) => (
          <RewardRow
            key={reward.id}
            image={reward.image}
            title={reward.title}
            description={reward.description}
            points={reward.points}
            onClick={() => onSelectReward(reward.id)}
          />
        ))}
      </div>
    </div>
  );
}
