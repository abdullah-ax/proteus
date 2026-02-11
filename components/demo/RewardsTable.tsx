"use client";

import { useMemo, useState } from "react";
import { REWARDS, REWARD_CATEGORIES } from "@/lib/mockData";
import { RewardRow } from "./RewardRow";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {REWARD_CATEGORIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search rewards"
          className="max-w-xs"
        />
      </div>
      <ScrollArea className="mt-4 h-72">
        <div className="space-y-3 pr-2">
          {filtered.map((reward) => (
            <RewardRow key={reward.id} {...reward} onClick={() => onSelect(reward.id)} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
