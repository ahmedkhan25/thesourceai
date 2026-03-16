import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "source-green": "#2D8B5E",
        "source-mint": "#4ECBA0",
        "source-black": "#1A1A1A",
        "source-gray": "#F7F7F7",
        "source-border": "#E5E5E5",
        "source-muted": "#6B7280",
        "source-coral": "#C74B2A",
        "source-ai": "#4F6EF7",
      },
    },
  },
  plugins: [],
};
export default config;
