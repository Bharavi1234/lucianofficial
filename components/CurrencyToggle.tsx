"use client";

import React from "react";
import { useCurrency } from "@/lib/currency-context";
import { COUNTRIES } from "@/lib/pricing";

interface CurrencyToggleProps {
  className?: string;
}

export function CurrencyToggle({ className = "" }: CurrencyToggleProps) {
  const { currency, setCountry } = useCurrency();

  const handleToggle = (curr: "USD" | "NPR") => {
    if (curr === "NPR") {
      const nepal = COUNTRIES.find((c) => c.code === "NP") || COUNTRIES[0];
      setCountry(nepal);
    } else {
      const us = COUNTRIES.find((c) => c.code === "US") || COUNTRIES[1];
      setCountry(us);
    }
  };

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-surface border border-white/10 shadow-inner ${className}`}
      role="group"
      aria-label="Currency Selector"
    >
      <button
        type="button"
        onClick={() => handleToggle("NPR")}
        className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
          currency === "NPR"
            ? "bg-gold text-background shadow-[0_0_12px_rgba(245,176,65,0.4)] scale-100"
            : "text-mutedText hover:text-white"
        }`}
      >
        ₹ NPR
      </button>
      <button
        type="button"
        onClick={() => handleToggle("USD")}
        className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
          currency === "USD"
            ? "bg-gold text-background shadow-[0_0_12px_rgba(245,176,65,0.4)] scale-100"
            : "text-mutedText hover:text-white"
        }`}
      >
        $ USD
      </button>
    </div>
  );
}
