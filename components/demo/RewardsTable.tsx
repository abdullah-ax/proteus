"use client";

import { useMemo, useState } from "react";
import { REWARDS, REWARD_CATEGORIES } from "@/lib/mockData";
import { RewardRow } from "./RewardRow";

interface RewardsTableProps {
  onSelect: (rewardId: string) => void;
  dimmed?: boolean;
}

export function RewardsTable({ onSelect, dimmed }: RewardsTableProps) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return REWARDS.filter((reward) => {
      const matchesCategory = category === "All" || reward.category === category;
      const query = search.toLowerCase();
      const matchesSearch = reward.title.toLowerCase().includes(query) || reward.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <div className={dimmed ? "opacity-0 translate-y-4 transition-all duration-300" : "transition-all duration-300"}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">Rewards</h3>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white"
          >
            {REWARD_CATEGORIES.map((item) => (
              <option key={item} value={item} className="text-slate-900">
                {item}
              </option>
            ))}
          </select>
        </div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search rewards"
          className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50"
        />
      </div>
      <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-2">
        {filtered.map((reward) => (
          <RewardRow key={reward.id} {...reward} onClick={() => onSelect(reward.id)} />
        ))}
      </div>
    </div>
  );
}
