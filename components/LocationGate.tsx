"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Globe, Search, Check, Shield } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import { COUNTRIES, Country } from "@/lib/pricing";

export function LocationGate() {
  const { locationDetails, detectionComplete, setCountry } = useCurrency();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Country | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Don't render anything during SSR or while detection is still actively in flight
  if (!mounted || !detectionComplete) {
    return null;
  }

  // If country code is known (either auto-detected or explicitly saved in localStorage), don't show gate
  if (locationDetails.countryCode) {
    return null;
  }

  const handleConfirm = () => {
    if (selectedItem) {
      setCountry(selectedItem);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/40 text-gold mb-3 shadow-[0_0_20px_rgba(245,176,65,0.2)]">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primaryText">
            Welcome to <span className="font-extrabold tracking-wider">LUCI<span className="text-gold">A</span>N</span>
          </h2>
          <p className="text-xs sm:text-sm text-mutedText mt-1.5">
            Please select your location to personalize your experience.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mutedText" />
          <input
            type="text"
            placeholder="Search your country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-primaryText placeholder-mutedText focus:outline-none focus:border-gold/60 transition-colors"
            autoFocus
          />
        </div>

        {/* Country list */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 mb-6 border border-white/5 rounded-xl p-2 bg-background/50 max-h-60">
          {filteredCountries.map((c) => {
            const isSelected = selectedItem?.code === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setSelectedItem(c)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all text-left ${
                  isSelected
                    ? "bg-gold/15 border border-gold/50 text-gold font-semibold shadow-[0_0_15px_rgba(245,176,65,0.15)]"
                    : "text-mutedText hover:text-primaryText hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-mutedText">
                    {c.code}
                  </span>
                  <span className="truncate">{c.name}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-gold shrink-0 ml-2" />}
              </button>
            );
          })}
          {filteredCountries.length === 0 && (
            <div className="text-center py-8 text-xs text-mutedText">
              No matching countries found.
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={!selectedItem}
          onClick={handleConfirm}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 bg-gold text-background hover:bg-gold/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(245,176,65,0.3)] hover:shadow-[0_0_35px_rgba(245,176,65,0.5)]"
        >
          {selectedItem ? `Continue as ${selectedItem.name}` : "Select a country to continue"}
        </button>

        {/* Security badge note */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-mutedText/70">
          <Shield className="w-3.5 h-3.5 text-gold/70" />
          <span>One-time setup · Safe & Secure</span>
        </div>
      </div>
    </div>
  );
}
