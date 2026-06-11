import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cherry: "#e93d63",
        citrus: "#f6c945",
        mint: "#2fbf9f",
        ink: "#171717",
        cloud: "#f7f8fb"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 23, 23, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
