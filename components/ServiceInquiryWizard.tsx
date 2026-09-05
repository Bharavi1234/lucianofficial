"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  Send,
  Edit3,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { getServiceBySlug, getServiceIcon, servicesList } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ServiceInquiryWizardProps {
  slug: string;
}

export function ServiceInquiryWizard({ slug }: ServiceInquiryWizardProps) {
  const router = useRouter();
  const service = getServiceBySlug(slug) || servicesList[0];

  // Wizard state: 1 = Confirm Service, 2 = Tell Us About You, 3 = Review & Submit
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form inputs state (auto-preserved across steps)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+977 ",
    projectBrief: "",
    budgetRange: "$1k–2.5k",
    howFound: "Instagram",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isStep2Valid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim().length > 5 &&
    formData.projectBrief.trim() !== "";

  // Pre-filled WhatsApp message for direct instant chat
  const whatsappPreFilledUrl = `https://wa.me/9779818587406?text=${encodeURIComponent(
    `*NEW PROJECT INQUIRY FOR LUCIAN*\n` +
      `----------------------------\n` +
      `*Service:* ${service.title}\n` +
      `*Name:* ${formData.fullName || "Prospective Client"}\n` +
      `*Email:* ${formData.email || "Not specified"}\n` +
      `*Phone:* ${formData.phone || "Not specified"}\n` +
      `*Budget:* ${formData.budgetRange}\n` +
      `*Brief:* ${formData.projectBrief || "Interested in learning more about this service."}\n` +
      `----------------------------\n` +
      `Sent via lucian.agency website`
  )}`;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Submit to internal Next.js API route (/api/inquiry)
      await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName: service.title,
          ...formData,
        }),
      }).catch((err) => console.log("API notice:", err));

      // 2. Submit directly to Formspree endpoint (mqpklvrn)
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "mqpklvrn";
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          serviceName: service.title,
          ...formData,
        }),
      }).catch((err) => console.log("Formspree notice:", err));

      // Save inquiry in session storage for the confirmation page
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "lucian_last_inquiry",
          JSON.stringify({
            serviceName: service.title,
            ...formData,
            submittedAt: new Date().toLocaleTimeString(),
          })
        );
      }

      // Navigate to confirmation page
      router.push(
        `/services/confirmation?service=${encodeURIComponent(service.title)}&name=${encodeURIComponent(
          formData.fullName
        )}`
      );
    } catch (err) {
      console.error("Submission error:", err);
      router.push(
        `/services/confirmation?service=${encodeURIComponent(service.title)}&name=${encodeURIComponent(
          formData.fullName
        )}`
      );
    }
  };

  const IconComponent = getServiceIcon(service.iconName);

  return (
    <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full relative z-10">
      {/* Top Back to Services link & Step Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm font-mono text-mutedText hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Solutions</span>
        </Link>

        {/* 3-Step Visual Progress Bar */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-colors ${
              step === 1
                ? "bg-gold text-background shadow-[0_0_10px_rgba(245,176,65,0.4)]"
                : "bg-surface border border-white/10 text-mutedText"
            }`}
          >
            1. Confirm
          </span>
          <span className="text-mutedText/40">&rarr;</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-colors ${
              step === 2
                ? "bg-gold text-background shadow-[0_0_10px_rgba(245,176,65,0.4)]"
                : "bg-surface border border-white/10 text-mutedText"
            }`}
          >
            2. Details
          </span>
          <span className="text-mutedText/40">&rarr;</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-colors ${
              step === 3
                ? "bg-gold text-background shadow-[0_0_10px_rgba(245,176,65,0.4)]"
                : "bg-surface border border-white/10 text-mutedText"
            }`}
          >
            3. Review
          </span>
        </div>
      </div>

      {/* =========================================================================
          STEP 1: CONFIRM SERVICE (1 CLICK)
          ========================================================================= */}
      {step === 1 && (
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-b-4 border-b-gold animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center shadow-[0_0_20px_rgba(245,176,65,0.2)] flex-shrink-0">
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-mono text-gold uppercase tracking-wider mb-1">
                  Selected Solution
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-primaryText">
                  {service.title}
                </h1>
              </div>
            </div>

            {/* Quick WhatsApp Link */}
            <a
              href={whatsappPreFilledUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-gold hover:underline p-2 rounded-lg bg-gold/5 border border-gold/20"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Prefer WhatsApp? Chat now</span>
            </a>
          </div>

          <p className="text-base sm:text-lg text-mutedText leading-relaxed mb-8 font-light">
            {service.description}
          </p>

          {/* What's Included */}
          <div className="p-6 rounded-2xl bg-background/60 border border-white/5 mb-10">
            <h3 className="text-sm font-mono text-gold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>What&apos;s Included In This Solution</span>
            </h3>
            <ul className="space-y-3">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-primaryText">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button
              onClick={() => setStep(2)}
              size="lg"
              className="w-full text-base font-bold h-14 bg-gold text-background hover:bg-[#FFBE53] shadow-[0_0_25px_rgba(245,176,65,0.35)]"
            >
              <span>Yes, let&apos;s do this!</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 2: TELL US ABOUT YOU
          ========================================================================= */}
      {step === 2 && (
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-b-4 border-b-gold animate-in fade-in duration-300">
          <div className="mb-8">
            <div className="text-xs font-mono text-gold uppercase tracking-wider mb-1">
              Step 2 of 3 &middot; Project Details
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primaryText">
              Tell Us About You &amp; Your Vision
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                  Full Name <span className="text-gold">*</span>
                </label>
                <Input
                  id="fullName"
                  placeholder="e.g. Alex Mercer"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                  placeholder="founder@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                  Phone / WhatsApp Number <span className="text-gold">*</span>
                </label>
                <Input
                  id="phone"
                  placeholder="+977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <label htmlFor="budgetRange" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                  Estimated Budget Range (Optional)
                </label>
                <select
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="flex h-12 w-full rounded-md border border-white/10 bg-[#0A0A0A] px-4 py-2 text-sm text-primaryText focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold transition-colors"
                >
                  <option value="$500–1k">$500 &ndash; $1k</option>
                  <option value="$1k–2.5k">$1k &ndash; $2.5k (Recommended)</option>
                  <option value="$2.5k–5k">$2.5k &ndash; $5k</option>
                  <option value="$5k+">$5k+</option>
                </select>
              </div>
            </div>

            {/* Project Brief */}
            <div className="space-y-2">
              <label htmlFor="projectBrief" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                Project Brief <span className="text-gold">*</span>
              </label>
              <Textarea
                id="projectBrief"
                rows={4}
                placeholder="Briefly describe what you need, your target goals, and your desired launch timeline..."
                value={formData.projectBrief}
                onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                required
              />
            </div>

            {/* How did you hear about us */}
            <div className="space-y-2">
              <label htmlFor="howFound" className="text-xs font-semibold uppercase tracking-wider text-primaryText">
                How did you hear about us?
              </label>
              <select
                id="howFound"
                value={formData.howFound}
                onChange={(e) => setFormData({ ...formData, howFound: e.target.value })}
                className="flex h-12 w-full rounded-md border border-white/10 bg-[#0A0A0A] px-4 py-2 text-sm text-primaryText focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold transition-colors"
              >
                <option value="Instagram">Instagram (@_lucianofficial)</option>
                <option value="Facebook">Facebook (LUCIAN Official)</option>
                <option value="TikTok">TikTok (@.lucianofficial)</option>
                <option value="Google">Google Search</option>
                <option value="Referral">Client Referral / Founder</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="w-1/3 h-12"
              >
                Back
              </Button>

              <Button
                type="button"
                disabled={!isStep2Valid}
                onClick={() => setStep(3)}
                className="w-2/3 h-12 font-bold bg-gold text-background hover:bg-[#FFBE53] disabled:opacity-40"
              >
                <span>Review Inquiry</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 3: REVIEW & SUBMIT
          ========================================================================= */}
      {step === 3 && (
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-b-4 border-b-gold animate-in fade-in duration-300">
          <div className="mb-8">
            <div className="text-xs font-mono text-gold uppercase tracking-wider mb-1">
              Step 3 of 3 &middot; Final Verification
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primaryText">
              Review Your Project Inquiry
            </h2>
          </div>

          {/* Verification Summary Card */}
          <div className="space-y-6 bg-background/60 p-6 sm:p-8 rounded-2xl border border-white/10 mb-8">
            {/* Service */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <div className="text-xs font-mono text-mutedText uppercase">Selected Service</div>
                <div className="text-base sm:text-lg font-bold text-gold">{service.title}</div>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-xs font-mono text-mutedText hover:text-gold"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Change</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="flex items-start justify-between pb-4 border-b border-white/5">
              <div>
                <div className="text-xs font-mono text-mutedText uppercase mb-1">Contact Details</div>
                <div className="text-sm text-primaryText font-medium">{formData.fullName}</div>
                <div className="text-xs text-mutedText">{formData.email} &middot; {formData.phone}</div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1 text-xs font-mono text-mutedText hover:text-gold"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            {/* Brief & Budget */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-mono text-mutedText uppercase mb-1">Scope &amp; Budget</div>
                <p className="text-sm text-primaryText leading-relaxed mb-2">{formData.projectBrief}</p>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-gold bg-gold/10 px-2.5 py-1 rounded">
                  <span>Budget: {formData.budgetRange}</span>
                  <span>&middot;</span>
                  <span>Source: {formData.howFound}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1 text-xs font-mono text-mutedText hover:text-gold"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          {/* Error banner if submission failed */}
          {submitError && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-sm flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Submission Actions */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full h-14 text-base font-bold bg-gold text-background hover:bg-[#FFBE53] shadow-[0_0_25px_rgba(245,176,65,0.4)]"
            >
              {isSubmitting ? (
                <span>Submitting &amp; Notifying LUCIAN...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </span>
              )}
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
                className="h-12"
              >
                Back to Details
              </Button>

              <a
                href={whatsappPreFilledUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 rounded-md border border-gold/40 text-gold bg-gold/5 hover:bg-gold hover:text-background text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Send on WhatsApp</span>
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
