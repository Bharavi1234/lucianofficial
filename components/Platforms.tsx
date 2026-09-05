import React from "react";
import {
  Instagram,
  Facebook,
  Video,
  Youtube,
  Linkedin,
  Globe2,
  Sparkles,
} from "lucide-react";

interface Platform {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const platforms: Platform[] = [
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "TikTok", icon: Video },
  { name: "Youtube", icon: Youtube },
  { name: "LinkedIn", icon: Linkedin },
  { name: "& More", icon: Globe2 },
];

export function Platforms() {
  return (
    <section className="py-20 bg-[#0E0E0E] border-y border-white/10 overflow-hidden relative" aria-label="Platforms">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-mutedText uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>WE WORK ACROSS ALL PLATFORMS</span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </h3>
      </div>

      {/* Infinite Horizontal Scrolling Row */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee space-x-6 hover:[animation-play-state:paused]">
          {/* First loop */}
          {platforms.map((platform, idx) => {
            const Icon = platform.icon;
            return (
              <div
                key={`p1-${idx}`}
                className="flex items-center gap-4 px-8 py-4 rounded-full bg-surface border border-white/10 hover:border-gold/50 transition-all duration-200 group whitespace-nowrap shadow-sm hover:shadow-[0_0_20px_rgba(245,176,65,0.2)]"
              >
                <div className="p-2 rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-base font-bold text-primaryText group-hover:text-gold transition-colors">
                  {platform.name}
                </div>
              </div>
            );
          })}

          {/* Second duplicate loop for continuous scrolling */}
          {platforms.map((platform, idx) => {
            const Icon = platform.icon;
            return (
              <div
                key={`p2-${idx}`}
                className="flex items-center gap-4 px-8 py-4 rounded-full bg-surface border border-white/10 hover:border-gold/50 transition-all duration-200 group whitespace-nowrap shadow-sm hover:shadow-[0_0_20px_rgba(245,176,65,0.2)]"
              >
                <div className="p-2 rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-base font-bold text-primaryText group-hover:text-gold transition-colors">
                  {platform.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
