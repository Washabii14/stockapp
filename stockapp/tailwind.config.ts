import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base dark palette
        surface: {
          DEFAULT: "#0f1117",
          50: "#1a1d2e",
          100: "#161826",
          200: "#12141f",
          300: "#0f1117",
          400: "#0b0d12",
          500: "#07080d",
        },
        // Accent colors
        neon: {
          cyan: "#00f5ff",
          green: "#39ff14",
          red: "#ff4757",
          yellow: "#ffd32a",
          purple: "#a55eea",
        },
        // Border colors
        border: {
          DEFAULT: "#1e2030",
          light: "#252840",
        },
        // Text
        text: {
          primary: "#e2e8f0",
          secondary: "#94a3b8",
          muted: "#475569",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "card-green":
          "linear-gradient(135deg, rgba(57,255,20,0.08) 0%, rgba(57,255,20,0.02) 100%)",
        "card-red":
          "linear-gradient(135deg, rgba(255,71,87,0.08) 0%, rgba(255,71,87,0.02) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0,0,0,0.37)",
        "neon-green": "0 0 20px rgba(57,255,20,0.3)",
        "neon-red": "0 0 20px rgba(255,71,87,0.3)",
        "neon-cyan": "0 0 20px rgba(0,245,255,0.3)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        "ticker-scroll": "ticker-scroll 60s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
