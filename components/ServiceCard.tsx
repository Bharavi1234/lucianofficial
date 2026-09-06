"use client";

import React from "react";
import { Star, Check, ArrowRight } from "lucide-react";
import { ServicePackage, formatPackagePrice } from "@/lib/pricing";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  packageData: ServicePackage;
  isSelected?: boolean;
  onSelect?: (pkg: ServicePackage) => void;
  className?: string;
}

export function ServiceCard({
  packageData,
  isSelected = false,
  onSelect,
  className = "",
}: ServiceCardProps) {
  const { currency } = useCurrency();
  const priceDisplay = formatPackagePrice(packageData, currency);

  return (
    <div
      className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
        packageData.isPopular
          ? "bg-surface border-2 border-gold shadow-[0_15px_40px_rgba(245,176,65,0.18)] -translate-y-1"
          : "bg-surface border border-white/10 hover:border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      } ${isSelected ? "ring-2 ring-gold" : ""} ${className}`}
    >
      {/* Most Popular Badge */}
      {packageData.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold text-background text-[11px] font-mono font-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,176,65,0.6)]">
          <Star className="w-3 h-3 fill-current" />
          <span>Most Popular</span>
        </div>
      )}

      <div>
        {/* Package Name */}
        <div className="text-xs font-mono uppercase tracking-widest text-mutedText mb-2">
          {packageData.name} Package
        </div>

        {/* Price in selected currency */}
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl sm:text-4xl font-black text-gold tracking-tight font-mono">
            {priceDisplay}
          </span>
        </div>

        {/* Deliverables / Features */}
        <div className="pt-4 border-t border-white/10 space-y-3 mb-8">
          {packageData.features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-primaryText"
            >
              <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Select Button */}
      {onSelect && (
        <Button
          type="button"
          onClick={() => onSelect(packageData)}
          className={`w-full h-12 font-bold transition-all ${
            packageData.isPopular
              ? "bg-gold text-background hover:bg-[#FFBE53] shadow-[0_0_20px_rgba(245,176,65,0.35)]"
              : "bg-white/10 text-white hover:bg-gold hover:text-background border border-white/15 hover:border-gold"
          }`}
        >
          <span>Select {packageData.name}</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
}
