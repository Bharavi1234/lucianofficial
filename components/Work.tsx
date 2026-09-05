import React from "react";
import { ArrowUpRight, BarChart3, Globe, Sparkles } from "lucide-react";

export function Work() {
  return (
    <section id="work" className="py-28 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Selected Proof of Work
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-primaryText tracking-tight">
              Engineered For <span className="text-gold">Impact</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-mutedText max-w-xl leading-relaxed">
            Data-backed visual and technical frameworks deployed to scale business metrics and command market authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Work Card 1 */}
          <div className="group rounded-3xl bg-surface border border-white/10 hover:border-gold/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            {/* Abstract Visual Wireframe (Zero Humans) */}
            <div className="h-64 sm:h-72 bg-[#0F0F0F] border-b border-white/10 p-6 flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full rounded-xl border border-dashed border-gold/30 bg-background/60 p-5 flex flex-col justify-between relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-gold/70" />
                    <span className="w-3 h-3 rounded-full bg-white/20" />
                    <span className="w-3 h-3 rounded-full bg-white/10" />
                  </div>
                  <span className="font-mono text-xs text-gold">ROAS // 3.8X</span>
                </div>

                <div className="space-y-3">
                  <div className="h-2 w-2/3 bg-gold rounded-full" />
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                  <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[11px] text-primaryText">
                    META SCALE
                  </div>
                  <div className="h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[11px] text-gold">
                    +280% REVENUE
                  </div>
                  <div className="h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[11px] text-primaryText">
                    LOW CPA
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="font-mono text-xs text-gold uppercase tracking-wider mb-2">
                Paid Acquisition &middot; Meta &amp; Google
              </div>
              <h3 className="text-2xl font-bold text-primaryText mb-3 flex items-center justify-between">
                <span>Multi-Platform Ad Scaling Engine</span>
                <ArrowUpRight className="w-5 h-5 text-mutedText group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </h3>
              <p className="text-mutedText text-sm sm:text-base leading-relaxed mb-6">
                Engineered an algorithmic ad testing pipeline combined with high-converting creative assets resulting in massive founder revenue expansion.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-semibold">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>+380% ROAS Achieved</span>
              </div>
            </div>
          </div>

          {/* Work Card 2 */}
          <div className="group rounded-3xl bg-surface border border-white/10 hover:border-gold/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            {/* Abstract Visual Wireframe (Zero Humans) */}
            <div className="h-64 sm:h-72 bg-[#0F0F0F] border-b border-white/10 p-6 flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full rounded-xl border border-dashed border-gold/30 bg-background/60 p-5 flex flex-col justify-between relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-gold/70" />
                    <span className="w-3 h-3 rounded-full bg-white/20" />
                    <span className="w-3 h-3 rounded-full bg-white/10" />
                  </div>
                  <span className="font-mono text-xs text-gold">SPEED // 99/100</span>
                </div>

                <div className="space-y-3">
                  <div className="h-2 w-3/4 bg-gold rounded-full" />
                  <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[11px] text-primaryText">
                    REACT / NEXT
                  </div>
                  <div className="h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[11px] text-gold">
                    +142% CONV
                  </div>
                  <div className="h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[11px] text-primaryText">
                    SUB-SECOND
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="font-mono text-xs text-gold uppercase tracking-wider mb-2">
                Web Architecture &middot; UI/UX
              </div>
              <h3 className="text-2xl font-bold text-primaryText mb-3 flex items-center justify-between">
                <span>High-Converting Digital Flagship</span>
                <ArrowUpRight className="w-5 h-5 text-mutedText group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </h3>
              <p className="text-mutedText text-sm sm:text-base leading-relaxed mb-6">
                Custom full-stack web architecture engineered with dark high-contrast design, fluid micro-interactions, and frictionless customer booking funnels.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>+142% Organic Conversion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
