import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        "border": "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-heading": "var(--color-text-heading)",
        "text-muted": "var(--color-text-muted)",
        "accent-blue": "var(--color-accent-blue)",
        "accent-purple": "var(--color-accent-purple)",
        "accent-green": "var(--color-accent-green)",
        "accent-yellow": "var(--color-accent-yellow)",
        "accent-red": "var(--color-accent-red)",
      },
      fontFamily: {
        mono: "var(--font-mono)",
        sans: "var(--font-sans)",
      },
    },
  },
};

export default config;
