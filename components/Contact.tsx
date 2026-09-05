"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "360 Full Package",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    // Log to console for development / production inspection
    console.log("LUCIAN Contact Form Submission:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "360 Full Package",
        message: "",
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-28 bg-[#0D0D0D] border-t border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-gold/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Grid Layout (Left: Info, Right: Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Headline & Direct Contact Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Initiate Dialogue
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-primaryText tracking-tight leading-[1.1] mb-6">
                Let&apos;s build something <span className="text-gold">amazing</span> together.
              </h2>

              <p className="text-base sm:text-lg text-mutedText leading-relaxed mb-10">
                Ready to transform your digital presence, scale high-converting acquisition channels, and achieve market dominance? Reach out directly.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:lucianofficial636@gmail.com"
                className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group"
              >
                <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-dimText uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-primaryText group-hover:text-gold transition-colors">
                    lucianofficial636@gmail.com
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919818587406"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-white/10 hover:border-gold/50 hover:bg-surface-hover transition-all duration-200 group"
              >
                <div className="p-3.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-dimText uppercase tracking-wider">
                    WhatsApp Direct
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-primaryText group-hover:text-gold transition-colors">
                    +91 9818587406
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: High-Converting Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                      Your Name <span className="text-gold">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="founder@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                    Service of Interest
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="flex h-12 w-full rounded-md border border-white/10 bg-[#0A0A0A] px-4 py-2 text-sm text-primaryText focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold transition-colors duration-200"
                  >
                    <option value="360 Full Package">360&deg; Full-Service Package</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Graphic Design & Poster Making">Graphic Design &amp; Poster Making</option>
                    <option value="Website Design & Development">Website Design &amp; Development</option>
                    <option value="Digital Marketing & Advertising">Digital Marketing &amp; Advertising</option>
                    <option value="Other Digital Solutions">Other Digital Solutions</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                    Your Message / Project Scope <span className="text-gold">*</span>
                  </label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your brand goals, target launch timeline, and key requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                {/* Submit Error */}
                {errorMessage && (
                  <p className="text-xs font-mono text-red-400 bg-red-950/40 p-3 rounded border border-red-800/40">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Success */}
                {isSuccess && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-gold/10 border border-gold text-gold text-sm font-medium">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Message received! The LUCIAN team will get back to you within 24 hours.</span>
                  </div>
                )}

                {/* Submit Button (Solid Gold) */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full text-base font-bold bg-gold text-background hover:bg-[#FFBE53] shadow-[0_0_25px_rgba(245,176,65,0.4)]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">Transmitting...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
