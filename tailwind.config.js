/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { xs: "400px" },
      backgroundImage: {
        profileGradient: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
      },
    },
    colors: {
      black: "#000",
      purple: "#633CFF",
      purple_hover: "#BEADFF",
      light_purple: "#EFEBFF",
      dark_grey: "#333333",
      grey: "#737373",
      borders: "#D9D9D9",
      light_grey: "#fafafa",
      white: "#fff",
      red: "#FF3939",
      empty: "#eee",
      transparent: "transparent",
    },
    boxShadow: {
      none: "none",
      input: "0 0 32px rgba(99, 60, 255, .25)",
      section: "0px 8px 24px rgba(149, 157, 165, 0.2)",
      box: "rgba(0, 0, 0, 0.16) 0px 1px 4px inset",
      dropDown: "0 0 32px rgba(0,0,0,.25)",
      remove: "0 2px 0 red",
      layout: "rgba(0, 0, 0, 0.15) 0px 15px 25px inset",
      profileBox: "0 0 32px rgba(0,0,0, 0.15)",
      profileImage:
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
