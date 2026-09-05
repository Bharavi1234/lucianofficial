import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: {
          DEFAULT: "#151515",
          hover: "#1A1A1A",
          muted: "#0D0D0D",
        },
        gold: {
          DEFAULT: "#F5B041",
          hover: "#FFBE53",
          dark: "#D4932B",
          glow: "rgba(245, 176, 65, 0.35)",
          subtle: "rgba(245, 176, 65, 0.10)",
          border: "rgba(245, 176, 65, 0.25)",
        },
        primaryText: "#FFFFFF",
        mutedText: "#A0A0A0",
        dimText: "#737373",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "Space Grotesk", "monospace"],
      },
      animation: {
        "marquee": "marquee 25s linear infinite",
        "float": "float 6s ease-in-out infinite alternate",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
