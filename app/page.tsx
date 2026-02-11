"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { PromiseModal } from "@/components/demo/PromiseModal";
import { CarouselSection } from "@/components/demo/CarouselSection";
import { PointsCard } from "@/components/demo/PointsCard";
import { ChallengesCard } from "@/components/demo/ChallengeCard";
import { RewardsTable } from "@/components/demo/RewardsTable";
import { RewardPopup } from "@/components/demo/RewardPopup";
import { WaveRevealController } from "@/components/demo/WaveRevealController";
import { useRewardsDemo } from "@/hooks/useRewardsDemo";

export default function Home() {
  const router = useRouter();
  const { points, redeem } = useRewardsDemo(1250);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const handleConfirm = (rewardId: string, cost: number) => {
    redeem(rewardId, cost);
    setSelectedReward(null);
    router.push(`/voucher/${rewardId}`);
  };

  return (
    <OceanLayout className="ocean-font">
      <PromiseModal />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Proteus</p>
          <h1 className="text-3xl font-semibold text-white">Rewards Hub</h1>
          <p className="mt-2 text-sm text-white/70">
            Earn points from reef discovery and redeem with trusted Red Sea partners.
          </p>
        </div>

        <WaveRevealController onScan={() => router.push("/scan")}>
          <CarouselSection />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <PointsCard points={points} />
            <ChallengesCard />
          </div>
          <div className="mt-6">
            <RewardsTable onSelect={setSelectedReward} />
          </div>
        </WaveRevealController>
      </main>

      <RewardPopup
        rewardId={selectedReward}
        onClose={() => setSelectedReward(null)}
        onConfirm={handleConfirm}
      />
    </OceanLayout>
  );
}
