import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // New tile pop-in
        "tile-new": {
          "0%":   { transform: "scale(0) rotate(-15deg)", opacity: "0" },
          "60%":  { transform: "scale(1.2) rotate(5deg)", opacity: "1" },
          "80%":  { transform: "scale(0.95) rotate(-2deg)" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        // Merge spin+bounce
        "tile-merge": {
          "0%":   { transform: "scale(1) rotate(0deg)" },
          "20%":  { transform: "scale(1.3) rotate(120deg)" },
          "40%":  { transform: "scale(1.5) rotate(240deg)" },
          "60%":  { transform: "scale(1.2) rotate(340deg)" },
          "75%":  { transform: "scale(0.9) rotate(355deg)" },
          "90%":  { transform: "scale(1.1) rotate(360deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
        // Confetti burst particle
        "confetti-burst": {
          "0%":   { transform: "translate(0,0) scale(1)", opacity: "1" },
          "100%": { transform: "translate(var(--tx), var(--ty)) scale(0)", opacity: "0" },
        },
        // Star twinkle
        "twinkle": {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%":       { opacity: "1",   transform: "scale(1.2)" },
        },
        // Pulse ring on win
        "pulse-ring": {
          "0%":   { transform: "scale(0.9)", opacity: "0.8" },
          "50%":  { transform: "scale(1.05)", opacity: "0.4" },
          "100%": { transform: "scale(0.9)", opacity: "0.8" },
        },
        // Overlay fade in
        "overlay-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "tile-new":       "tile-new 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "tile-merge":     "tile-merge 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "confetti-burst": "confetti-burst 1s ease-out forwards",
        "twinkle":        "twinkle 3s ease-in-out infinite",
        "pulse-ring":     "pulse-ring 2s ease-in-out infinite",
        "overlay-in":     "overlay-in 0.35s ease-out forwards",
        "float":          "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
