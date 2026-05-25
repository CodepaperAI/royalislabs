import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bone: "#EEF7FF",
        mist: "#F8FBFF",
        paper: "#FFFFFF",
        carbon: "#0A2D5E",
        lab: "#52657C",
        arctic: "#0096D7"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"]
      },
      borderRadius: {
        lab: "2px",
        image: "4px"
      },
      boxShadow: {
        rule: "0 1px 0 var(--rule-soft)",
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
        product: "var(--shadow-product)"
      },
      transitionTimingFunction: {
        lab: "var(--ease-out)",
        snap: "var(--ease-snap)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "product-rise": {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.985)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "soft-reveal": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 320ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "product-rise": "product-rise 420ms var(--ease-snap) both",
        "soft-reveal": "soft-reveal 320ms var(--ease-snap) both"
      }
    }
  },
  plugins: []
};

export default config;
