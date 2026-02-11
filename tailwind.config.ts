import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        "ocean-deep": "#0B3C6D",
        "ocean-mid": "#1565C0",
        "ocean-light": "#1E88E5",
        "ocean-surface": "#42A5F5",
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(180deg, #0B3C6D 0%, #1565C0 50%, #1E88E5 100%)",
        "ocean-button": "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
