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

      {/* 1. Simplified Navigation */}
      <Navbar />

      {/* 2. Simplified Hero Section */}
      <Hero />

      {/* 3. Simplified 3-Card Services Grid */}
      <Services />

      {/* 4. Connect / Platforms */}
      <Platforms />

      {/* 5. Simplified Direct Contact */}
      <Contact />

      {/* 6. Simplified Footer */}
      <Footer />
    </main>
  );
}
