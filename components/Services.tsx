import React from "react";
import { Share2, Palette, Globe, ArrowUpRight } from "lucide-react";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: "Social Media Management",
    description: "Strategy, content & growth for your brand.",
    icon: Share2,
  },
  {
    number: "02",
    title: "Graphic Design & Branding",
    description: "Eye-catching designs that communicate your brand.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Website & Digital Marketing",
    description: "Modern websites & campaigns that drive results.",
    icon: Globe,
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Our Expertise
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-primaryText tracking-tight mb-4">
            Digital <span className="text-gold">Solutions</span>
          </h2>
          <p className="text-base sm:text-lg text-mutedText leading-relaxed">
            Strategy, creativity, and technology to elevate your brand.
          </p>
        </div>

        {/* 3 Clean Core Service Cards in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => {
            const IconComponent = service.icon;

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-surface border border-white/10 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b-4 border-b-gold"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-background transition-all duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-xl font-bold text-white/20 group-hover:text-gold transition-colors duration-200">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-primaryText mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-mutedText leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-mutedText group-hover:text-gold transition-colors">
                  <span>LUCIAN &middot; CORE</span>
                  <ArrowUpRight className="w-4 h-4 text-mutedText/60 group-hover:text-gold transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
