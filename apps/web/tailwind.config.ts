import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#11D7F5",
          ink: "#071115",
          panel: "#101B21",
          mist: "#D9FBFF"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(17, 215, 245, 0.24), 0 18px 50px rgba(17, 215, 245, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
