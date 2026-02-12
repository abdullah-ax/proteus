"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import StewardshipModal from "@/components/rewards/stewardship-modal";
import PointsAndChallenges from "@/components/rewards/points-and-challenges";
import RewardsTable from "@/components/rewards/rewards-table";
import RewardDetailModal from "@/components/rewards/reward-detail-modal";
import DirectRedeemConfirmation from "@/components/rewards/direct-redeem-confirmation";
import VoucherView from "@/components/rewards/voucher-view";
import WaterFooter from "@/components/rewards/water-footer";
import ImageCarousel from "@/components/rewards/image-carousel";
import { useRewardsContext } from "@/app/RewardsProvider";
import { REWARDS } from "@/lib/mockData";

export default function HubPage() {
  const router = useRouter();
  const { points, redeemReward } = useRewardsContext();
  const [showStewardship, setShowStewardship] = useState(true);
  const [selectedReward, setSelectedReward] = useState<(typeof REWARDS)[number] | null>(null);
  const [showDirectRedeemConfirm, setShowDirectRedeemConfirm] = useState(false);
  const [voucherData, setVoucherData] = useState<(typeof REWARDS)[number] | null>(null);

  useEffect(() => {
    const hasSeen = localStorage.getItem("stewardship_seen");
    if (hasSeen) setShowStewardship(false);
  }, []);

  const handleStewardshipAgree = () => {
    localStorage.setItem("stewardship_seen", "true");
    setShowStewardship(false);
  };

  const handleRedeemConfirm = (reward: (typeof REWARDS)[number]) => {
    const code = redeemReward(reward.id);
    if (!code) return;
    setVoucherData(reward);
    setSelectedReward(null);
    setShowDirectRedeemConfirm(false);
  };

  const handleDirectRedeemClick = (reward: (typeof REWARDS)[number]) => {
    setSelectedReward(reward);
    setShowDirectRedeemConfirm(true);
  };

  const handleCloseVoucher = () => {
    setVoucherData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F3C] via-[#0F3057] to-[#0B3C6D]">
      <Header />

      {showStewardship && <StewardshipModal onAgree={handleStewardshipAgree} />}

      {voucherData ? (
        <VoucherView reward={voucherData} onClose={handleCloseVoucher} />
      ) : (
        <>
          <main className="space-y-6 max-w-7xl mx-auto">
            <div className="px-6 pt-8">
              <ImageCarousel />
            </div>
            <div className="px-6 pt-2">
              <PointsAndChallenges totalPoints={points} />
            </div>
            <div className="px-6 pb-12">
              <RewardsTable
                onSelectReward={setSelectedReward}
                totalPoints={points}
                onDirectRedeem={handleDirectRedeemClick}
              />
            </div>
          </main>

          <WaterFooter
            onCenterBubbleClick={() => router.push("/scan")}
            onLeftBubbleClick={() => router.push("/fishdex")}
            onRightBubbleClick={() => router.push("/map")}
          />
        </>
      )}

      {selectedReward && !voucherData && !showDirectRedeemConfirm && (
        <RewardDetailModal
          reward={selectedReward}
          totalPoints={points}
          onClose={() => setSelectedReward(null)}
          onConfirm={handleRedeemConfirm}
        />
      )}

      {selectedReward && showDirectRedeemConfirm && (
        <DirectRedeemConfirmation
          reward={selectedReward}
          totalPoints={points}
          onConfirm={handleRedeemConfirm}
          onCancel={() => {
            setSelectedReward(null);
            setShowDirectRedeemConfirm(false);
          }}
        />
      )}
    </div>
  );
}
