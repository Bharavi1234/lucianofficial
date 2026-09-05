import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Platforms } from "@/components/Platforms";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-primaryText overflow-hidden">
      {/* Background Ambient Grid Canvas */}
      <div className="ambient-grid" aria-hidden="true" />

      {/* 1. Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Services Grid */}
      <Services />

      {/* 4. Platforms Marquee */}
      <Platforms />

      {/* 5. Work Showcase */}
      <Work />

      {/* 6. Contact Section */}
      <Contact />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
