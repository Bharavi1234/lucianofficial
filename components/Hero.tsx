import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Abstract Background Elements (Strictly Zero Humans, Clean & Fast) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large subtle blurred gold orb */}
        <div className="absolute -bottom-20 -right-20 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,_#F5B041_0%,_rgba(245,176,65,0.12)_45%,_transparent_70%)] blur-[100px] opacity-35" />
        <div className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,_rgba(245,176,65,0.15)_0%,_transparent_70%)] blur-[90px] opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center flex flex-col items-center">
        {/* Pre-headline Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface border border-gold/30 mb-8 shadow-[0_0_20px_rgba(245,176,65,0.12)]">
          <span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#F5B041]" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-gold uppercase">
            BUILD &middot; INNOVATE &middot; ELEVATE
          </span>
        </div>

        {/* Main Headline: Three Massive Bold Lines */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-primaryText mb-6 max-w-5xl">
          <span className="block">
            WE BUILD <span className="gold-underline">BRANDS</span>.
          </span>
          <span className="block mt-2">
            WE CREATE <span className="gold-underline">IMPACT</span>.
          </span>
          <span className="block mt-2">
            WE ELEVATE <span className="gold-underline">GROWTH</span>.
          </span>
        </h1>

        {/* Reduced Supporting Text (One Punchy Sentence) */}
        <p className="text-base sm:text-lg md:text-xl text-mutedText font-normal leading-relaxed max-w-2xl mb-10">
          We provide digital services to grow your brand, engage your audience, and achieve real results.
        </p>

        {/* Single Focused CTA Button */}
        <div>
          <Button asChild size="lg" className="text-base font-bold px-8 py-6 h-auto shadow-[0_0_30px_rgba(245,176,65,0.35)]">
            <Link href="#contact" className="gap-2">
              <span>Let&apos;s Connect</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
