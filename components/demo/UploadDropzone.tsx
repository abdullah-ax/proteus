"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UploadDropzone() {
  return (
    <Card className="border-dashed p-6 text-center">
      <p className="text-sm text-white/80">Drag & drop or upload your photo.</p>
      <Button variant="ghost" className="mt-3">
        Upload
      </Button>
    </Card>
  );
}
