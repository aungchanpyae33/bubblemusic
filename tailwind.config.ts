import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config: Config = {
  darkMode: "selector",
  // in version 4 there is no need to do that
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 400px)" },
        overShort: { raw: "(max-height: 280px)" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        showtextoverflow:
          "showtextoverflowF var(--animate-translate-duration) linear 500ms forwards, showtextoverflowB var(--animate-translate-duration) linear calc(1000ms + var(--animate-translate-duration)) forwards",
        headshake: "headshake 0.5s ease-in-out",
      },
      keyframes: {
        showtextoverflowF: {
          from: { transform: "translateX(0)" },
          to: {
            transform:
              "translateX(calc(-100% + var(--animate-translate-info)))",
          },
        },
        showtextoverflowB: {
          from: {
            transform:
              "translateX(calc(-100% + var(--animate-translate-info)))",
          },
          to: { transform: "translateX(0)" },
        },
        headshake: {
          "0%": { transform: "translateX(0) rotate(0)" },
          "15%": { transform: "translateX(-3px) rotate(-1deg)" },
          "30%": { transform: "translateX(3px) rotate(1deg)" },
          "45%": { transform: "translateX(-2px) rotate(-0.7deg)" },
          "60%": { transform: "translateX(2px) rotate(0.7deg)" },
          "75%": { transform: "translateX(-1px) rotate(-0.3deg)" },
          "100%": { transform: "translateX(0) rotate(0)" },
        },
      },
      colors: {
        overlay: "var(--overlay)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        icon: {
          foreground: "var(--foreground)",
        },
        seperate: {
          soft: "var(--seperate)",
          hard: "var(--seperate-hard)",
        },
        section: "var(--section-card)",
        borderFull: "var(--bordersecondary)",
        placeholder: "var(--placeholder)",
        pop: "var(--pop)",
        brand: "var(--brand)",
        surface: {
          1: "var(--surface-1)",
          2: "var(--surface-2)",
        },
        ink: {
          400: "var(--ink-400)",
          "gray-400": "var(--ink-gray-400)",
        },
        warning: {
          300: "var(--warning-300)",
          400: "var(--warning-400)",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("has-hover", "@media(hover : hover)");
      addVariant("no-hover", "@media not all and (hover: hover)");
    }),
  ],
};
export default config;
