"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PLEDGES } from "@/lib/mockData";
import { OceanButton } from "@/components/ui/OceanButton";
import { Shield } from "lucide-react";

export function StewardshipModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!localStorage.getItem("proteus-stewardship-pledged")) {
      setIsOpen(true);
    }
  }, []);

  const handlePledge = () => {
    localStorage.setItem("proteus-stewardship-pledged", "true");
    setIsOpen(false);
  };

  const togglePledge = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-card-strong w-full max-w-sm p-6"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-ocean-surface" />
              <h2 className="text-lg font-semibold text-white">Ocean Stewardship</h2>
            </div>
            <p className="text-sm text-white/70 mb-5">
              Before you dive in, pledge to protect the Red Sea ecosystem.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {PLEDGES.map((pledge) => (
                <label
                  key={pledge.id}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked.has(pledge.id)}
                    onChange={() => togglePledge(pledge.id)}
                    className="mt-0.5 w-4 h-4 rounded accent-ocean-surface"
                  />
                  <span className="text-sm text-white/90">{pledge.text}</span>
                </label>
              ))}
            </div>

            <OceanButton
              size="lg"
              className="w-full"
              disabled={checked.size < PLEDGES.length}
              onClick={handlePledge}
            >
              I Promise
            </OceanButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
