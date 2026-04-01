import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Times New Roman", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        gold: {
          DEFAULT: "#C9A96E",
          light: "#F0D89A",
          dark: "#9A7A4A",
          dim: "#C9A96E60",
          faint: "#C9A96E15",
        },
        canvas: {
          DEFAULT: "#0A0A0A",
          light: "#0F0F0F",
          mid: "#141410",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
