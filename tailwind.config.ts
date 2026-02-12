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
        "ocean-gradient": "linear-gradient(180deg, #0B3C6D 0%, #1565C0 40%, #1E88E5 100%)",
        "ocean-button": "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wave: {
          "0%": { transform: "translateX(0) translateZ(0) scaleY(1)" },
          "50%": { transform: "translateX(-25%) translateZ(0) scaleY(0.55)" },
          "100%": { transform: "translateX(-50%) translateZ(0) scaleY(1)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        wave: "wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
