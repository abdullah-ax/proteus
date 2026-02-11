import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
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
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        wave: "wave 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0) scaleY(1)" },
          "50%": { transform: "translateY(-8px) scaleY(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
