/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { screens: { xs: '400px' } },
    fontFamily: { serif: ['Instrument Sans', 'sans-serif'] },
    colors: {
      black: '#000',
      purple: '#633CFF',
      'purple-hover': '#BEADFF',
      'purple-light': '#EFEBFF',
      'dark-grey': '#333',
      grey: '#737373',
      'grey-light': '#FAFAFA',
      borders: '#D9D9D9',
      white: '#FFF',
      red: '#FF3939',
      empty: '#EEE',
      transparent: 'transparent',
    },
    boxShadow: {
      none: 'none',
      input: '0 0 32px rgba(99, 60, 255, .25)',
      section: '0px 8px 24px rgba(149, 157, 165, 0.2)',
      box: 'rgba(0, 0, 0, 0.16) 0px 1px 4px inset',
      dropDown: '0 0 32px rgba(0,0,0,.25)',
      remove: '0 2px 0 red',
      layout: 'rgba(0, 0, 0, 0.15) 0px 15px 25px inset',
      profileBox: '0 0 32px rgba(0,0,0, 0.15)',
      profileImage:
        'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
};
