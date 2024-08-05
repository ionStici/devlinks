/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
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
    },
  },
  plugins: [],
};
