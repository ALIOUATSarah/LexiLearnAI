/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      maxWidth: {
        xxs: "16rem",
        xxxs: "12rem",
      },
      animation: {
        "fadeIn": "fadeIn 0.3s ease-out forwards",
        "blob": "blob 7s infinite",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "shrink": "shrink 8s linear forwards",
        "scaffold-fade": "scaffoldFade 1.5s ease-out forwards",
        "progress-pulse": "progressPulse 2s infinite",
        "level-transition": "levelTransition 1s ease-in-out",
        "subtle-pulse": "subtlePulse 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.25s ease-out forwards",
        "support-level-change": "supportLevelChange 1s ease-in-out",
        "logo-float": "logoFloat 3s ease-in-out infinite"
      },
      keyframes: {
        fadeIn: {
          "from": { opacity: "0", transform: "translateY(10px)" },
          "to": { opacity: "1", transform: "translateY(0)" }
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" }
        },
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.5)", opacity: "0.5" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        shrink: {
          "0%": { width: "100%" },
          "100%": { width: "0%" }
        },
        scaffoldFade: {
          "0%": { opacity: "1", height: "100%" },
          "100%": { opacity: "0.3", height: "30%" }
        },
        progressPulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(20, 184, 166, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(20, 184, 166, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(20, 184, 166, 0)" }
        },
        logoFloat: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
          "100%": { transform: "translateY(0px)" }
        }
      }
    },
  },
  plugins: [],
};
