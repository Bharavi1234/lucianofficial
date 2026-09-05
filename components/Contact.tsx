"use client";

import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Video,
  ArrowUpRight,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("lucianofficial07052026@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-28 bg-[#0D0D0D] border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-gold/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Direct Channels
          </div>

          {/* Title: LET'S CONNECT (with CONNECT in gold) */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-primaryText tracking-tight uppercase leading-[1.1] mb-6">
            LET&apos;S <span className="text-gold">CONNECT</span>
          </h2>

          {/* Message (Exact Copy) */}
          <p className="text-lg sm:text-xl text-mutedText leading-relaxed mb-12 max-w-2xl mx-auto">
            Let&apos;s build something amazing together. Reach out directly through WhatsApp, Email, Instagram, TikTok, or Facebook.
          </p>

          {/* 5 Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {/* 1. WhatsApp Card */}
            <a
              href="https://wa.me/9779818587406"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-mutedText uppercase tracking-wider mb-1">
                    WhatsApp Direct
                  </div>
                  <div className="text-base font-bold text-primaryText group-hover:text-gold transition-colors">
                    977 9818587406
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-mutedText group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* 2. Email Card with mailto + web gmail fallback + copy */}
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 transition-all duration-200 shadow-lg relative group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-mutedText uppercase tracking-wider mb-1">
                      Official Email
                    </div>
                    <div className="text-sm font-bold text-primaryText group-hover:text-gold transition-colors break-all">
                      lucianofficial07052026@gmail.com
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=lucianofficial07052026@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-gold/10 text-gold hover:bg-gold hover:text-background text-xs font-mono font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Gmail</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/5 text-mutedText hover:text-primaryText hover:bg-white/10 text-xs font-mono transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-gold" />
                      <span className="text-gold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3. TikTok Card */}
            <a
              href="https://www.tiktok.com/@.lucianofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-mutedText uppercase tracking-wider mb-1">
                    TikTok Official
                  </div>
                  <div className="text-base font-bold text-primaryText group-hover:text-gold transition-colors">
                    @.lucianofficial
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-mutedText group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* 4. Instagram Card */}
            <a
              href="https://www.instagram.com/_lucianofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-mutedText uppercase tracking-wider mb-1">
                    Instagram DM
                  </div>
                  <div className="text-base font-bold text-primaryText group-hover:text-gold transition-colors">
                    @_lucianofficial
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-mutedText group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* 5. Facebook Card */}
            <a
              href="https://www.facebook.com/profile.php?id=61593873428903"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group shadow-lg sm:col-span-2 lg:col-span-2"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Facebook className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-mutedText uppercase tracking-wider mb-1">
                    Facebook Page
                  </div>
                  <div className="text-base font-bold text-primaryText group-hover:text-gold transition-colors">
                    LUCIAN Official
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-mutedText group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
