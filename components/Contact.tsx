import React from "react";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0D0D0D] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Get In Touch
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-primaryText tracking-tight leading-[1.1] mb-6">
            Let&apos;s build something <span className="text-gold">amazing</span> together.
          </h2>

          <p className="text-base sm:text-lg text-mutedText leading-relaxed mb-12">
            Ready to elevate your brand presence and achieve real growth? Reach out directly to our team via WhatsApp or Email.
          </p>

          {/* Clean Direct Action Cards (WhatsApp & Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/9779818587406"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-mutedText uppercase tracking-wider mb-1">
                    WhatsApp Direct
                  </div>
                  <div className="text-base sm:text-lg font-bold text-primaryText group-hover:text-gold transition-colors">
                    +977 9818587406
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
                <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
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
