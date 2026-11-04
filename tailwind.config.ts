import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#123F49",
          orange: "#F58A2B",
          seafoam: "#A9D3C5",
          ivory: "#F8F5ED",
          muted: "#52666B",
          darkCanvas: "#0C2229",
          darkSurface: "#14343D",
          darkMuted: "#BDD0CF",
          darkAccent: "#FFA65E",
        },
        module: {
          social: "#A84C18",
          updates: "#2867AA",
          bugs: "#A44963",
          checklists: "#28735C",
          workboard: "#6D54A1",
          team: "#356F86",
          agent: "#746119",
          operations: "#536E76",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
