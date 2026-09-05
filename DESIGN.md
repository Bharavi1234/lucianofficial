# LUCIAN Design System (DESIGN.md)

This document defines the strict visual language, design tokens, typography, component rules, and layout constraints for the **LUCIAN** brand landing page.

---

## 1. Visual Theme & Philosophy
- **Aesthetic:** Minimal, modern, high-contrast, premium SaaS & digital agency feel.
- **Atmosphere:** Confident, sleek, dark-mode-first, razor-sharp vector geometry.
- **Strict Visual Rule:** **ABSOLUTELY ZERO HUMAN IMAGERY.** No people, faces, silhouettes, or stock photography of humans in any form. Visual interest is generated purely through bold typography, glowing gold ambient orbs, 3D tilted wireframes, fine grid meshes, and solid surface blocking.
- **Iconography:** Exclusively minimal vector line-icons from **Lucide React**. No emojis anywhere.

---

## 2. Color Palette (Strict Tokens)

| Token Name | Hex Code | RGB | Role / Usage |
| :--- | :--- | :--- | :--- |
| `bg-primary` | `#0A0A0A` | `10, 10, 10` | Primary viewport background (Deep Black) |
| `surface-card` | `#151515` | `21, 21, 21` | Secondary containers, cards, and modal surfaces |
| `surface-hover` | `#1A1A1A` | `26, 26, 26` | Card and button hover elevation states |
| `accent-gold` | `#F5B041` | `245, 176, 65` | Primary brand accent, highlights, CTA buttons, active states |
| `accent-glow` | `rgba(245, 176, 65, 0.35)` | - | Ambient drop-shadows and blurred orb lighting |
| `text-primary` | `#FFFFFF` | `255, 255, 255` | Main headlines, key titles, high-contrast copy |
| `text-muted` | `#A0A0A0` | `160, 160, 160` | Body copy, secondary descriptions, labels |
| `border-subtle` | `rgba(255, 255, 255, 0.08)` | - | Subtle hairline borders on dark containers |
| `border-gold` | `rgba(245, 176, 65, 0.30)` | - | Hover and accent borders |

---

## 3. Typography & Hierarchy

- **Font Family:** `Inter`, system-ui, sans-serif
- **Headings (H1, H2, H3):**
  - Font Weight: `800` (ExtraBold) or `900` (Black)
  - Letter Spacing: `-0.03em` to `-0.04em` (Tight tracking for authoritative presence)
  - Color: `#FFFFFF` with strategic `#F5B041` keyword highlights and underlines
- **Body & Subtitles:**
  - Font Weight: `300` (Light) or `400` (Regular)
  - Line Height: `1.65` - `1.75`
  - Color: `#A0A0A0` (Muted Gray)
- **Monospace / Badges / System Labels:**
  - Font Family: `Space Grotesk` / `ui-monospace`
  - Letter Spacing: `0.15em` - `0.22em` (Uppercase tracked labels)
  - Color: `#F5B041`

---

## 4. Spacing & Grid System

- **Spacing Scale:** Standard 8pt grid (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`).
- **Container Max Width:** `1280px` (`max-w-7xl`) with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`).
- **Asymmetrical Bento Grids:** Avoid generic symmetrical 3-column layouts. Use 2-top / 3-bottom or staggered dynamic grids for high visual distinction.

---

## 5. Component Style Guide

### Buttons
- **Primary CTA (`.btn-gold`):**
  - Background: `#F5B041`
  - Text: `#0A0A0A` (Bold 600)
  - Hover: Brightened gold, `-2px` Y-axis lift, `box-shadow: 0 0 25px rgba(245, 176, 65, 0.45)`
- **Secondary CTA (`.btn-outline`):**
  - Background: `transparent`
  - Border: `1px solid rgba(255, 255, 255, 0.25)`
  - Text: `#FFFFFF`
  - Hover: Border `#F5B041`, Text `#F5B041`, background `rgba(245, 176, 65, 0.05)`

### Service Cards
- Background: `#151515`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Bottom Border: `3px solid #F5B041`
- Hover State: `-6px` translate-y lift, gold glow border, subtle radial gradient illumination.

### Infinite Marquee
- Horizontal continuous translate animation with double-buffering.
- Subtle edge fading via CSS mask gradients (`linear-gradient(to right, transparent, black 15%, black 85%, transparent)`).

---

## 6. Brand Copy Reference

- **Brand Name:** LUCIAN
- **Tagline:** BUILD | INNOVATE | ELEVATE
- **Hero Lines:**
  1. WE BUILD BRANDS.
  2. WE CREATE IMPACT.
  3. WE ELEVATE GROWTH.
- **Closing Statement:** ONE BRAND. ENDLESS POSSIBILITIES.
- **Official Contact:**
  - Email: `lucianofficial636@gmail.com`
  - WhatsApp / Phone: `+91 9818587406`
