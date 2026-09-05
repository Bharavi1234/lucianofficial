import {
  Megaphone,
  Palette,
  Globe,
  Target,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDetail {
  slug: string;
  number: string;
  title: string;
  description: string;
  iconName: "Megaphone" | "Palette" | "Globe" | "Target" | "Cpu";
  deliverables: string[];
  summary: string;
}

export const servicesList: ServiceDetail[] = [
  {
    slug: "social-media-management",
    number: "01",
    title: "Social Media Management",
    description:
      "Strategy, content, scheduling & growth that builds strong online presence.",
    iconName: "Megaphone",
    summary:
      "Full-spectrum organic audience growth, content calendar planning, graphic assets, and community engagement tailored for founders and modern businesses.",
    deliverables: [
      "Custom monthly content strategy & editorial calendar",
      "High-converting visual creatives & reels",
      "Proactive community engagement & hashtag optimization",
      "Monthly KPI & audience growth analytics reports",
    ],
  },
  {
    slug: "graphic-design-poster-making",
    number: "02",
    title: "Graphic Design & Poster Making",
    description:
      "Eye-catching designs that communicate your brand and leave a lasting impact.",
    iconName: "Palette",
    summary:
      "Stunning visual identities, promotional posters, digital marketing assets, and brand collateral engineered to capture attention instantly.",
    deliverables: [
      "Complete brand identity guidelines & typography systems",
      "High-resolution promotional event & product posters",
      "Multi-format social media ad templates",
      "Vector branding assets & scalable print-ready files",
    ],
  },
  {
    slug: "website-design-development",
    number: "03",
    title: "Website Design & Development",
    description:
      "Modern, responsive and user-friendly websites that drive results.",
    iconName: "Globe",
    summary:
      "High-performance, ultra-fast, conversion-focused websites engineered with modern frontend frameworks and flawless mobile responsiveness.",
    deliverables: [
      "Bespoke UI/UX design crafted for maximum conversions",
      "Responsive, mobile-optimized development (Next.js / React)",
      "Technical SEO foundation & lightning-fast page speeds",
      "Seamless WhatsApp & email inquiry integrations",
    ],
  },
  {
    slug: "digital-marketing-advertising",
    number: "04",
    title: "Digital Marketing & Advertising",
    description:
      "Ads, campaigns & marketing strategies that convert and maximize ROI.",
    iconName: "Target",
    summary:
      "Data-backed paid advertising campaigns across Meta, Google, and TikTok designed to acquire high-value customers and scale return on ad spend.",
    deliverables: [
      "Strategic campaign setup & audience persona targeting",
      "High-converting ad copy & dynamic creative variants",
      "Continuous A/B testing & budget allocation optimization",
      "Full-funnel conversion tracking & transparent ROAS reporting",
    ],
  },
  {
    slug: "other-digital-solutions",
    number: "05",
    title: "Other Digital Solutions",
    description:
      "From SEO to branding, video editing to automation – we do it all for your growth.",
    iconName: "Cpu",
    summary:
      "Tailored digital infrastructure, workflow automations, video editing, search engine optimization, and custom technical consulting.",
    deliverables: [
      "Advanced Search Engine Optimization (SEO) & ranking strategy",
      "Short-form video editing for Reels & TikTok",
      "Automated lead capture & CRM notification workflows",
      "Bespoke founder-level technical consulting & brand scaling",
    ],
  },
];

export function getServiceIcon(iconName: string): LucideIcon {
  switch (iconName) {
    case "Megaphone":
      return Megaphone;
    case "Palette":
      return Palette;
    case "Globe":
      return Globe;
    case "Target":
      return Target;
    case "Cpu":
    default:
      return Cpu;
  }
}

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesList.find((service) => service.slug === slug);
}
