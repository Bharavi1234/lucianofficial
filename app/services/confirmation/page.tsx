"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Phone, Clock, FileCheck, PhoneCall, Rocket } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("service") || "Digital Solutions";

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
        Thank You!
      </h1>

      <p className="text-base sm:text-lg text-mutedText max-w-xl leading-relaxed mb-12">
        Your inquiry for <strong className="text-primaryText">{serviceName}</strong> has been received. We&apos;ll review it and get back to you within 24 hours via email or WhatsApp.
      </p>

      {/* What Happens Next Section */}
      <div className="w-full text-left p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-b-4 border-b-gold mb-10">
        <h2 className="text-lg font-mono text-gold uppercase tracking-wider mb-6 flex items-center gap-2">
          <span>What Happens Next?</span>
        </h2>

        <div className="space-y-6">
          {nextSteps.map((item, idx) => {
            const StepIcon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-primaryText mb-1 flex items-center gap-2">
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-mutedText">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <Button asChild size="lg" className="w-full sm:w-auto text-base font-bold px-8 py-6 h-auto shadow-[0_0_25px_rgba(245,176,65,0.35)]">
          <Link href="/" className="gap-2">
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto text-base font-semibold px-8 py-6 h-auto border-gold/40 text-gold hover:bg-gold hover:text-background"
        >
          <a
            href="https://wa.me/9779818587406?text=Hi%20LUCIAN,%20I%20just%20submitted%20a%20project%20inquiry%20on%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Chat on WhatsApp now</span>
          </a>
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
