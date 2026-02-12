"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { REWARDS, REWARD_CATEGORIES } from "@/lib/mockData";

interface RewardsTableProps {
  onSelectReward: (reward: (typeof REWARDS)[number]) => void;
  totalPoints: number;
  onDirectRedeem: (reward: (typeof REWARDS)[number]) => void;
}

export default function RewardsTable({
  onSelectReward,
  totalPoints,
  onDirectRedeem,
}: RewardsTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(
    () => REWARD_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
    []
  );

  const filteredRewards = useMemo(() => {
    return REWARDS.filter((reward) => {
      const matchesCategory =
        selectedCategory === "all" || reward.category === selectedCategory;
      const matchesSearch =
        reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleDirectRedeem = (
    e: React.MouseEvent<HTMLButtonElement>,
    reward: (typeof REWARDS)[number]
  ) => {
    e.stopPropagation();
    onDirectRedeem(reward);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/8 border border-white/15 rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h3 className="text-2xl font-semibold text-white">Available Rewards</h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <label className="text-xs font-semibold uppercase tracking-widest block mb-2 text-[#EAF6FF]">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-48 rounded-lg h-10 shadow-sm transition-colors bg-white/10 border border-white/15 text-white px-3"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-black">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="text-xs font-semibold uppercase tracking-widest block mb-2 text-[#EAF6FF]">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/65" />
                <Input
                  placeholder="Find rewards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 rounded-lg h-10 shadow-sm transition-colors placeholder:text-white/65"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "#FFFFFF",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredRewards.slice(0, 5).length > 0 ? (
            filteredRewards.slice(0, 5).map((reward) => (
              <div
                key={reward.id}
                onClick={() => onSelectReward(reward)}
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 group hover-fade-out"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderWidth: "1px",
                }}
              >
                <div
                  className="flex-shrink-0 w-14 h-14 relative rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.2)",
                    borderWidth: "1px",
                  }}
                >
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-sm text-white">
                    {reward.title}
                  </p>
                  <p className="text-xs truncate text-[#CFE3F7]">
                    {reward.description}
                  </p>
                  <p className="text-xs font-medium mt-0.5 text-white/65">
                    {reward.vendor} • {reward.location}
                  </p>
                </div>

                <div className="flex-shrink-0 flex flex-col items-stretch gap-2 w-24">
                  <div
                    className="px-3 py-1.5 rounded-lg text-center"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(255,255,255,0.25)",
                      borderWidth: "1px",
                    }}
                  >
                    <p className="font-semibold text-xs text-white">
                      {reward.points} pts
                    </p>
                  </div>
                  <Button
                    onClick={(e) => handleDirectRedeem(e, reward)}
                    disabled={reward.points > totalPoints}
                    className="disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs px-4 py-1.5 rounded-lg transition-all duration-200 font-medium shadow-sm w-full"
                    style={{
                      backgroundColor:
                        reward.points > totalPoints
                          ? "rgba(30,136,229,0.5)"
                          : "#1E88E5",
                    }}
                  >
                    Redeem
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-sm font-medium text-[#CFE3F7]">
                No rewards found
              </p>
              <p className="text-xs text-white/65">
                Try adjusting your search or category filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
