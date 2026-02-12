"use client";

import { Progress } from "@/components/ui/progress";
import { CHALLENGES } from "@/lib/mockData";

interface PointsAndChallengesProps {
  totalPoints: number;
}

export default function PointsAndChallenges({ totalPoints }: PointsAndChallengesProps) {
  const egpValue = totalPoints * 1.5;
  const usdValue = totalPoints * 0.03;
  const eurValue = totalPoints * 0.028;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/8 border border-white/15 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-[#EAF6FF]">
          Your Points
        </p>
        <p className="text-8xl font-semibold mb-6 leading-tight text-white">
          {totalPoints.toLocaleString()}
        </p>

        <div className="flex justify-between items-end pt-6 border-t border-white/15">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-wide mb-1 text-[#EAF6FF]">
              EGP
            </span>
            <span className="text-sm font-semibold text-[#CFE3F7]">
              {egpValue.toFixed(0)} LE
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-wide mb-1 text-[#EAF6FF]">
              USD
            </span>
            <span className="text-sm font-semibold text-[#CFE3F7]">
              ${usdValue.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-wide mb-1 text-[#EAF6FF]">
              EUR
            </span>
            <span className="text-sm font-semibold text-[#CFE3F7]">
              €{eurValue.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/8 border border-white/15 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-[#EAF6FF]">
          Seasonal Challenges
        </p>

        <div className="space-y-6">
          {CHALLENGES.slice(0, 2).map((challenge) => (
            <div key={challenge.id}>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold text-white">{challenge.title}</p>
                <p className="text-xs font-semibold px-3 py-1 rounded-full border border-white/25 bg-white/15 text-white">
                  +{challenge.reward} pts
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Progress
                    value={challenge.progress}
                    className="h-2 bg-white/20 border border-white/25 rounded-full"
                  />
                </div>
                <p className="text-xs font-semibold whitespace-nowrap text-[#CFE3F7]">
                  {challenge.progress}%
                </p>
              </div>
              <p className="text-xs font-medium mt-2 text-white/65">
                Challenge progress
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
