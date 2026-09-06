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

export interface LocationDetails {
  countryName: string;
  countryCode: string;
  city?: string;
  region?: string;
  timezone: string;
  ip?: string;
  isAutoDetected: boolean;
}

interface CurrencyContextType {
  currency: Currency;
  country: Country;
  setCountry: (country: Country) => void;
  formatPrice: (usdAmount: number, unit?: string, nprAmount?: number) => string;
  getStartingPrice: (slug: string) => string;
  locationDetails: LocationDetails;
  detectionComplete: boolean;
}

const defaultLocation: LocationDetails = {
  countryName: "",
  countryCode: "",
  timezone: "UTC",
  isAutoDetected: false,
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  country: COUNTRIES[1],
  setCountry: () => {},
  formatPrice: (usdAmount: number, unit?: string, _nprAmount?: number) => `$${usdAmount}${unit || ""}`,
  getStartingPrice: (_slug: string) => "$35",
  locationDetails: defaultLocation,
  detectionComplete: false,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<Country>(COUNTRIES[1]);
  const [locationDetails, setLocationDetails] = useState<LocationDetails>(defaultLocation);
  const [mounted, setMounted] = useState(false);
  const [detectionComplete, setDetectionComplete] = useState(false);

  useEffect(() => {
    setMounted(true);

    let clientTimezone = "UTC";
    try {
      clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch (e) {
      console.warn("Timezone error:", e);
    }

    const savedCountryCode = localStorage.getItem("selectedCountryCode");
    const hasExplicitChoice = !!savedCountryCode;

    // If user already made a choice in a previous visit, use it and skip detection
    if (hasExplicitChoice) {
      const savedCountry = COUNTRIES.find((c) => c.code === savedCountryCode);
      if (savedCountry) {
        setCountryState(savedCountry);
        setLocationDetails({
          countryName: savedCountry.name,
          countryCode: savedCountry.code,
          timezone: clientTimezone,
          isAutoDetected: false,
        });
        setDetectionComplete(true);
        return;
      }
    }

    // Auto-detect visitor location asynchronously
    const detectLocation = async () => {
      let detectedCode = "";
      let detectedCity = "";
      let detectedRegion = "";
      let detectedIp = "";

      // 1. Check client-side timezone fast heuristic
      if (clientTimezone.includes("Kathmandu") || clientTimezone.includes("Katmandu")) {
        detectedCode = "NP";
      }

      // 2. Query internal Vercel header detection route
      try {
        const res = await fetch("/api/detect-location");
        if (res.ok) {
          const data = await res.json();
          if (data.countryCode) {
            detectedCode = data.countryCode;
            detectedCity = data.city || "";
            detectedRegion = data.region || "";
            detectedIp = data.ip || "";
          }
        }
      } catch (err) {
        console.warn("Internal location detect notice:", err);
      }

      // 3. Fallback to public IP geolocation if still not detected
      if (!detectedCode) {
        try {
          const ipRes = await fetch("https://ipapi.co/json/", { cache: "no-store" });
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            detectedCode = ipData.country_code || "";
            detectedCity = ipData.city || "";
            detectedRegion = ipData.region || "";
            detectedIp = ipData.ip || "";
          }
        } catch (err) {
          console.warn("Public IP detect notice:", err);
        }
      }

      // If we found a detected country code, apply it
      if (detectedCode) {
        const matchedCountry =
          COUNTRIES.find(
            (c) => c.code.toUpperCase() === detectedCode.toUpperCase()
          ) || (detectedCode === "NP" ? COUNTRIES[0] : COUNTRIES[1]);

        setLocationDetails({
          countryName: matchedCountry.name,
          countryCode: matchedCountry.code,
          city: detectedCity,
          region: detectedRegion,
          timezone: clientTimezone,
          ip: detectedIp,
          isAutoDetected: true,
        });

        setCountryState(matchedCountry);
      }

      // Mark detection as complete regardless of whether we found a country
      setDetectionComplete(true);
    };

    detectLocation();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "selectedCountryCode" && e.newValue) {
        const matching = COUNTRIES.find((c) => c.code === e.newValue);
        if (matching) {
          setCountryState(matching);
          setLocationDetails((prev) => ({
            ...prev,
            countryName: matching.name,
            countryCode: matching.code,
            isAutoDetected: false,
          }));
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Country>;
      if (customEvent.detail) {
        setCountryState(customEvent.detail);
        setLocationDetails((prev) => ({
          ...prev,
          countryName: customEvent.detail.name,
          countryCode: customEvent.detail.code,
          isAutoDetected: false,
        }));
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
    setLocationDetails((prev) => ({
      ...prev,
      countryName: newCountry.name,
      countryCode: newCountry.code,
      isAutoDetected: false,
    }));

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

  const currentCurrency: Currency = mounted ? country.currency : "USD";

  const formatPrice = useCallback(
    (usdAmount: number, unit?: string, nprAmount?: number) => {
      return formatPriceUtil(usdAmount, currentCurrency, unit, nprAmount);
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
        locationDetails,
        detectionComplete,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
