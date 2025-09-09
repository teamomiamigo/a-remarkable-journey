import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f8fafc",        // paper
        ink: "#0b1220",       // text
        sub: "#3b485e",       // secondary text
        sky: {
          50:  "#eff8ff",
          100: "#dbeafe",
          300: "#7dd3fc",
          500: "#38bdf8",
          600: "#0ea5e9"
        }
      },
      fontFamily: { 
        sans: ["'Red Hat Text'", "system-ui", "sans-serif"] 
      }
    },
  },
  plugins: [],
} satisfies Config
