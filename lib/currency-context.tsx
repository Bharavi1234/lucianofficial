"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Currency,
  Country,
  COUNTRIES,
  formatPrice as formatPriceUtil,
  getStartingPrice as getStartingPriceUtil,
} from "./pricing";

interface CurrencyContextType {
  currency: Currency;
  country: Country;
  setCountry: (country: Country) => void;
  formatPrice: (usdAmount: number, unit?: string) => string;
  getStartingPrice: (slug: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  country: COUNTRIES[1], // United States default
  setCountry: () => {},
  formatPrice: (usdAmount: number, unit?: string) => `$${usdAmount}${unit || ""}`,
  getStartingPrice: (slug: string) => "$35",
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Default to Nepal (NPR) as primary agency base, or loaded from localStorage
  const [country, setCountryState] = useState<Country>(COUNTRIES[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedCountryCode = localStorage.getItem("selectedCountryCode");
      if (savedCountryCode) {
        const savedCountry = COUNTRIES.find((c) => c.code === savedCountryCode);
        if (savedCountry) {
          setCountryState(savedCountry);
        }
      }
    } catch (e) {
      console.error("Failed to load currency preference", e);
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "selectedCountryCode" && e.newValue) {
        const matching = COUNTRIES.find((c) => c.code === e.newValue);
        if (matching) setCountryState(matching);
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Country>;
      if (customEvent.detail) {
        setCountryState(customEvent.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("currencyChanged", handleCustomEvent);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("currencyChanged", handleCustomEvent);
    };
  }, []);

  const setCountry = useCallback((newCountry: Country) => {
    setCountryState(newCountry);
    try {
      localStorage.setItem("selectedCountryCode", newCountry.code);
      localStorage.setItem("selectedCountry", JSON.stringify(newCountry));
      localStorage.setItem("selectedCurrency", newCountry.currency);
      window.dispatchEvent(
        new CustomEvent<Country>("currencyChanged", { detail: newCountry })
      );
    } catch (e) {
      console.error("Failed to save country preference", e);
    }
  }, []);

  const currentCurrency: Currency = mounted ? country.currency : "NPR";

  const formatPrice = useCallback(
    (usdAmount: number, unit?: string) => {
      return formatPriceUtil(usdAmount, currentCurrency, unit);
    },
    [currentCurrency]
  );

  const getStartingPrice = useCallback(
    (slug: string) => {
      return getStartingPriceUtil(slug, currentCurrency);
    },
    [currentCurrency]
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency: currentCurrency,
        country,
        setCountry,
        formatPrice,
        getStartingPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
