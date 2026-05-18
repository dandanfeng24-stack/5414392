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
        ink: "#0B0A08",
        charcoal: "#1A1712",
        warmblack: "#12100C",
        gold: "#B89A5E",
        paper: "#E8DDC5",
        linen: "#B8AD96"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "serif"]
      },
      boxShadow: {
        quiet: "0 18px 60px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
