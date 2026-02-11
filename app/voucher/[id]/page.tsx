"use client";

import { useRouter } from "next/navigation";
import { OceanLayout } from "@/components/layout/OceanLayout";
import { VoucherCard } from "@/components/voucher/VoucherCard";
import { REWARDS, MOCK_VOUCHER } from "@/lib/mockData";
import { useRewardsContext } from "@/app/RewardsProvider";

export default function VoucherPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { getVoucherCode } = useRewardsContext();
  const reward = REWARDS.find((item) => item.id === params.id);

  if (!reward) {
    return (
      <OceanLayout className="ocean-font">
        <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6">
          <p className="text-white/70">Reward not found.</p>
        </main>
      </OceanLayout>
    );
  }

  const code = getVoucherCode(params.id) ?? MOCK_VOUCHER.code;

  return (
    <OceanLayout className="ocean-font">
      <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-12">
        <VoucherCard
          title={reward.title}
          vendor={reward.vendor}
          image={reward.image}
          code={code}
          terms={MOCK_VOUCHER.terms}
          onBack={() => router.push("/")}
        />
      </main>
    </OceanLayout>
  );
}
