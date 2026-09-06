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
  Star,
  Check,
} from "lucide-react";
import { getServiceBySlug, getServiceIcon, servicesList } from "@/lib/services-data";
import { SERVICE_PRICING, ServicePackage } from "@/lib/pricing";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ServiceInquiryWizardProps {
  slug: string;
}

export function ServiceInquiryWizard({ slug }: ServiceInquiryWizardProps) {
  const router = useRouter();
  const service = getServiceBySlug(slug) || servicesList[0];
  const { currency, formatPrice, locationDetails } = useCurrency();

  const pricingData = SERVICE_PRICING[slug] || SERVICE_PRICING["social-media-management"];
  const defaultPackage = pricingData.packages.find((p) => p.isPopular) || pricingData.packages[0];

  // Wizard state: 1 = Select Package, 2 = Tell Us About You, 3 = Review & Submit
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage>(defaultPackage);

  // Form inputs state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectBrief: "",
    budgetRange: "Within Package Price",
    howFound: "Instagram",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    projectBrief: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validation rules
  const isNameValid = formData.fullName.trim().length >= 2;
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    formData.email.trim()
  );
  const cleanPhoneDigits = formData.phone.replace(/[^0-9]/g, "");
  const isPhoneValid = cleanPhoneDigits.length >= 7 && cleanPhoneDigits.length <= 16;
  const isBriefValid = formData.projectBrief.trim().length >= 10;

  const isStep2Valid = isNameValid && isEmailValid && isPhoneValid && isBriefValid;

  const formattedSelectedPrice = formatPrice(
    selectedPackage.usdPrice,
    selectedPackage.unit
  );

  const clientLocationStr = `${locationDetails.city ? `${locationDetails.city}, ` : ""}${locationDetails.countryName} (${locationDetails.countryCode})`;

  // Pre-filled WhatsApp message for direct instant chat
  const whatsappPreFilledUrl = `https://wa.me/9779818587406?text=${encodeURIComponent(
    `*NEW PROJECT INQUIRY FOR LUCIAN*\n` +
      `----------------------------\n` +
      `*Service:* ${service.title}\n` +
      `*Package:* ${selectedPackage.name} (${formattedSelectedPrice})\n` +
      `*Client Location:* ${clientLocationStr}\n` +
      `*Name:* ${formData.fullName || "Prospective Client"}\n` +
      `*Email:* ${formData.email || "Not specified"}\n` +
      `*Phone:* ${formData.phone.trim() || "Not specified"}\n` +
      `*Budget:* ${formData.budgetRange}\n` +
      `*Brief:* ${formData.projectBrief || "Interested in this package."}\n` +
      `----------------------------\n` +
      `Sent via lucianofficial.vercel.app`
  )}`;

  const handlePackageSelect = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setStep(2);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const submissionPayload = {
      serviceName: service.title,
      packageName: selectedPackage.name,
      packagePrice: formattedSelectedPrice,
      currency,
      clientCountry: `${locationDetails.countryName} (${locationDetails.countryCode})`,
      clientCity: locationDetails.city || "",
      clientRegion: locationDetails.region || "",
      clientTimezone: locationDetails.timezone || "",
      clientIp: locationDetails.ip || "",
      ...formData,
    };

    try {
      // 1. Submit to internal Next.js API route (/api/inquiry)
      await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionPayload),
      }).catch((err) => console.log("API notice:", err));

      // 2. Submit directly to Formspree endpoint (mqpklvrn)
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "mqpklvrn";
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionPayload),
      }).catch((err) => console.log("Formspree notice:", err));

      // Save inquiry in session storage for the confirmation page
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "lucian_last_inquiry",
          JSON.stringify({
            ...submissionPayload,
            clientLocation: clientLocationStr,
            submittedAt: new Date().toLocaleTimeString(),
          })
        );
      }

      // Navigate to confirmation page
      router.push(
        `/services/confirmation?service=${encodeURIComponent(
          service.title
        )}&package=${encodeURIComponent(selectedPackage.name)}&name=${encodeURIComponent(
          formData.fullName
        )}`
      );
    } catch (err) {
      console.error("Submission error:", err);
      router.push(
        `/services/confirmation?service=${encodeURIComponent(
          service.title
        )}&package=${encodeURIComponent(selectedPackage.name)}&name=${encodeURIComponent(
          formData.fullName
        )}`
      );
    }
  };

  const handleStep2Next = () => {
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      projectBrief: true,
    });
    if (isStep2Valid) {
      setStep(3);
    }
  };

  const IconComponent = getServiceIcon(service.iconName);

  return (
    <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10">
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
            1. Select Package
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
          STEP 1: SELECT PACKAGE (3 CARDS)
          ========================================================================= */}
      {step === 1 && (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Header */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center shadow-[0_0_20px_rgba(245,176,65,0.2)] flex-shrink-0">
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-mono text-gold uppercase tracking-wider mb-1">
                  Step 1 &middot; Choose Your Tier
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-primaryText">
                  {service.title}
                </h1>
                <p className="text-sm text-mutedText mt-1 max-w-2xl font-light">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Quick WhatsApp Link */}
            <a
              href={whatsappPreFilledUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-gold hover:underline p-2.5 rounded-lg bg-gold/5 border border-gold/20 flex-shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Prefer WhatsApp? Chat now</span>
            </a>
          </div>

          {/* 3 Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {pricingData.packages.map((pkg) => {
              const priceDisplay = formatPrice(pkg.usdPrice, pkg.unit);
              const isSelected = selectedPackage.id === pkg.id;

              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                    pkg.isPopular
                      ? "bg-surface border-2 border-gold shadow-[0_15px_40px_rgba(245,176,65,0.18)] -translate-y-1"
                      : "bg-surface border border-white/10 hover:border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                  }`}
                >
                  {/* Most Popular Badge */}
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold text-background text-[11px] font-mono font-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,176,65,0.6)]">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div>
                    {/* Package Name */}
                    <div className="text-xs font-mono uppercase tracking-widest text-mutedText mb-2">
                      {pkg.name} Package
                    </div>

                    {/* Price in selected currency */}
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-gold tracking-tight font-mono">
                        {priceDisplay}
                      </span>
                    </div>

                    {/* Deliverables / Features */}
                    <div className="pt-4 border-t border-white/10 space-y-3 mb-8">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-primaryText">
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Select Button */}
                  <Button
                    type="button"
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full h-12 font-bold transition-all ${
                      pkg.isPopular
                        ? "bg-gold text-background hover:bg-[#FFBE53] shadow-[0_0_20px_rgba(245,176,65,0.35)]"
                        : "bg-white/10 text-white hover:bg-gold hover:text-background border border-white/15 hover:border-gold"
                    }`}
                  >
                    <span>Select {pkg.name}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 2: TELL US ABOUT YOU
          ========================================================================= */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-surface border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-b-4 border-b-gold animate-in fade-in duration-300">
          {/* Selected Package Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gold/10 border border-gold/30 mb-8">
            <div>
              <div className="text-[10px] font-mono text-gold uppercase">Selected Tier</div>
              <div className="text-sm sm:text-base font-bold text-white">
                {service.title} &middot; <span className="text-gold">{selectedPackage.name} ({formattedSelectedPrice})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-mono text-gold underline hover:text-[#FFBE53]"
            >
              Change Tier
            </button>
          </div>

          <div className="mb-8">
            <div className="text-xs font-mono text-gold uppercase tracking-wider mb-1">
              Step 2 of 3 &middot; Project Details
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primaryText">
              Tell Us About You &amp; Your Vision
            </h2>
            <p className="text-sm text-mutedText mt-1">
              Please provide accurate contact info so our strategy team can reach you promptly.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-primaryText flex items-center justify-between">
                  <span>Full Name <span className="text-gold">*</span></span>
                  {touched.fullName && !isNameValid && (
                    <span className="text-[11px] text-red-400 normal-case font-normal">Min 2 characters required</span>
                  )}
                </label>
                <Input
                  id="fullName"
                  placeholder="e.g. Alex Mercer"
                  value={formData.fullName}
                  onBlur={() => setTouched({ ...touched, fullName: true })}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={touched.fullName && !isNameValid ? "border-red-500 focus-visible:ring-red-500" : ""}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-primaryText flex items-center justify-between">
                  <span>Email Address <span className="text-gold">*</span></span>
                  {touched.email && !isEmailValid && (
                    <span className="text-[11px] text-red-400 normal-case font-normal">Valid email required</span>
                  )}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="founder@company.com"
                  value={formData.email}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={touched.email && !isEmailValid ? "border-red-500 focus-visible:ring-red-500" : ""}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone / WhatsApp direct input */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-primaryText flex items-center justify-between">
                  <span>Phone / WhatsApp Number <span className="text-gold">*</span></span>
                  {touched.phone && !isPhoneValid && (
                    <span className="text-[11px] text-red-400 normal-case font-normal">Please enter a valid phone number</span>
                  )}
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g. +977 9818587406 or 9818587406"
                  value={formData.phone}
                  onBlur={() => setTouched({ ...touched, phone: true })}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={touched.phone && !isPhoneValid ? "border-red-500 focus-visible:ring-red-500" : ""}
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
                  <option value="Within Package Price">Matches Package ({formattedSelectedPrice})</option>
                  <option value="Flexible / Scaling">Flexible / Scaling</option>
                  <option value="Higher Scope Tier">Higher Scope Tier</option>
                </select>
              </div>
            </div>

            {/* Project Brief */}
            <div className="space-y-2">
              <label htmlFor="projectBrief" className="text-xs font-semibold uppercase tracking-wider text-primaryText flex items-center justify-between">
                <span>Project Brief <span className="text-gold">*</span></span>
                {touched.projectBrief && !isBriefValid && (
                  <span className="text-[11px] text-red-400 normal-case font-normal">Min 10 characters required</span>
                )}
              </label>
              <Textarea
                id="projectBrief"
                rows={4}
                placeholder="Briefly describe your goals, required deliverables, brand details, and desired launch timeline..."
                value={formData.projectBrief}
                onBlur={() => setTouched({ ...touched, projectBrief: true })}
                onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                className={touched.projectBrief && !isBriefValid ? "border-red-500 focus-visible:ring-red-500" : ""}
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
                <option value="TikTok">TikTok (@.lucianofficial)</option>
                <option value="Facebook">Facebook (LUCIAN Official)</option>
                <option value="Google">Google Search</option>
                <option value="Referral">Client Referral / Partner</option>
                <option value="Other">Other Channel</option>
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
                onClick={handleStep2Next}
                className="w-2/3 h-12 font-bold bg-gold text-background hover:bg-[#FFBE53]"
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
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-surface border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-b-4 border-b-gold animate-in fade-in duration-300">
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
            {/* Service & Package */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <div className="text-xs font-mono text-mutedText uppercase">Selected Package</div>
                <div className="text-base sm:text-lg font-bold text-primaryText">
                  {service.title} &middot; <span className="text-gold">{selectedPackage.name} ({formattedSelectedPrice})</span>
                </div>
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
                <span>Chat on WhatsApp instead</span>
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
