export type Currency = "USD" | "NPR";

export const EXCHANGE_RATE = 130; // 1 USD = 130 NPR

export interface Country {
  name: string;
  code: string;
  currency: Currency;
  flag: string;
}

export interface ServicePackage {
  id: "basic" | "standard" | "premium";
  name: string;
  usdPrice: number;
  unit?: string; // e.g., "/month", "/hour", "/project"
  isPopular?: boolean;
  features: string[];
}

export interface ServicePricingData {
  slug: string;
  startingPriceUsd: number;
  startingUnit?: string;
  packages: ServicePackage[];
}

export const COUNTRIES: Country[] = [
  { name: "Nepal", code: "NP", currency: "NPR", flag: "🇳🇵" },
  { name: "United States", code: "US", currency: "USD", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", currency: "USD", flag: "🇬🇧" },
  { name: "Australia", code: "AU", currency: "USD", flag: "🇦🇺" },
  { name: "Canada", code: "CA", currency: "USD", flag: "🇨🇦" },
  { name: "India", code: "IN", currency: "USD", flag: "🇮🇳" },
  { name: "Afghanistan", code: "AF", currency: "USD", flag: "🇦🇫" },
  { name: "Albania", code: "AL", currency: "USD", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", currency: "USD", flag: "🇩🇿" },
  { name: "Andorra", code: "AD", currency: "USD", flag: "🇦🇩" },
  { name: "Angola", code: "AO", currency: "USD", flag: "🇦🇴" },
  { name: "Argentina", code: "AR", currency: "USD", flag: "🇦🇷" },
  { name: "Armenia", code: "AM", currency: "USD", flag: "🇦🇲" },
  { name: "Austria", code: "AT", currency: "USD", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "AZ", currency: "USD", flag: "🇦🇿" },
  { name: "Bahamas", code: "BS", currency: "USD", flag: "🇧🇸" },
  { name: "Bahrain", code: "BH", currency: "USD", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", currency: "USD", flag: "🇧🇩" },
  { name: "Barbados", code: "BB", currency: "USD", flag: "🇧🇧" },
  { name: "Belarus", code: "BY", currency: "USD", flag: "🇧🇾" },
  { name: "Belgium", code: "BE", currency: "USD", flag: "🇧🇪" },
  { name: "Belize", code: "BZ", currency: "USD", flag: "🇧🇿" },
  { name: "Benin", code: "BJ", currency: "USD", flag: "🇧🇯" },
  { name: "Bhutan", code: "BT", currency: "USD", flag: "🇧🇹" },
  { name: "Bolivia", code: "BO", currency: "USD", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "BA", currency: "USD", flag: "🇧🇦" },
  { name: "Botswana", code: "BW", currency: "USD", flag: "🇧🇼" },
  { name: "Brazil", code: "BR", currency: "USD", flag: "🇧🇷" },
  { name: "Brunei", code: "BN", currency: "USD", flag: "🇧🇳" },
  { name: "Bulgaria", code: "BG", currency: "USD", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "BF", currency: "USD", flag: "🇧🇫" },
  { name: "Burundi", code: "BI", currency: "USD", flag: "🇧🇮" },
  { name: "Cambodia", code: "KH", currency: "USD", flag: "🇰🇭" },
  { name: "Cameroon", code: "CM", currency: "USD", flag: "🇨🇲" },
  { name: "Cape Verde", code: "CV", currency: "USD", flag: "🇨🇻" },
  { name: "Central African Republic", code: "CF", currency: "USD", flag: "🇨🇫" },
  { name: "Chad", code: "TD", currency: "USD", flag: "🇹🇩" },
  { name: "Chile", code: "CL", currency: "USD", flag: "🇨🇱" },
  { name: "China", code: "CN", currency: "USD", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", currency: "USD", flag: "🇨🇴" },
  { name: "Comoros", code: "KM", currency: "USD", flag: "🇰🇲" },
  { name: "Congo", code: "CG", currency: "USD", flag: "🇨🇬" },
  { name: "Costa Rica", code: "CR", currency: "USD", flag: "🇨🇷" },
  { name: "Croatia", code: "HR", currency: "USD", flag: "🇭🇷" },
  { name: "Cuba", code: "CU", currency: "USD", flag: "🇨🇺" },
  { name: "Cyprus", code: "CY", currency: "USD", flag: "🇨🇾" },
  { name: "Czech Republic", code: "CZ", currency: "USD", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", currency: "USD", flag: "🇩🇰" },
  { name: "Djibouti", code: "DJ", currency: "USD", flag: "🇩🇯" },
  { name: "Dominica", code: "DM", currency: "USD", flag: "🇩🇲" },
  { name: "Dominican Republic", code: "DO", currency: "USD", flag: "🇩🇴" },
  { name: "Ecuador", code: "EC", currency: "USD", flag: "🇪🇨" },
  { name: "Egypt", code: "EG", currency: "USD", flag: "🇪🇬" },
  { name: "El Salvador", code: "SV", currency: "USD", flag: "🇸🇻" },
  { name: "Equatorial Guinea", code: "GQ", currency: "USD", flag: "🇬🇶" },
  { name: "Eritrea", code: "ER", currency: "USD", flag: "🇪🇷" },
  { name: "Estonia", code: "EE", currency: "USD", flag: "🇪🇪" },
  { name: "Eswatini", code: "SZ", currency: "USD", flag: "🇸🇿" },
  { name: "Ethiopia", code: "ET", currency: "USD", flag: "🇪🇹" },
  { name: "Fiji", code: "FJ", currency: "USD", flag: "🇫🇯" },
  { name: "Finland", code: "FI", currency: "USD", flag: "🇫🇮" },
  { name: "France", code: "FR", currency: "USD", flag: "🇫🇷" },
  { name: "Gabon", code: "GA", currency: "USD", flag: "🇬🇦" },
  { name: "Gambia", code: "GM", currency: "USD", flag: "🇬🇲" },
  { name: "Georgia", code: "GE", currency: "USD", flag: "🇬🇪" },
  { name: "Germany", code: "DE", currency: "USD", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", currency: "USD", flag: "🇬🇭" },
  { name: "Greece", code: "GR", currency: "USD", flag: "🇬🇷" },
  { name: "Grenada", code: "GD", currency: "USD", flag: "🇬🇩" },
  { name: "Guatemala", code: "GT", currency: "USD", flag: "🇬🇹" },
  { name: "Guinea", code: "GN", currency: "USD", flag: "🇬🇳" },
  { name: "Guyana", code: "GY", currency: "USD", flag: "🇬🇾" },
  { name: "Haiti", code: "HT", currency: "USD", flag: "🇭🇹" },
  { name: "Honduras", code: "HN", currency: "USD", flag: "🇭🇳" },
  { name: "Hungary", code: "HU", currency: "USD", flag: "🇭🇺" },
  { name: "Iceland", code: "IS", currency: "USD", flag: "🇮🇸" },
  { name: "Indonesia", code: "ID", currency: "USD", flag: "🇮🇩" },
  { name: "Iran", code: "IR", currency: "USD", flag: "🇮🇷" },
  { name: "Iraq", code: "IQ", currency: "USD", flag: "🇮🇶" },
  { name: "Ireland", code: "IE", currency: "USD", flag: "🇮🇪" },
  { name: "Israel", code: "IL", currency: "USD", flag: "🇮🇱" },
  { name: "Italy", code: "IT", currency: "USD", flag: "🇮🇹" },
  { name: "Jamaica", code: "JM", currency: "USD", flag: "🇯🇲" },
  { name: "Japan", code: "JP", currency: "USD", flag: "🇯🇵" },
  { name: "Jordan", code: "JO", currency: "USD", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "KZ", currency: "USD", flag: "🇰🇿" },
  { name: "Kenya", code: "KE", currency: "USD", flag: "🇰🇪" },
  { name: "Kuwait", code: "KW", currency: "USD", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "KG", currency: "USD", flag: "🇰🇬" },
  { name: "Laos", code: "LA", currency: "USD", flag: "🇱🇦" },
  { name: "Latvia", code: "LV", currency: "USD", flag: "🇱🇻" },
  { name: "Lebanon", code: "LB", currency: "USD", flag: "🇱🇧" },
  { name: "Lesotho", code: "LS", currency: "USD", flag: "🇱🇸" },
  { name: "Liberia", code: "LR", currency: "USD", flag: "🇱🇷" },
  { name: "Libya", code: "LY", currency: "USD", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "LI", currency: "USD", flag: "🇱🇮" },
  { name: "Lithuania", code: "LT", currency: "USD", flag: "🇱🇹" },
  { name: "Luxembourg", code: "LU", currency: "USD", flag: "🇱🇺" },
  { name: "Madagascar", code: "MG", currency: "USD", flag: "🇲🇬" },
  { name: "Malawi", code: "MW", currency: "USD", flag: "🇲🇼" },
  { name: "Malaysia", code: "MY", currency: "USD", flag: "🇲🇾" },
  { name: "Maldives", code: "MV", currency: "USD", flag: "🇲🇻" },
  { name: "Mali", code: "ML", currency: "USD", flag: "🇲🇱" },
  { name: "Malta", code: "MT", currency: "USD", flag: "🇲🇹" },
  { name: "Mauritania", code: "MR", currency: "USD", flag: "🇲🇷" },
  { name: "Mauritius", code: "MU", currency: "USD", flag: "🇲🇺" },
  { name: "Mexico", code: "MX", currency: "USD", flag: "🇲🇽" },
  { name: "Moldova", code: "MD", currency: "USD", flag: "🇲🇩" },
  { name: "Monaco", code: "MC", currency: "USD", flag: "🇲🇨" },
  { name: "Mongolia", code: "MN", currency: "USD", flag: "🇲🇳" },
  { name: "Montenegro", code: "ME", currency: "USD", flag: "🇲🇪" },
  { name: "Morocco", code: "MA", currency: "USD", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", currency: "USD", flag: "🇲🇿" },
  { name: "Myanmar", code: "MM", currency: "USD", flag: "🇲🇲" },
  { name: "Namibia", code: "NA", currency: "USD", flag: "🇳🇦" },
  { name: "Netherlands", code: "NL", currency: "USD", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", currency: "USD", flag: "🇳🇿" },
  { name: "Nicaragua", code: "NI", currency: "USD", flag: "🇳🇮" },
  { name: "Niger", code: "NE", currency: "USD", flag: "🇳🇪" },
  { name: "Nigeria", code: "NG", currency: "USD", flag: "🇳🇬" },
  { name: "North Korea", code: "KP", currency: "USD", flag: "🇰🇵" },
  { name: "North Macedonia", code: "MK", currency: "USD", flag: "🇲🇰" },
  { name: "Norway", code: "NO", currency: "USD", flag: "🇳🇴" },
  { name: "Oman", code: "OM", currency: "USD", flag: "🇴🇲" },
  { name: "Pakistan", code: "PK", currency: "USD", flag: "🇵🇰" },
  { name: "Panama", code: "PA", currency: "USD", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "PG", currency: "USD", flag: "🇵🇬" },
  { name: "Paraguay", code: "PY", currency: "USD", flag: "🇵🇾" },
  { name: "Peru", code: "PE", currency: "USD", flag: "🇵🇪" },
  { name: "Philippines", code: "PH", currency: "USD", flag: "🇵🇭" },
  { name: "Poland", code: "PL", currency: "USD", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", currency: "USD", flag: "🇵🇹" },
  { name: "Qatar", code: "QA", currency: "USD", flag: "🇶🇦" },
  { name: "Romania", code: "RO", currency: "USD", flag: "🇷🇴" },
  { name: "Russia", code: "RU", currency: "USD", flag: "🇷🇺" },
  { name: "Rwanda", code: "RW", currency: "USD", flag: "🇷🇼" },
  { name: "Saudi Arabia", code: "SA", currency: "USD", flag: "🇸🇦" },
  { name: "Senegal", code: "SN", currency: "USD", flag: "🇸🇳" },
  { name: "Serbia", code: "RS", currency: "USD", flag: "🇷🇸" },
  { name: "Seychelles", code: "SC", currency: "USD", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "SL", currency: "USD", flag: "🇸🇱" },
  { name: "Singapore", code: "SG", currency: "USD", flag: "🇸🇬" },
  { name: "Slovakia", code: "SK", currency: "USD", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", currency: "USD", flag: "🇸🇮" },
  { name: "Somalia", code: "SO", currency: "USD", flag: "🇸🇴" },
  { name: "South Africa", code: "ZA", currency: "USD", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", currency: "USD", flag: "🇰🇷" },
  { name: "South Sudan", code: "SS", currency: "USD", flag: "🇸🇸" },
  { name: "Spain", code: "ES", currency: "USD", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", currency: "USD", flag: "🇱🇰" },
  { name: "Sudan", code: "SD", currency: "USD", flag: "🇸🇩" },
  { name: "Suriname", code: "SR", currency: "USD", flag: "🇸🇷" },
  { name: "Sweden", code: "SE", currency: "USD", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", currency: "USD", flag: "🇨🇭" },
  { name: "Syria", code: "SY", currency: "USD", flag: "🇸🇾" },
  { name: "Taiwan", code: "TW", currency: "USD", flag: "🇹🇼" },
  { name: "Tajikistan", code: "TJ", currency: "USD", flag: "🇹🇯" },
  { name: "Tanzania", code: "TZ", currency: "USD", flag: "🇹🇿" },
  { name: "Thailand", code: "TH", currency: "USD", flag: "🇹🇭" },
  { name: "Togo", code: "TG", currency: "USD", flag: "🇹🇬" },
  { name: "Trinidad and Tobago", code: "TT", currency: "USD", flag: "🇹🇹" },
  { name: "Tunisia", code: "TN", currency: "USD", flag: "🇹🇳" },
  { name: "Turkey", code: "TR", currency: "USD", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "TM", currency: "USD", flag: "🇹🇲" },
  { name: "Uganda", code: "UG", currency: "USD", flag: "🇺🇬" },
  { name: "Ukraine", code: "UA", currency: "USD", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", currency: "USD", flag: "🇦🇪" },
  { name: "Uruguay", code: "UY", currency: "USD", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "UZ", currency: "USD", flag: "🇺🇿" },
  { name: "Vatican City", code: "VA", currency: "USD", flag: "🇻🇦" },
  { name: "Venezuela", code: "VE", currency: "USD", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", currency: "USD", flag: "🇻🇳" },
  { name: "Yemen", code: "YE", currency: "USD", flag: "🇾🇪" },
  { name: "Zambia", code: "ZM", currency: "USD", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", currency: "USD", flag: "🇿🇼" },
];

export const SERVICE_PRICING: Record<string, ServicePricingData> = {
  "social-media-management": {
    slug: "social-media-management",
    startingPriceUsd: 35,
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 35,
        features: [
          "2 platforms management",
          "5 posts + 1 reel",
          "7 days management",
          "Hashtag optimization",
          "Basic caption writing",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 75,
        isPopular: true,
        features: [
          "3 platforms management",
          "10 posts + 3 reels",
          "15 days management",
          "Engagement with followers",
          "Growth action plan",
          "Basic performance report",
          "2 revision rounds",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 150,
        features: [
          "5 platforms management",
          "20 posts + 6 reels",
          "30 days full management",
          "Full audience engagement",
          "Custom content strategy",
          "Advanced analytics report",
          "Unlimited revisions",
        ],
      },
    ],
  },
  "graphic-design-poster-making": {
    slug: "graphic-design-poster-making",
    startingPriceUsd: 25,
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 25,
        features: [
          "2 promotional posters",
          "High-resolution PNG & JPG",
          "Brand color integration",
          "2 days delivery",
          "1 revision round",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 55,
        isPopular: true,
        features: [
          "5 multi-format graphics",
          "Social & print-ready formats",
          "Editable source files (PSD/AI)",
          "Brand typography system",
          "3 revision rounds",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 150,
        features: [
          "Complete brand identity collateral",
          "15+ custom visual assets & posters",
          "All vector & print-ready files",
          "Social media ad creative kit",
          "Priority 24h turnaround & unlimited revisions",
        ],
      },
    ],
  },
  "website-design-development": {
    slug: "website-design-development",
    startingPriceUsd: 200,
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 200,
        features: [
          "Modern single-page landing site",
          "100% mobile responsive UI",
          "WhatsApp & email inquiry setup",
          "Basic technical SEO setup",
          "Fast loading performance",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 500,
        isPopular: true,
        features: [
          "Multi-page corporate website (up to 5 pages)",
          "Bespoke UI/UX design in Next.js / React",
          "Interactive inquiry & contact wizards",
          "Full SEO optimization & analytics",
          "1 month post-launch support",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 1000,
        features: [
          "Full-scale custom web platform",
          "Unlimited pages & dynamic integrations",
          "Advanced animations & conversion funnels",
          "Complete SEO foundation & speed score >95",
          "3 months dedicated technical support",
        ],
      },
    ],
  },
  "digital-marketing-advertising": {
    slug: "digital-marketing-advertising",
    startingPriceUsd: 200,
    startingUnit: "/month",
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 200,
        unit: "/month",
        features: [
          "1 active ad campaign (Meta or Google)",
          "Audience research & targeting setup",
          "2 ad creative variants",
          "Bi-weekly performance report",
          "Ad spend optimization",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 400,
        unit: "/month",
        isPopular: true,
        features: [
          "3 multi-channel ad campaigns",
          "Meta, Google & TikTok ads",
          "6 high-converting dynamic creatives",
          "A/B testing & retargeting funnels",
          "Weekly ROAS analytics & reporting",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 700,
        unit: "/month",
        features: [
          "Full-funnel digital advertising ecosystem",
          "Unlimited campaigns & custom creative assets",
          "Advanced conversion tracking & pixel setup",
          "Dedicated growth strategist",
          "Real-time ROI dashboard & weekly calls",
        ],
      },
    ],
  },
  "other-digital-solutions": {
    slug: "other-digital-solutions",
    startingPriceUsd: 50,
    startingUnit: "/hour",
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 50,
        unit: "/hour",
        features: [
          "Hourly technical consulting & troubleshooting",
          "SEO quick audit & optimization",
          "Short video reel edit (1 video)",
          "Email & WhatsApp workflow fix",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 150,
        unit: "/project",
        isPopular: true,
        features: [
          "Full technical SEO site overhaul",
          "Automated lead capture & CRM notification pipeline",
          "Batch video editing (5 short-form reels)",
          "Custom branding & typography pack",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 400,
        unit: "/project",
        features: [
          "Comprehensive enterprise digital infrastructure",
          "End-to-end workflow & marketing automation",
          "15+ short-form edited reels with captions",
          "Bespoke technical scaling roadmap",
        ],
      },
    ],
  },
};

export function convertUsdToNpr(usd: number): number {
  return usd * EXCHANGE_RATE;
}

export function formatPriceNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export function formatPrice(
  usdAmount: number,
  currency: Currency,
  unit?: string
): string {
  if (currency === "NPR") {
    const nprAmount = convertUsdToNpr(usdAmount);
    return `₹${formatPriceNumber(nprAmount)}${unit || ""}`;
  }
  return `$${formatPriceNumber(usdAmount)}${unit || ""}`;
}

export function getStartingPrice(slug: string, currency: Currency): string {
  const data = SERVICE_PRICING[slug];
  if (!data) return currency === "NPR" ? "₹4,550" : "$35";
  return formatPrice(data.startingPriceUsd, currency, data.startingUnit);
}
