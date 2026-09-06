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
  nprPrice: number;
  unit?: string; // e.g., "/month", "/hour", "/project", "/design"
  isPopular?: boolean;
  features: string[];
}

export interface ServicePricingData {
  slug: string;
  startingPriceUsd: number;
  startingPriceNpr: number;
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
  { name: "Uzbekistan", code: "UZ", currency: "USD", flag: "UZ" },
  { name: "Vatican City", code: "VA", currency: "USD", flag: "🇻🇦" },
  { name: "Venezuela", code: "VE", currency: "USD", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", currency: "USD", flag: "🇻🇳" },
  { name: "Yemen", code: "YE", currency: "USD", flag: "🇾🇪" },
  { name: "Zambia", code: "ZM", currency: "USD", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", currency: "USD", flag: "🇿🇼" },
];

export const PRICING_CONFIG = {
  exchangeRate: 130,
  services: {
    "social-media-management": {
      usd: { basic: 35, standard: 75, premium: 150 },
      npr: { basic: 6000, standard: 15000, premium: 30000 },
    },
    "graphic-design-poster-making": {
      usd: { basic: 25, standard: 55, premium: 150 },
      npr: { basic: 2500, standard: 6000, premium: 15000 },
    },
    "website-design-development": {
      usd: { basic: 200, standard: 500, premium: 1000 },
      npr: { basic: 20000, standard: 50000, premium: 100000 },
    },
    "digital-marketing-advertising": {
      usd: { basic: 200, standard: 400, premium: 700 },
      npr: { basic: 15000, standard: 30000, premium: 55000 },
    },
    "other-digital-solutions": {
      usd: { basic: 50, standard: 150, premium: 400 },
      npr: { basic: 4000, standard: 15000, premium: 40000 },
    },
    "complete-digital-pro": {
      usd: { basic: 1000, standard: null, premium: null },
      npr: { basic: 85000, standard: null, premium: null },
    },
  },
};

export const SERVICE_PRICING: Record<string, ServicePricingData> = {
  "social-media-management": {
    slug: "social-media-management",
    startingPriceUsd: 35,
    startingPriceNpr: 6000,
    startingUnit: "/month",
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 35,
        nprPrice: 6000,
        unit: "/month",
        features: [
          "2 platforms management",
          "5 posts + 1 reel / week",
          "7 days management",
          "Schedule posts",
          "Hashtag optimization & basic caption writing",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 75,
        nprPrice: 15000,
        unit: "/month",
        isPopular: true,
        features: [
          "3 platforms management",
          "10 posts + 3 reels / week",
          "15 days management",
          "Engagement with followers",
          "Action plan & growth strategy",
          "Basic performance report",
          "2 revision rounds",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 150,
        nprPrice: 30000,
        unit: "/month",
        features: [
          "5 platforms management",
          "20 posts + 6 reels / week",
          "30 days full management",
          "Daily audience engagement",
          "Custom action plan & content strategy",
          "Detailed analytics report",
          "Unlimited revisions",
        ],
      },
    ],
  },
  "graphic-design-poster-making": {
    slug: "graphic-design-poster-making",
    startingPriceUsd: 25,
    startingPriceNpr: 2500,
    startingUnit: "/design",
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 25,
        nprPrice: 2500,
        unit: "/design",
        features: [
          "1 custom design",
          "2 revisions",
          "Print-ready format (PNG & JPG)",
          "Brand color integration",
          "2-day turnaround",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 55,
        nprPrice: 6000,
        unit: "/design",
        isPopular: true,
        features: [
          "3 custom designs",
          "3 revisions",
          "Source files included (PSD/AI)",
          "Social & print-ready formats",
          "Brand typography system",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 150,
        nprPrice: 15000,
        unit: "/design",
        features: [
          "5 custom designs / Full brand kit",
          "Unlimited revisions",
          "All vector & print-ready files",
          "Complete brand identity collateral",
          "Priority 24h turnaround",
        ],
      },
    ],
  },
  "website-design-development": {
    slug: "website-design-development",
    startingPriceUsd: 200,
    startingPriceNpr: 20000,
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 200,
        nprPrice: 20000,
        features: [
          "1-page responsive website",
          "2 revisions",
          "3-day delivery",
          "100% mobile responsive UI",
          "WhatsApp & email inquiry setup",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 500,
        nprPrice: 50000,
        isPopular: true,
        features: [
          "5-page custom website",
          "SEO optimized & high-speed performance",
          "Interactive contact form & inquiry wizard",
          "3 revisions",
          "1 month post-launch support",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 1000,
        nprPrice: 100000,
        features: [
          "10-page custom website platform",
          "E-commerce / CMS integration",
          "Unlimited revisions",
          "Advanced conversion funnels & animations",
          "3 months dedicated technical support",
        ],
      },
    ],
  },
  "digital-marketing-advertising": {
    slug: "digital-marketing-advertising",
    startingPriceUsd: 200,
    startingPriceNpr: 15000,
    startingUnit: "/month",
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 200,
        nprPrice: 15000,
        unit: "/month",
        features: [
          "1 platform campaign (Meta or Google)",
          "Strategy document & audience targeting",
          "2 ad creative variants",
          "Monthly performance report",
          "Ad spend optimization",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 400,
        nprPrice: 30000,
        unit: "/month",
        isPopular: true,
        features: [
          "3 platforms (Meta, Google & TikTok ads)",
          "A/B testing & creative optimization",
          "6 high-converting dynamic creatives",
          "Detailed performance reporting",
          "Retargeting funnels setup",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 700,
        nprPrice: 55000,
        unit: "/month",
        features: [
          "5 platforms full-funnel advertising",
          "Advanced retargeting & custom creative assets",
          "Weekly deep-dive analytics reports",
          "Dedicated growth strategist",
          "Real-time ROI dashboard",
        ],
      },
    ],
  },
  "other-digital-solutions": {
    slug: "other-digital-solutions",
    startingPriceUsd: 50,
    startingPriceNpr: 4000,
    startingUnit: "/hour",
    packages: [
      {
        id: "basic",
        name: "Basic",
        usdPrice: 50,
        nprPrice: 4000,
        unit: "/hour",
        features: [
          "1 hour of work",
          "SEO audit, video edit, or automation setup",
          "Troubleshooting & consulting",
          "Workflow fixes",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        usdPrice: 150,
        nprPrice: 15000,
        unit: "/project",
        isPopular: true,
        features: [
          "Brand identity OR SEO content strategy",
          "Promotional video edit (5 short-form reels)",
          "Automated lead capture pipeline",
          "Full technical overhaul",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        usdPrice: 400,
        nprPrice: 40000,
        unit: "/project",
        features: [
          "Complete YouTube automation OR full branding campaign",
          "Complex automation workflow & CRM integrations",
          "15+ short-form edited reels with captions",
          "Dedicated technical roadmap",
        ],
      },
    ],
  },
  "complete-digital-pro": {
    slug: "complete-digital-pro",
    startingPriceUsd: 1000,
    startingPriceNpr: 85000,
    packages: [
      {
        id: "basic",
        name: "Starting at",
        usdPrice: 1000,
        nprPrice: 85000,
        features: [
          "Analyze existing systems",
          "Develop & implement customized solution across up to 3 platforms",
          "Optimize digital workflow",
          "Provide advanced reporting",
          "Create clear action plan for long-term growth",
        ],
      },
    ],
  },
};

export function getPrice(
  slug: string,
  tier: "basic" | "standard" | "premium",
  currency: Currency
): number | null {
  const service = (PRICING_CONFIG.services as any)[slug];
  if (!service) return null;
  if (currency === "NPR") {
    return service.npr[tier];
  }
  return service.usd[tier];
}

export function formatPriceNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export function formatPrice(
  usdAmount: number,
  currency: Currency,
  unit?: string,
  nprAmount?: number
): string {
  if (currency === "NPR") {
    const npr = nprAmount !== undefined ? nprAmount : Math.round(usdAmount * EXCHANGE_RATE);
    return `₹${formatPriceNumber(npr)}${unit || ""}`;
  }
  return `$${formatPriceNumber(usdAmount)}${unit || ""}`;
}

export function formatPackagePrice(pkg: ServicePackage, currency: Currency): string {
  if (currency === "NPR") {
    return `₹${formatPriceNumber(pkg.nprPrice)}${pkg.unit || ""}`;
  }
  return `$${formatPriceNumber(pkg.usdPrice)}${pkg.unit || ""}`;
}

export function getStartingPrice(slug: string, currency: Currency): string {
  const data = SERVICE_PRICING[slug];
  if (!data) return currency === "NPR" ? "₹6,000" : "$35";
  if (currency === "NPR") {
    return `₹${formatPriceNumber(data.startingPriceNpr)}${data.startingUnit || ""}`;
  }
  return `$${formatPriceNumber(data.startingPriceUsd)}${data.startingUnit || ""}`;
}

