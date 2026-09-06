"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  Clock,
  FileCheck,
  PhoneCall,
  Rocket,
  Mail,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface InquiryData {
  serviceName?: string;
  packageName?: string;
  packagePrice?: string;
  currency?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  projectBrief?: string;
  budgetRange?: string;
  howFound?: string;
  submittedAt?: string;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const urlService = searchParams.get("service") || "Digital Solutions";
  const urlPackage = searchParams.get("package") || "";
  const urlName = searchParams.get("name") || "";

  const [inquiry, setInquiry] = useState<InquiryData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("lucian_last_inquiry");
        if (stored) {
          setInquiry(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Could not parse saved inquiry:", e);
      }
    }
  }, []);

  const serviceName = inquiry?.serviceName || urlService;
  const packageName = inquiry?.packageName || urlPackage;
  const packagePrice = inquiry?.packagePrice || "";
  const clientName = inquiry?.fullName || urlName || "Valued Client";

  const whatsappMessage = `*CONFIRMED PROJECT INQUIRY FOR LUCIAN*\n` +
    `----------------------------\n` +
    `*Service:* ${serviceName}\n` +
    (packageName ? `*Package:* ${packageName} ${packagePrice ? `(${packagePrice})` : ""}\n` : "") +
    `*Client:* ${clientName}\n` +
    (inquiry?.email ? `*Email:* ${inquiry.email}\n` : "") +
    (inquiry?.phone ? `*Phone:* ${inquiry.phone}\n` : "") +
    (inquiry?.budgetRange ? `*Budget:* ${inquiry.budgetRange}\n` : "") +
    (inquiry?.projectBrief ? `*Brief:* ${inquiry.projectBrief}\n` : "") +
    `----------------------------\n` +
    `Hi LUCIAN, I just submitted this inquiry on your website!`;

  const whatsappUrl = `https://wa.me/9779818587406?text=${encodeURIComponent(whatsappMessage)}`;

  const nextSteps = [
    {
      step: "01",
      title: "We Review Your Project Details",
      desc: "Our lead team analyzes your requirements, goals, and target timeline.",
      icon: FileCheck,
    },
    {
      step: "02",
      title: "We Reach Out via Email or WhatsApp",
      desc: "Within 24 hours, we connect directly to discuss specific deliverables.",
      icon: PhoneCall,
    },
    {
      step: "03",
      title: "We Schedule a Discovery Call",
      desc: "A focused strategy session to align on roadmap, scope, and KPIs.",
      icon: Clock,
    },
    {
      step: "04",
      title: "We Build Your Solution",
      desc: "Execution starts with rapid sprint milestones and transparent communication.",
      icon: Rocket,
    },
  ];

  return (
    <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
      {/* Thank you badge */}
      <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold text-gold flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(245,176,65,0.4)] animate-in zoom-in duration-300">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
        <span>Inquiry Received Successfully</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-primaryText tracking-tight mb-4">
        Thank You, {clientName}!
      </h1>

      <p className="text-base sm:text-lg text-mutedText max-w-xl leading-relaxed mb-10">
        Your inquiry for <strong className="text-primaryText">{serviceName}</strong> has been received. We&apos;ll review it and get back to you within 24 hours via email or WhatsApp.
      </p>

      {/* Direct WhatsApp Instant Action Banner */}
      <div className="w-full p-6 sm:p-8 rounded-3xl bg-gold/10 border border-gold/40 mb-10 text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(245,176,65,0.15)]">
        <div>
          <div className="text-xs font-mono text-gold uppercase tracking-wider mb-1">
            Instant Direct Response
          </div>
          <h3 className="text-lg font-bold text-primaryText mb-1">
            Want an immediate response on WhatsApp?
          </h3>
          <p className="text-xs sm:text-sm text-mutedText">
            Send a copy of your inquiry directly to our founders on WhatsApp (+977 9818587406).
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold text-background hover:bg-[#FFBE53] text-sm font-bold shadow-[0_0_20px_rgba(245,176,65,0.4)] transition-all flex-shrink-0 w-full sm:w-auto"
        >
          <Phone className="w-4 h-4" />
          <span>Chat on WhatsApp now</span>
        </a>
      </div>

      {/* What Happens Next Section */}
      <div className="w-full text-left p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-b-4 border-b-gold mb-10">
        <h2 className="text-lg font-mono text-gold uppercase tracking-wider mb-6 flex items-center gap-2">
          <span>What Happens Next?</span>
        </h2>

        <div className="space-y-6">
          {nextSteps.map((item, idx) => {
            return (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-primaryText mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-mutedText">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button: Back to Home */}
      <div className="w-full flex justify-center">
        <Button asChild size="lg" variant="outline" className="text-base font-semibold px-8 py-6 h-auto">
          <Link href="/" className="gap-2">
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-background text-primaryText flex flex-col justify-between relative overflow-hidden">
      {/* Ambient Canvas Grid */}
      <div className="ambient-grid" aria-hidden="true" />

      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gold/10 blur-[150px] pointer-events-none" />

      <Navbar />

      <Suspense fallback={<div className="pt-40 text-center text-mutedText">Loading confirmation...</div>}>
        <ConfirmationContent />
      </Suspense>

      <Footer />
    </main>
  );
}
