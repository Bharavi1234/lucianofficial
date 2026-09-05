import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Platforms } from "@/components/Platforms";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-primaryText overflow-hidden">
      {/* Background Ambient Grid Canvas */}
      <div className="ambient-grid" aria-hidden="true" />

      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Services Section (ALL-IN-ONE DIGITAL SOLUTIONS - 5 Cards) */}
      <Services />

      {/* 4. Platforms Section (WE WORK ACROSS ALL PLATFORMS) */}
      <Platforms />

      {/* 5. Contact Section (LET'S CONNECT) */}
      <Contact />

      {/* 6. Footer (ONE BRAND. ENDLESS POSSIBILITIES.) */}
      <Footer />
    </main>
  );
}
