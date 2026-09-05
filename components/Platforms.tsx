import React from "react";
import { Instagram, Facebook, Video } from "lucide-react";

interface Platform {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  handle: string;
}

const platforms: Platform[] = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/_lucianofficial/",
    handle: "@_lucianofficial",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=61593873428903",
    handle: "LUCIAN Official",
  },
  {
    name: "TikTok",
    icon: Video,
    url: "https://www.tiktok.com/@.lucianofficial",
    handle: "@.lucianofficial",
  },
];

export function Platforms() {
  return (
    <section className="py-16 bg-[#0E0E0E] border-y border-white/10 overflow-hidden relative" aria-label="Platforms">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-mutedText uppercase">
            Connect With Us On
          </h3>
        </div>

        {/* Clean Static 3-Platform Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {platforms.map((platform, idx) => {
            const Icon = platform.icon;
            return (
              <a
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-4 p-4 rounded-xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group shadow-sm"
              >
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primaryText group-hover:text-gold transition-colors">
                    {platform.name}
                  </div>
                  <div className="text-xs font-mono text-mutedText">{platform.handle}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
