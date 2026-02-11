"use client";

import { useEffect, useState } from "react";
import { STEWARDSHIP_PLEDGES } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const STORAGE_KEY = "proteus_promise_v1";

export function PromiseModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) setOpen(true);
  }, []);

  const handleAgree = () => {
    localStorage.setItem(STORAGE_KEY, "agreed");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Promise of Stewardship</DialogTitle>
          <DialogDescription>
            Proteus explorers commit to protecting the Red Sea with every dive.
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-4 space-y-3 text-sm text-white/80">
          {STEWARDSHIP_PLEDGES.map((pledge) => (
            <li key={pledge} className="rounded-xl border border-white/10 bg-white/5 p-3">
              {pledge}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleAgree}>Agree</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
