"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PointsCard({ points }: { points: number }) {
  return (
    <Card className="p-6">
      <CardHeader>
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Your Points</p>
        <CardTitle className="text-4xl">{points.toLocaleString()}</CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        Earn more by scanning new species and supporting reef partners.
      </CardContent>
    </Card>
  );
}
