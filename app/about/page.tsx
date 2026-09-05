import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Lightbulb,
  Star,
  Shield,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About LUCIAN – Digital Solutions Agency | Build, Innovate, Elevate",
  description:
    "LUCIAN is a 360° digital solutions agency offering social media management, graphic design, web development, and digital marketing. We help brands grow and achieve real results.",
  openGraph: {
    title: "About LUCIAN – Digital Solutions Agency | Build, Innovate, Elevate",
    description:
      "LUCIAN is a 360° digital solutions agency offering social media management, graphic design, web development, and digital marketing. We help brands grow and achieve real results.",
    url: "https://lucianofficial.vercel.app/about",
    siteName: "LUCIAN",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://lucianofficial.vercel.app/about",
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay ahead of digital trends to deliver the most effective, forward-thinking solutions for your brand.",
  },
  {
    icon: Star,
    title: "Excellence",
    description:
      "We never settle for average. Every project we take on is executed to the highest standard of quality.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We build lasting partnerships through honest communication, transparency, and consistent delivery.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description:
      "We measure our success by the growth we drive for our clients — in reach, revenue, and reputation.",
  },
];

const whyUs = [
  "End-to-end digital solutions under one roof",
  "Data-driven strategies for measurable results",
  "Creative, eye-catching designs that build brand identity",
  "Responsive, modern websites that convert visitors into customers",
  "Dedicated support from strategy to execution",
  "Transparent reporting and clear communication at every step",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About LUCIAN",
  url: "https://lucianofficial.vercel.app/about",
  description:
    "LUCIAN is a 360° digital solutions agency dedicated to helping brands establish a powerful online presence through social media management, graphic design, web development, and digital marketing.",
  mainEntity: {
    "@type": "Organization",
    name: "LUCIAN",
    url: "https://lucianofficial.vercel.app",
    description:
      "360° digital solutions agency offering social media management, graphic design, web development, and digital marketing.",
    email: "lucianofficial07052026@gmail.com",
    telephone: "+9779818587406",
    sameAs: [
      "https://www.instagram.com/_lucianofficial/",
      "https://www.facebook.com/profile.php?id=61593873428903",
      "https://www.tiktok.com/@.lucianofficial",
      "https://www.threads.com/@_lucianofficial",
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-background text-primaryText min-h-screen">
        {/* ── HERO ── */}
        <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Our Story
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[1.05] mb-6">
              About{" "}
              <span className="text-gold">LUCIAN</span>
            </h1>
            <p className="text-lg sm:text-xl text-mutedText leading-relaxed max-w-2xl mx-auto">
              We build brands. We create impact. We elevate growth.
            </p>
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Who We Are
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-primaryText uppercase tracking-tight mb-6">
                  A Brand Built on{" "}
                  <span className="text-gold">Results</span>
                </h2>
                <div className="space-y-4 text-mutedText text-base sm:text-lg leading-relaxed">
                  <p>
                    LUCIAN is a 360° digital solutions agency dedicated to
                    helping brands establish a powerful online presence. We
                    believe that every brand has a unique story to tell, and our
                    mission is to amplify that story through strategic digital
                    services.
                  </p>
                  <p>
                    Founded with a passion for innovation and creativity, LUCIAN
                    brings together expertise in social media management, graphic
                    design, web development, and digital marketing. We
                    don&apos;t just deliver services — we deliver results that
                    help our clients grow, engage their audiences, and achieve
                    their business goals.
                  </p>
                  <p>
                    Our approach is simple: we listen, we strategize, and we
                    execute. Whether you&apos;re a startup looking to build your
                    brand or an established business seeking to scale, LUCIAN is
                    your partner in digital success.
                  </p>
                </div>
              </div>

              {/* Abstract visual card */}
              <div className="relative">
                <div className="rounded-3xl bg-surface border border-white/10 p-10 text-center shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <Zap className="w-10 h-10 text-gold" />
                    </div>
                  </div>
                  <div className="text-5xl font-black text-gold mb-2">360°</div>
                  <div className="text-sm font-mono uppercase tracking-widest text-mutedText mb-8">
                    Digital Coverage
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-left">
                    {[
                      "Social Media",
                      "Graphic Design",
                      "Web Development",
                      "Digital Marketing",
                      "SEO & Branding",
                      "Video Editing",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-mutedText font-mono"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Glow behind card */}
                <div className="absolute -inset-4 rounded-3xl bg-gold/5 blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION ── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30 border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Our Mission
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-primaryText uppercase tracking-tight mb-8">
              Why We <span className="text-gold">Exist</span>
            </h2>
            <p className="text-lg sm:text-2xl text-mutedText leading-relaxed font-light">
              To empower businesses with cutting-edge digital solutions that
              drive measurable growth. We combine creativity with strategy to
              deliver exceptional results for our clients.
            </p>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                What Drives Us
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-primaryText uppercase tracking-tight">
                Our <span className="text-gold">Core Values</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="p-7 rounded-2xl bg-surface border border-white/10 hover:border-gold/40 hover:-translate-y-1 transition-all duration-200 shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold group-hover:border-gold transition-colors">
                    <Icon className="w-6 h-6 text-gold group-hover:text-background transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-primaryText uppercase tracking-wide mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-mutedText leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY LUCIAN ── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Why Work With Us
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-primaryText uppercase tracking-tight">
                The <span className="text-gold">LUCIAN</span> Difference
              </h2>
            </div>

            <ul className="space-y-4">
              {whyUs.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-white/10 hover:border-gold/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-base text-primaryText leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-[130px] pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-gold tracking-[0.2em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Get Started
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-primaryText uppercase tracking-tight mb-4">
              Ready to <span className="text-gold">Elevate</span> Your Brand?
            </h2>
            <p className="text-lg text-mutedText mb-10">
              Let&apos;s build something amazing together.
            </p>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 bg-gold text-background font-bold px-8 py-4 rounded-xl hover:bg-[#FFBE53] shadow-[0_0_30px_rgba(245,176,65,0.35)] transition-all text-base"
            >
              <span>View Our Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
