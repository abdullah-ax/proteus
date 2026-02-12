"use client";

import { useParams, useRouter } from "next/navigation";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { VoucherCard } from "@/components/voucher/VoucherCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { useRewardsContext } from "@/app/RewardsProvider";
import { REWARDS } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";

export default function VoucherPage() {
  const params = useParams();
  const router = useRouter();
  const { getVoucherCode } = useRewardsContext();

  const rewardId = params.id as string;
  const reward = REWARDS.find((r) => r.id === rewardId);
  const voucherCode = getVoucherCode(rewardId);

  if (!reward || !voucherCode) {
    return (
      <OceanLayout className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-white/70 mb-4">Voucher not found</p>
          <OceanButton onClick={() => router.push("/")}>Back to Hub</OceanButton>
        </div>
      </OceanLayout>
    );
  }

  return (
    <OceanLayout className="min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => router.push("/")}
          className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center"
        >
          <ArrowLeft className="w-[18px] h-[18px] text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">Your Voucher</h1>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 pb-8">
        <VoucherCard reward={reward} voucherCode={voucherCode} />
      </div>

      <div className="px-5 pb-8">
        <OceanButton
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => router.push("/")}
        >
          Back to Hub
        </OceanButton>
      </div>
    </OceanLayout>
  );
}
