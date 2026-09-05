import React from "react";
import {
  Instagram,
  Facebook,
  Video,
  Youtube,
  Linkedin,
  Globe2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface Platform {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

const platforms: Platform[] = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/_lucianofficial/",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=61593873428903",
  },
  {
    name: "TikTok",
    icon: Video,
    url: "https://www.tiktok.com/@.lucianofficial",
  },
  {
    name: "Youtube",
    icon: Youtube,
    url: "https://www.youtube.com",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com",
  },
  {
    name: "& More",
    icon: Globe2,
    url: "/#contact",
  },
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
            const isExternal = platform.url.startsWith("http");
            return (
              <a
                key={`p1-${idx}`}
                href={platform.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 px-8 py-4 rounded-full bg-surface border border-white/10 hover:border-gold/60 hover:bg-surface-hover transition-all duration-200 group whitespace-nowrap shadow-sm hover:shadow-[0_0_20px_rgba(245,176,65,0.25)] hover:-translate-y-0.5 cursor-pointer"
                title={`Visit ${platform.name}`}
              >
                <div className="p-2 rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-base font-bold text-primaryText group-hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>{platform.name}</span>
                  {isExternal && <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />}
                </div>
              </a>
            );
          })}

          {/* Second duplicate loop for continuous scrolling */}
          {platforms.map((platform, idx) => {
            const Icon = platform.icon;
            const isExternal = platform.url.startsWith("http");
            return (
              <a
                key={`p2-${idx}`}
                href={platform.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 px-8 py-4 rounded-full bg-surface border border-white/10 hover:border-gold/60 hover:bg-surface-hover transition-all duration-200 group whitespace-nowrap shadow-sm hover:shadow-[0_0_20px_rgba(245,176,65,0.25)] hover:-translate-y-0.5 cursor-pointer"
                title={`Visit ${platform.name}`}
              >
                <div className="p-2 rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-base font-bold text-primaryText group-hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>{platform.name}</span>
                  {isExternal && <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
