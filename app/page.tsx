"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { StewardshipModal } from "@/components/hub/StewardshipModal";
import { HubHeader } from "@/components/hub/HubHeader";
import { ImageCarousel } from "@/components/hub/ImageCarousel";
import { PointsCard } from "@/components/hub/PointsCard";
import { ChallengesCard } from "@/components/hub/ChallengesCard";
import { RewardsSection } from "@/components/hub/RewardsSection";
import { WaterSurface } from "@/components/hub/WaterSurface";
import { RewardDetailPopup } from "@/components/hub/RewardDetailPopup";

export default function Home() {
  const router = useRouter();
  const [isWaveHovered, setIsWaveHovered] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  return (
    <OceanLayout className="ocean-font">
      <StewardshipModal />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <HubHeader />

        <section className={isWaveHovered ? "opacity-15 transition-opacity duration-200" : "transition-opacity duration-200"}>
          <ImageCarousel />
        </section>

        <section className="grid gap-4 md:grid-cols-[1.1fr_1.4fr]">
          <PointsCard />
          <ChallengesCard />
        </section>

        <RewardsSection onSelectReward={setSelectedReward} dimmed={isWaveHovered} />

        <WaterSurface
          isHovered={isWaveHovered}
          onHoverStart={() => setIsWaveHovered(true)}
          onHoverEnd={() => setIsWaveHovered(false)}
          onScan={() => router.push("/scan")}
        />
      </main>

      <RewardDetailPopup rewardId={selectedReward} onClose={() => setSelectedReward(null)} />
    </OceanLayout>
  );
}
