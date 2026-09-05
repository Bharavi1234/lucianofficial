import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { servicesList, getServiceIcon } from "@/lib/services-data";

export function Services() {
  const topServices = servicesList.slice(0, 3);
  const bottomServices = servicesList.slice(3, 5);

  return (
    <section id="services" className="relative py-28 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient background grid */}
      <div className="ambient-grid" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored For High Growth</span>
          </div>

          {/* Title: ALL-IN-ONE DIGITAL SOLUTIONS with DIGITAL SOLUTIONS in gold */}
          <h2 className="text-3xl sm:text-5xl font-black text-primaryText tracking-tight uppercase mb-4">
            ALL-IN-ONE <span className="text-gold">DIGITAL SOLUTIONS</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-mutedText leading-relaxed">
            We provide 360&deg; digital services to grow your brand, engage your audience, and achieve real results.
          </p>
        </div>

        {/* Dynamic Asymmetrical Grid: 3 cards top row, 2 cards centered bottom row */}
        <div className="space-y-6 sm:space-y-8">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {topServices.map((service) => {
              const IconComponent = getServiceIcon(service.iconName);
              return (
                <div
                  key={service.slug}
                  className="group relative flex flex-col justify-between p-8 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-b-4 border-b-gold"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-background transition-all duration-300 shadow-[0_0_15px_rgba(245,176,65,0.15)]">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-xl font-bold text-white/20 group-hover:text-gold transition-colors duration-200">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-primaryText mb-3">
                      <Link href={`/services/${service.slug}`} className="hover:text-gold transition-colors">
                        {service.title}
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-mutedText leading-relaxed font-light mb-8">
                      {service.description}
                    </p>
                  </div>

                  {/* Whole Golden Button as Full-Area Direct Clickable Link */}
                  <div className="pt-4 border-t border-white/5">
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full flex items-center justify-between px-6 py-3.5 rounded-lg font-bold text-sm bg-gold text-background hover:bg-[#FFBE53] shadow-[0_0_18px_rgba(245,176,65,0.25)] group-hover:shadow-[0_0_25px_rgba(245,176,65,0.45)] transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {bottomServices.map((service) => {
              const IconComponent = getServiceIcon(service.iconName);
              return (
                <div
                  key={service.slug}
                  className="group relative flex flex-col justify-between p-8 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-b-4 border-b-gold"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-background transition-all duration-300 shadow-[0_0_15px_rgba(245,176,65,0.15)]">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-xl font-bold text-white/20 group-hover:text-gold transition-colors duration-200">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-primaryText mb-3">
                      <Link href={`/services/${service.slug}`} className="hover:text-gold transition-colors">
                        {service.title}
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-mutedText leading-relaxed font-light mb-8">
                      {service.description}
                    </p>
                  </div>

                  {/* Whole Golden Button as Full-Area Direct Clickable Link */}
                  <div className="pt-4 border-t border-white/5">
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full flex items-center justify-between px-6 py-3.5 rounded-lg font-bold text-sm bg-gold text-background hover:bg-[#FFBE53] shadow-[0_0_18px_rgba(245,176,65,0.25)] group-hover:shadow-[0_0_25px_rgba(245,176,65,0.45)] transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
