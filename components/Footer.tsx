import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Main Big Statement */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-primaryText tracking-tight uppercase leading-[1.1]">
            ONE BRAND. <span className="text-gold">ENDLESS</span> POSSIBILITIES.
          </h2>
        </div>

        {/* Brand Details & Navigation Links */}
        <div className="flex flex-col items-center justify-center space-y-8 mb-16">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-3 text-2xl font-black tracking-widest text-primaryText"
            aria-label="LUCIAN"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-surface border border-gold/40 text-gold font-bold text-lg">
              L
            </span>
            <span className="font-extrabold tracking-[0.18em]">
              LUCI<span className="text-gold">A</span>N
            </span>
          </Link>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-mutedText">
            <Link href="#home" className="hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="#services" className="hover:text-gold transition-colors">
              Services
            </Link>
            <Link href="#work" className="hover:text-gold transition-colors">
              Work
            </Link>
            <Link href="#contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Icons (Instagram, Facebook, YouTube, LinkedIn) */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-mutedText hover:text-gold hover:border-gold/50 hover:bg-surface-hover hover:scale-105 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-mutedText hover:text-gold hover:border-gold/50 hover:bg-surface-hover hover:scale-105 transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-mutedText hover:text-gold hover:border-gold/50 hover:bg-surface-hover hover:scale-105 transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-mutedText hover:text-gold hover:border-gold/50 hover:bg-surface-hover hover:scale-105 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-dimText">
          <div>&copy; 2026 LUCIAN. All rights reserved.</div>
          <div className="text-gold/80">BUILD &middot; INNOVATE &middot; ELEVATE</div>
        </div>
      </div>
    </footer>
  );
}
