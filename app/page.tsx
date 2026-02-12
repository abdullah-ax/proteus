"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { HubHeader } from "@/components/hub/HubHeader";
import { ImageCarousel } from "@/components/hub/ImageCarousel";
import { PointsCard } from "@/components/hub/PointsCard";
import { ChallengesCard } from "@/components/hub/ChallengesCard";
import { RewardsSection } from "@/components/hub/RewardsSection";
import { WaterSurface } from "@/components/hub/WaterSurface";
import { StewardshipModal } from "@/components/hub/StewardshipModal";
import { RewardDetailPopup } from "@/components/hub/RewardDetailPopup";
import { motion } from "framer-motion";

export default function HubPage() {
  const router = useRouter();
  const [isWaveHovered, setIsWaveHovered] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  return (
    <OceanLayout className="flex flex-col min-h-screen overflow-hidden">
      <StewardshipModal />

      <motion.div
        className="flex flex-col flex-1"
        animate={{ opacity: isWaveHovered ? 0.15 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <HubHeader />

        <ImageCarousel />

        <div className="flex gap-3 px-5 py-3">
          <PointsCard />
          <ChallengesCard />
        </div>

        <RewardsSection onRewardClick={setSelectedReward} />
      </motion.div>

      <WaterSurface
        isHovered={isWaveHovered}
        onHoverStart={() => setIsWaveHovered(true)}
        onHoverEnd={() => setIsWaveHovered(false)}
        onScanClick={() => router.push("/scan")}
      />

      <RewardDetailPopup
        rewardId={selectedReward}
        onClose={() => setSelectedReward(null)}
      />
    </OceanLayout>
  );
}
