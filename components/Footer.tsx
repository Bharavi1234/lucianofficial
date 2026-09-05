import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Video, AtSign } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/10 py-16 text-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Large Main Statement */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-primaryText tracking-tight uppercase leading-tight mb-8">
          ONE BRAND. <span className="text-gold">ENDLESS</span> POSSIBILITIES.
        </h2>

        {/* Brand Logo */}
        <Link
          href="/#home"
          className="inline-flex items-center gap-2 text-xl font-black tracking-widest text-primaryText mb-8 hover:opacity-90 transition-opacity"
          aria-label="LUCIAN"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-surface border border-gold/40 text-gold font-bold text-sm">
            L
          </span>
          <span className="font-extrabold tracking-[0.16em]">
            LUCI<span className="text-gold">A</span>N
          </span>
        </Link>

        {/* Social Media Icons (Instagram, Facebook, TikTok, Threads) */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/_lucianofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-mutedText hover:text-gold hover:border-gold/50 hover:bg-surface-hover hover:scale-105 transition-all duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61593873428903"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-mutedText hover:text-gold hover:border-gold/50 hover:bg-surface-hover hover:scale-105 transition-all duration-200"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@.lucianofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-mutedText hover:text-gold hover:border-gold/50 hover:bg-surface-hover hover:scale-105 transition-all duration-200"
            aria-label="TikTok"
          >
            <Video className="w-5 h-5" />
          </a>

          {/* Threads */}
          <a
            href="https://www.threads.com/@_lucianofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-mutedText hover:text-gold hover:border-gold/50 hover:bg-surface-hover hover:scale-105 transition-all duration-200"
            aria-label="Threads"
          >
            <AtSign className="w-5 h-5" />
          </a>
        </div>

        {/* Internal Navigation Links: About & Privacy Policy */}
        <div className="flex items-center justify-center gap-6 mb-8 text-sm font-mono text-mutedText">
          <Link
            href="/about"
            className="hover:text-gold transition-colors"
          >
            About
          </Link>
          <span className="text-white/20">&middot;</span>
          <Link
            href="/#services"
            className="hover:text-gold transition-colors"
          >
            Services
          </Link>
          <span className="text-white/20">&middot;</span>
          <Link
            href="/#contact"
            className="hover:text-gold transition-colors"
          >
            Contact
          </Link>
          <span className="text-white/20">&middot;</span>
          <Link
            href="/privacy"
            className="hover:text-gold transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/5 w-full max-w-xs text-xs font-mono text-mutedText">
          &copy; 2026 LUCIAN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
