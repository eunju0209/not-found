/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#2dd4bf',
      },
      minHeight: {
        40: '10rem',
      },
    },
  },
  plugins: [],
};
