import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px", // tablet
      lg: "1024px", // laptop
      xl: "1280px", // desktop
      "2xl": "1728px", // ultra wide
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "3rem",
      },
    },
    extend: {
      colors: {
        "matte-black": "var(--color-matte-black)",
        graphite: "var(--color-graphite)",
        "steel-grey": "var(--color-steel-grey)",
        "steel-grey-light": "var(--color-steel-grey-light)",
        white: "var(--color-white)",
        "light-grey": "var(--color-light-grey)",
        cyan: {
          100: "var(--color-cyan-100)",
          300: "var(--color-cyan-300)",
          500: "var(--color-cyan-500)",
          700: "var(--color-cyan-700)",
          900: "var(--color-cyan-900)",
          DEFAULT: "var(--color-cyan-500)",
        },
        blue: {
          100: "var(--color-blue-100)",
          300: "var(--color-blue-300)",
          500: "var(--color-blue-500)",
          700: "var(--color-blue-700)",
          900: "var(--color-blue-900)",
          DEFAULT: "var(--color-blue-500)",
        },
        magenta: {
          100: "var(--color-magenta-100)",
          300: "var(--color-magenta-300)",
          500: "var(--color-magenta-500)",
          700: "var(--color-magenta-700)",
          900: "var(--color-magenta-900)",
          DEFAULT: "var(--color-magenta-500)",
        },
        gold: {
          100: "var(--color-gold-100)",
          300: "var(--color-gold-300)",
          500: "var(--color-gold-500)",
          700: "var(--color-gold-700)",
          900: "var(--color-gold-900)",
          DEFAULT: "var(--color-gold-500)",
        },
        green: {
          500: "var(--color-green-500)",
          700: "var(--color-green-700)",
          900: "var(--color-green-900)",
          DEFAULT: "var(--color-green-500)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        wide: "var(--tracking-wide)",
        widest: "var(--tracking-widest)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        gold: "var(--shadow-gold)",
        cyan: "var(--shadow-cyan)",
        magenta: "var(--shadow-magenta)",
      },
      backdropBlur: {
        glass: "var(--glass-blur)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        enter: "var(--ease-enter)",
        exit: "var(--ease-exit)",
      },
      transitionDuration: {
        instant: "150ms",
        fast: "300ms",
        base: "600ms",
        slow: "1000ms",
        cinematic: "1600ms",
      },
      spacing: {
        "section-mobile": "var(--section-padding-mobile)",
        "section-desktop": "var(--section-padding-desktop)",
      },
      zIndex: {
        canvas: "10",
        content: "20",
        navbar: "50",
        overlay: "80",
        loader: "100",
        modal: "110",
      },
      backgroundImage: {
        "gradient-gold": "var(--gradient-gold)",
        "gradient-cyan-blue": "var(--gradient-cyan-blue)",
        "brushed-steel":
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.2) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
