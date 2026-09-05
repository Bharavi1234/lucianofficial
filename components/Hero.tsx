"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: x * 0.025, y: -y * 0.025 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Abstract Background Elements (Strictly Zero Humans) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large blurred gold circle overlapping bottom right */}
        <div className="absolute -bottom-24 -right-24 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,_#F5B041_0%,_rgba(245,176,65,0.15)_45%,_transparent_70%)] blur-[120px] opacity-40 animate-pulse-glow" />
        
        {/* Subtle secondary ambient glow at top left */}
        <div className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(245,176,65,0.2)_0%,_transparent_70%)] blur-[100px] opacity-30" />

        {/* Sharp diagonal vector accent line cutting across background */}
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent -rotate-6" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Messaging & Headlines */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pre-headline Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface border border-gold/30 mb-8 shadow-[0_0_20px_rgba(245,176,65,0.12)]">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#F5B041]" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-gold uppercase">
                BUILD &middot; INNOVATE &middot; ELEVATE
              </span>
            </div>

            {/* Main Headline: Three Massive Bold Lines */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-primaryText mb-6">
              <span className="block">
                WE BUILD <span className="gold-underline">BRANDS</span>.
              </span>
              <span className="block mt-1 sm:mt-2">
                WE CREATE <span className="gold-underline">IMPACT</span>.
              </span>
              <span className="block mt-1 sm:mt-2">
                WE ELEVATE <span className="gold-underline">GROWTH</span>.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-mutedText font-normal leading-relaxed max-w-2xl mb-10">
              We provide 360&deg; digital services to grow your brand, engage your audience, and achieve real results.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto">
              {/* Button 1: Solid Gold */}
              <Button asChild size="lg" className="w-full sm:w-auto text-base">
                <Link href="#contact" className="gap-2">
                  <span>Let&apos;s Connect</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* Button 2: White Outline */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base"
              >
                <Link href="#work">Our Work</Link>
              </Button>
            </div>

            {/* Quick Metrics Bar Under Hero CTAs */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-10 mt-10 border-t border-white/10 w-full">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primaryText">360&deg;</div>
                <div className="text-xs sm:text-sm text-mutedText mt-1">Digital Coverage</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gold">10&times;</div>
                <div className="text-xs sm:text-sm text-mutedText mt-1">Growth Velocity</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primaryText">100%</div>
                <div className="text-xs sm:text-sm text-mutedText mt-1">Founder Focused</div>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Geometric Visual Showcase (Zero Humans) */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative w-full max-w-[440px] transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              }}
            >
              {/* Main Abstract Container */}
              <div className="relative rounded-3xl bg-surface border border-white/10 p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden">
                {/* Rotating Geometric Mesh Background */}
                <div className="absolute -top-16 -right-16 w-64 h-64 border border-gold/20 rounded-full animate-spin [animation-duration:35s] pointer-events-none" />
                <div className="absolute -top-8 -right-8 w-48 h-48 border border-dashed border-gold/30 rounded-full animate-spin [animation-duration:20s] pointer-events-none" />

                {/* Card Top Header */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_#F5B041]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <span className="font-mono text-xs text-gold uppercase tracking-wider px-2.5 py-1 rounded bg-gold/10 border border-gold/20">
                    LUCIAN.360 &trade;
                  </span>
                </div>

                {/* Abstract Interactive Metrics Stack */}
                <div className="space-y-4 relative z-10 mb-8">
                  <div className="p-4 rounded-xl bg-background/80 border border-white/5 flex items-center justify-between hover:border-gold/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gold/10 text-gold">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primaryText">Brand Scaling</div>
                        <div className="text-xs text-dimText">High-intent targeting</div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gold">+320%</span>
                  </div>

                  <div className="p-4 rounded-xl bg-background/80 border border-white/5 flex items-center justify-between hover:border-gold/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gold/10 text-gold">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primaryText">Creative Systems</div>
                        <div className="text-xs text-dimText">Modular design assets</div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-primaryText">V2.4</span>
                  </div>

                  <div className="p-4 rounded-xl bg-background/80 border border-white/5 flex items-center justify-between hover:border-gold/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gold/10 text-gold">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primaryText">Full Deployment</div>
                        <div className="text-xs text-dimText">Web, ads, organic social</div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gold">100%</span>
                  </div>
                </div>

                {/* Card Footer Tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-mutedText relative z-10">
                  <span>ARCHITECTURE // 2026</span>
                  <span className="text-gold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    PREMIUM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
