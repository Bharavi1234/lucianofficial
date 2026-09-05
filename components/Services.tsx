import React from "react";
import {
  Share2,
  Palette,
  Layout,
  Megaphone,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  isTopRow: boolean;
}

const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: "Social Media Management",
    description:
      "Strategy, content, scheduling & growth that builds strong online presence.",
    icon: Share2,
    deliverables: ["Content Architecture", "Community Cultivation", "Growth Metrics"],
    isTopRow: true,
  },
  {
    number: "02",
    title: "Graphic Design & Poster Making",
    description:
      "Eye-catching designs that communicate your brand and leave a lasting impact.",
    icon: Palette,
    deliverables: ["Brand Identity Kits", "High-Converting Posters", "Ad Creatives"],
    isTopRow: true,
  },
  {
    number: "03",
    title: "Website Design & Development",
    description:
      "Modern, responsive and user-friendly websites that drive results.",
    icon: Layout,
    deliverables: ["Next.js & Modern Web", "High-Converting UI/UX", "SEO Infrastructure"],
    isTopRow: false,
  },
  {
    number: "04",
    title: "Digital Marketing & Advertising",
    description:
      "Ads, campaigns & marketing strategies that convert and maximize ROI.",
    icon: Megaphone,
    deliverables: ["Meta & Google Campaigns", "Funnel Retargeting", "ROAS Optimization"],
    isTopRow: false,
  },
  {
    number: "05",
    title: "Other Digital Solutions",
    description:
      "From SEO to branding, video editing to automation – we do it all for your growth.",
    icon: Cpu,
    deliverables: ["Workflow Automations", "Bespoke Consulting", "Video & Media"],
    isTopRow: false,
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient background accent */}
      <div className="ambient-grid" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Comprehensive Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-primaryText tracking-tight">
              360&deg; Digital <span className="text-gold">Solutions</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-mutedText max-w-xl leading-relaxed">
            Strategy, creativity, and technology to elevate your brand.
          </p>
        </div>

        {/* Dynamic Asymmetrical Grid (2 Cards Top Row, 3 Cards Bottom Row) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => {
            const IconComponent = service.icon;
            // Top row items span 3 cols each (2 items = 6 cols total)
            // Bottom row items span 2 cols each (3 items = 6 cols total)
            const colSpanClass = service.isTopRow
              ? "md:col-span-3"
              : "md:col-span-2";

            return (
              <div
                key={idx}
                className={`group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-surface border border-white/10 hover:border-gold/40 transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(245,176,65,0.15)] border-b-4 border-b-gold/80 hover:border-b-gold ${colSpanClass}`}
              >
                {/* Subtle Radial Glow on Hover */}
                <div className="absolute inset-0 bg-radial from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                {/* Top Section */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-background transition-all duration-300 shadow-[0_0_15px_rgba(245,176,65,0.15)] group-hover:shadow-[0_0_20px_rgba(245,176,65,0.4)]">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-xl font-bold text-white/20 group-hover:text-gold transition-colors duration-200">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-primaryText mb-4 group-hover:text-primaryText transition-colors flex items-center justify-between">
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-mutedText/40 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="text-sm sm:text-base text-mutedText leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Deliverables Checklist */}
                <div className="relative z-10 pt-6 border-t border-white/5 space-y-2">
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-mutedText">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
