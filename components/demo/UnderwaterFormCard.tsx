"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActivityToggle } from "./ActivityToggle";
import { ConditionalDiveFields } from "./ConditionalDiveFields";
import { UploadDropzone } from "./UploadDropzone";

interface UnderwaterFormCardProps {
  onScan: () => void;
}

export function UnderwaterFormCard({ onScan }: UnderwaterFormCardProps) {
  const [activity, setActivity] = useState<"snorkeling" | "diving">("snorkeling");
  const [site, setSite] = useState("");

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Scan Fish</CardTitle>
        <p className="text-sm text-white/70">Upload a clear underwater photo to identify species.</p>
      </CardHeader>

      <CardContent className="mt-4 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Activity</p>
          <ActivityToggle value={activity} onChange={setActivity} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Dive Site Name</p>
          <Input
            value={site}
            onChange={(event) => setSite(event.target.value)}
            placeholder="Ras Mohammed"
          />
        </div>

        <ConditionalDiveFields active={activity === "diving"} />

        <UploadDropzone />

        <Button size="lg" onClick={onScan}>
          Confirm & Scan
        </Button>
      </CardContent>
    </Card>
  );
}
