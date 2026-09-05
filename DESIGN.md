# LUCIAN Design System (DESIGN.md)

This document defines the strict visual language, design tokens, typography, component rules, and simplified layout specifications for the **LUCIAN** brand landing page.

---

## 1. Visual Theme & Philosophy
- **Aesthetic:** Minimal, modern, high-contrast, streamlined digital agency feel.
- **Atmosphere:** Confident, sleek, dark-mode-first, razor-sharp vector geometry.
- **Strict Visual Rule:** **ABSOLUTELY ZERO HUMAN IMAGERY.** No people, faces, silhouettes, or stock photography of humans in any form. Visual interest is generated purely through bold typography, subtle gold ambient lighting, fine grid meshes, and dark surface blocking.
- **Iconography:** Exclusively minimal vector line-icons from **Lucide React**. No emojis anywhere.

---

## 2. Color Palette (Strict Tokens)

| Token Name | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| `bg-primary` | `#0A0A0A` | Primary viewport background (Deep Black) |
| `surface-card` | `#151515` | Secondary containers and cards |
| `surface-hover` | `#1A1A1A` | Card and button hover elevation states |
| `accent-gold` | `#F5B041` | Primary brand accent, highlights, CTA buttons, active states |
| `text-primary` | `#FFFFFF` | Main headlines, key titles, high-contrast copy |
| `text-muted` | `#A0A0A0` | Body copy, secondary descriptions, labels |
| `border-subtle` | `rgba(255, 255, 255, 0.08)` | Subtle hairline borders on dark containers |
| `border-gold` | `rgba(245, 176, 65, 0.30)` | Hover and accent borders |

---

## 3. Typography & Hierarchy

- **Font Family:** `Inter`, system-ui, sans-serif
- **Headings (H1, H2, H3):**
  - Font Weight: `800` (ExtraBold) or `900` (Black)
  - Letter Spacing: `-0.03em` to `-0.04em` (Tight tracking for authoritative presence)
  - Color: `#FFFFFF` with strategic `#F5B041` keyword highlights and underlines
- **Body & Subtitles:**
  - Font Weight: `300` (Light) or `400` (Regular)
  - Line Height: `1.6` - `1.7`
  - Color: `#A0A0A0` (Muted Gray)
- **Monospace / Badges / System Labels:**
  - Font Family: `Space Grotesk` / `ui-monospace`
  - Letter Spacing: `0.15em` - `0.22em` (Uppercase tracked labels)
  - Color: `#F5B041`

---

## 4. Simplified Component Architecture

### A. Navigation (`components/Navbar.tsx`)
- Links: **Home** (`#home`), **Services** (`#services`), **Contact** (`#contact`).
- Phone badge: `+977 9818587406` with active `tel:+9779818587406` link.
- Mobile drawer with responsive hamburger menu.

### B. Hero (`components/Hero.tsx`)
- Headline: Three bold lines with gold underlines on `BRANDS`, `IMPACT`, `GROWTH`.
- Pre-headline: `BUILD · INNOVATE · ELEVATE`.
- Single punchy supporting sentence.
- Single Solid Gold CTA button: `Let's Connect` linking to `#contact`.

### C. Services (`components/Services.tsx`)
- Header: `Digital Solutions` (with `Solutions` in Gold).
- 3 Core Cards in a clean row (stacked on mobile):
  1. **Social Media Management:** *"Strategy, content & growth for your brand."*
  2. **Graphic Design & Branding:** *"Eye-catching designs that communicate your brand."*
  3. **Website & Digital Marketing:** *"Modern websites & campaigns that drive results."*

### D. Platforms (`components/Platforms.tsx`)
- Clean static cards linking to official channels: **Instagram**, **Facebook**, **TikTok**.

### E. Contact (`components/Contact.tsx`)
- Direct outreach cards for **WhatsApp** (`+977 9818587406`) and **Email** (`lucianofficial636@gmail.com`).

### F. Footer (`components/Footer.tsx`)
- Tagline: `ONE BRAND. ENDLESS POSSIBILITIES.` (`ENDLESS` in gold).
- Social links:
  - Instagram: `https://www.instagram.com/_lucianofficial/`
  - Facebook: `https://www.facebook.com/profile.php?id=61593873428903`
  - TikTok: `https://www.tiktok.com/@.lucianofficial`
  - Threads: `https://www.threads.com/@_lucianofficial`
- Copyright: `© 2026 LUCIAN. All rights reserved.`
