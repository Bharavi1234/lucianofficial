import React from "react";
import { Mail, Phone, ArrowUpRight, MessageSquare } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-28 bg-[#0D0D0D] border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-gold/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Direct Communication
          </div>

          {/* Title: LET'S CONNECT (with CONNECT in gold) */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-primaryText tracking-tight uppercase leading-[1.1] mb-6">
            LET&apos;S <span className="text-gold">CONNECT</span>
          </h2>

          {/* Message (Exact Copy) */}
          <p className="text-lg sm:text-xl text-mutedText leading-relaxed mb-12">
            Let&apos;s build something amazing together.
          </p>

          {/* Direct Contact Cards (#151515 Background with Gold Accents) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/9779818587406"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-mutedText uppercase tracking-wider mb-1">
                    WhatsApp Direct
                  </div>
                  <div className="text-base sm:text-lg font-bold text-primaryText group-hover:text-gold transition-colors">
                    977 9818587406
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-mutedText group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Email Card */}
            <a
              href="mailto:lucianofficial636@gmail.com"
              className="flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-mutedText uppercase tracking-wider mb-1">
                    Official Email
                  </div>
                  <div className="text-base sm:text-lg font-bold text-primaryText group-hover:text-gold transition-colors break-all">
                    lucianofficial636@gmail.com
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
