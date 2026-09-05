import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesList, getServiceBySlug } from "@/lib/services-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceInquiryWizard } from "@/components/ServiceInquiryWizard";

interface PageProps {
  params: {
    slug: string;
  };
}

// Pre-render all 5 service slugs statically
export async function generateStaticParams() {
  return servicesList.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return {
      title: "Service Inquiry — LUCIAN",
    };
  }

  return {
    title: `${service.title} — LUCIAN 360° Digital Solutions`,
    description: service.description,
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-primaryText flex flex-col justify-between relative overflow-hidden">
      {/* Ambient Canvas Grid */}
      <div className="ambient-grid" aria-hidden="true" />

      {/* Background Glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-[140px] pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Interactive 3-Step Wizard with serializable slug */}
      <ServiceInquiryWizard slug={params.slug} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
