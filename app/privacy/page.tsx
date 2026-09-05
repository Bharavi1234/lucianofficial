import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Mail, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – LUCIAN Digital Solutions Agency",
  description:
    "Read LUCIAN's privacy policy to understand how we collect, use, and protect your personal information when you use our services and website.",
  openGraph: {
    title: "Privacy Policy – LUCIAN Digital Solutions Agency",
    description:
      "Read LUCIAN's privacy policy to understand how we collect, use, and protect your personal information.",
    url: "https://lucianofficial.vercel.app/privacy",
    siteName: "LUCIAN",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://lucianofficial.vercel.app/privacy",
  },
};

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `At LUCIAN, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services.

By using our website and services, you agree to the collection and use of information in accordance with this policy. We are committed to ensuring that your privacy is protected and that we handle your data responsibly.`,
  },
  {
    id: "information-we-collect",
    title: "What Information Do We Collect?",
    items: [
      {
        label: "Personal Information",
        detail:
          "When you contact us or submit an inquiry, we may collect your name, email address, phone number, company name, and project details.",
      },
      {
        label: "Usage Data",
        detail:
          "We may collect information about how you interact with our website, including pages visited, time spent on pages, and referral sources.",
      },
      {
        label: "Device Information",
        detail:
          "We may collect information about your device, including browser type, operating system, and IP address.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How Do We Use Your Information?",
    bullets: [
      "To respond to your inquiries and provide the services you request",
      "To improve our website, services, and customer experience",
      "To send you relevant updates, offers, and information about our services (only with your consent)",
      "To analyze website usage and optimize our marketing strategies",
      "To comply with applicable legal obligations",
    ],
  },
  {
    id: "sharing",
    title: "Do We Share Your Information?",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and delivering our services, but only to the extent necessary and under strict confidentiality agreements.

We may disclose your information if required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.`,
  },
  {
    id: "security",
    title: "How Do We Protect Your Information?",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use secure connections (HTTPS) and follow industry best practices for data security.

While we strive to protect your data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to maintaining the highest standards of protection.`,
  },
  {
    id: "cookies",
    title: "Do We Use Cookies?",
    content: `Yes, we use cookies to enhance your experience on our website. Cookies are small text files stored on your device that help us improve site functionality and analyze usage patterns.

You can choose to disable cookies in your browser settings, but please note that this may affect the functionality of certain parts of our website.`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    items: [
      {
        label: "Access",
        detail:
          "You have the right to request a copy of the personal information we hold about you.",
      },
      {
        label: "Correction",
        detail:
          "You have the right to request correction of any inaccurate or incomplete information we hold about you.",
      },
      {
        label: "Deletion",
        detail:
          "You have the right to request the deletion of your personal information, subject to certain legal obligations.",
      },
      {
        label: "Withdrawal of Consent",
        detail:
          "You have the right to withdraw your consent to our processing of your data at any time.",
      },
      {
        label: "Opt-Out",
        detail:
          "You have the right to opt out of receiving marketing communications from us at any time.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-primaryText min-h-screen">
        {/* ── HERO ── */}
        <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 text-gold mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-tight mb-4">
              Privacy{" "}
              <span className="text-gold">Policy</span>
            </h1>
            <p className="text-lg text-mutedText mb-4">
              Your privacy matters to us. Here&apos;s how we protect it.
            </p>
            <p className="text-xs font-mono text-mutedText/60 uppercase tracking-widest">
              Last Updated: September 2026
            </p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                id={section.id}
                className="p-8 rounded-2xl bg-surface border border-white/10"
              >
                {/* Section number + title */}
                <div className="flex items-start gap-4 mb-6">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-black font-mono text-gold">
                    {idx + 1}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-primaryText">
                    {section.title}
                  </h2>
                </div>

                {/* Prose content */}
                {section.content && (
                  <div className="space-y-3">
                    {section.content.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm sm:text-base text-mutedText leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Bullet list */}
                {section.bullets && (
                  <ul className="space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm sm:text-base text-mutedText">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Labeled items */}
                {section.items && (
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li key={item.label} className="text-sm sm:text-base">
                        <span className="font-semibold text-gold">{item.label}:</span>{" "}
                        <span className="text-mutedText">{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* ── CONTACT ── */}
            <div className="p-8 rounded-2xl bg-surface border border-gold/20 shadow-[0_0_40px_rgba(245,176,65,0.08)]">
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-black font-mono text-gold">
                  {sections.length + 1}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-primaryText">
                  Questions? We&apos;re Here to Help
                </h2>
              </div>
              <p className="text-sm sm:text-base text-mutedText mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us directly. We are happy to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=lucianofficial07052026@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-background text-sm font-semibold transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>lucianofficial07052026@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/9779818587406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-mutedText hover:border-gold/40 hover:text-gold text-sm font-semibold transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>977 9818587406</span>
                </a>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-mono text-mutedText hover:text-gold transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
