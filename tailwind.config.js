/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulseWhite: {
          "0%": {
            transform: "scale(0.9)",
            boxShadow: "0 0 0 0 rgba(226, 228, 234, 0.7)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 25px rgba(255, 82, 82, 0)",
          },
          "100%": {
            transform: "scale(0.9)",
            boxShadow: "0 0 0 0 rgba(255, 82, 82, 0)",
          },
        },
      },
      animation: {
        pulseWhite: "pulseWhite 1.5s infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
