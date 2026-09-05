import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucianofficial.vercel.app"),
  title: "LUCIAN — 360° Digital Solutions Agency | BUILD · INNOVATE · ELEVATE",
  description:
    "LUCIAN is a premier 360° digital solutions agency for business owners, founders, and entrepreneurs. We build brands, create impact, and elevate growth.",
  keywords: [
    "LUCIAN",
    "Digital Agency",
    "Social Media Management",
    "Graphic Design",
    "Website Development",
    "Digital Marketing",
    "360 Digital Solutions",
    "Brand Growth",
  ],
  authors: [{ name: "LUCIAN" }],
  openGraph: {
    title: "LUCIAN — 360° Digital Solutions Agency",
    description: "WE BUILD BRANDS. WE CREATE IMPACT. WE ELEVATE GROWTH.",
    url: "https://lucianofficial.vercel.app",
    siteName: "LUCIAN",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUCIAN — 360° Digital Solutions Agency",
    description: "WE BUILD BRANDS. WE CREATE IMPACT. WE ELEVATE GROWTH.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LUCIAN",
  description:
    "360° digital solutions agency offering social media management, graphic design, web development, and digital marketing.",
  url: "https://lucianofficial.vercel.app",
  email: "lucianofficial636@gmail.com",
  telephone: "+9779818587406",
  sameAs: [
    "https://www.instagram.com/_lucianofficial/",
    "https://www.facebook.com/profile.php?id=61593873428903",
    "https://www.tiktok.com/@.lucianofficial",
    "https://www.threads.com/@_lucianofficial",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-background text-primaryText font-sans antialiased selection:bg-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}
