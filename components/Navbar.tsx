"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, Mail, Instagram, Facebook } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo: LUCIAN (Letter A in Gold) */}
        <Link
          href="/#home"
          className="group flex items-center gap-3 text-2xl font-black tracking-widest text-primaryText transition-opacity hover:opacity-95"
          aria-label="LUCIAN Homepage"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-surface border border-gold/40 text-gold font-bold text-lg shadow-[0_0_15px_rgba(245,176,65,0.2)]">
            L
          </span>
          <span className="font-extrabold tracking-[0.18em]">
            LUCI<span className="text-gold">A</span>N
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <Link
            href="/#services"
            className="text-sm font-medium text-mutedText hover:text-gold transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-mutedText hover:text-gold transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Far right: Direct WhatsApp Contact Button + Mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/9779818587406"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs sm:text-sm font-mono font-semibold hover:bg-gold hover:text-background transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,176,65,0.35)]"
            aria-label="WhatsApp LUCIAN"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-primaryText hover:text-gold transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all">
          <div className="flex flex-col gap-4">
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-primaryText hover:text-gold py-1"
            >
              Services
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-primaryText hover:text-gold py-1"
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://wa.me/9779818587406"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gold/10 border border-gold/30 text-gold text-sm font-mono font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 977 9818587406</span>
              </a>
              <a
                href="mailto:lucianofficial07052026@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-surface border border-white/10 text-primaryText text-sm font-mono"
              >
                <Mail className="w-4 h-4 text-gold" />
                <span>Email Us</span>
              </a>
              <div className="flex items-center justify-center gap-4 pt-2">
                <a
                  href="https://www.instagram.com/_lucianofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-surface border border-white/10 text-mutedText hover:text-gold"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61593873428903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-surface border border-white/10 text-mutedText hover:text-gold"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
