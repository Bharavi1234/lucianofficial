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
  ],
  authors: [{ name: "LUCIAN" }],
  openGraph: {
    title: "LUCIAN — 360° Digital Solutions Agency",
    description: "WE BUILD BRANDS. WE CREATE IMPACT. WE ELEVATE GROWTH.",
    url: "https://lucian.agency",
    siteName: "LUCIAN",
    locale: "en_US",
    type: "website",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth`}>
      <body className="bg-background text-primaryText font-sans antialiased selection:bg-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}
