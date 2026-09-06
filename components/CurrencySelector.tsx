"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Search, Check } from "lucide-react";
import { COUNTRIES, Country } from "@/lib/pricing";
import { useCurrency } from "@/lib/currency-context";

interface CurrencySelectorProps {
  className?: string;
  isMobileDrawer?: boolean;
}

export function CurrencySelector({ className = "", isMobileDrawer = false }: CurrencySelectorProps) {
  const { country: selectedCountry, setCountry, currency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto-focus search input when opening
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm("");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredCountries = COUNTRIES.filter((c) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term) ||
      c.currency.toLowerCase().includes(term)
    );
  });

  const handleSelect = (country: Country) => {
    setCountry(country);
    setIsOpen(false);
  };

  const currencySymbol = currency === "NPR" ? "₹" : "$";
  const displayText = `${currency} (${currencySymbol})`;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select country and currency. Currently selected: ${selectedCountry.name} (${currency})`}
        className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#151515] border border-white/15 hover:border-gold/60 text-primaryText text-xs font-mono font-medium transition-all duration-200 hover:shadow-[0_0_15px_rgba(245,176,65,0.2)] active:scale-95 ${
          isOpen ? "border-gold ring-1 ring-gold shadow-[0_0_15px_rgba(245,176,65,0.25)]" : ""
        } ${isMobileDrawer ? "w-full justify-between py-2.5 px-4" : ""}`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span className="font-semibold">{displayText}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-mutedText">
          <span className="text-[11px] hidden lg:inline-block max-w-[80px] truncate text-mutedText/80">
            {selectedCountry.code}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-gold" : ""
            }`}
          />
        </span>
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div
          className={`absolute ${
            isMobileDrawer
              ? "left-0 right-0 top-full mt-2 w-full"
              : "right-0 top-full mt-2 w-72 sm:w-80"
          } max-h-[380px] bg-[#151515] border border-gold/40 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl`}
        >
          {/* Search Header */}
          <div className="p-3 bg-[#0A0A0A] border-b border-white/10 sticky top-0 z-10">
            <div className="relative">
              <Search className="w-4 h-4 text-mutedText absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country or code..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-[#151515] border border-white/10 rounded-lg text-primaryText placeholder:text-mutedText/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors font-mono"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-mutedText mt-2 px-1">
              <span>Nepal: NPR (₹)</span>
              <span>All other countries: USD ($)</span>
            </div>
          </div>

          {/* Scrollable Country List */}
          <div
            role="listbox"
            className="overflow-y-auto max-h-[280px] p-1.5 space-y-1 divide-y divide-white/5 scrollbar-thin scrollbar-thumb-white/10"
          >
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-mutedText font-mono">
                No matching country found.
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = selectedCountry.code === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                      isSelected
                        ? "bg-gold/15 text-gold font-bold border border-gold/30"
                        : "text-primaryText hover:bg-white/5 hover:text-gold"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base flex-shrink-0">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-2 font-mono text-[11px]">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          c.currency === "NPR"
                            ? "bg-gold/20 text-gold border border-gold/40"
                            : "bg-white/5 text-mutedText"
                        }`}
                      >
                        {c.currency} {c.currency === "NPR" ? "₹" : "$"}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-gold" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
