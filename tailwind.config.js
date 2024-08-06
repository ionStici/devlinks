/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      revert: "revert",
    },
    colors: {
      purple: "#633CFF",
      purple_hover: "#BEADFF",
      light_purple: "#EFEBFF",
      dark_grey: "#333333",
      grey: "#737373",
      borders: "#D9D9D9",
      light_grey: "#fafafa",
      white: "#fff",
      red: "#FF3939",
      transparent: "transparent",
    },
    boxShadow: {
      input: "0 0 32px rgba(99, 60, 255, .25)",
      section: "0px 8px 24px rgba(149, 157, 165, 0.2)",
      none: "none",
    },
  },
  plugins: [],
};
