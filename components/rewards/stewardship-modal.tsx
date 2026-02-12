"use client";

import { Button } from "@/components/ui/button";
import { PLEDGES } from "@/lib/mockData";

interface StewardshipModalProps {
  onAgree: () => void;
}

export default function StewardshipModal({ onAgree }: StewardshipModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-8 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Promise of Stewardship
          </h2>
          <p className="text-sm text-gray-600">
            Before you begin, we ask you to commit to these principles
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {PLEDGES.map((pledge, idx) => (
            <div key={pledge.id} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-700 pt-0.5">{pledge.text}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={onAgree}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          I Agree to These Principles
        </Button>
      </div>
    </div>
  );
}
