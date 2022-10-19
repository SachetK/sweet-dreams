/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#bbe3e2',
        white: '#f6f3e4',
        red: '#e68e87',
        pink: '#fac0bb',
        'dark-red': '#a64d4d',
      },
    },
  },
  plugins: [
    require('tailwind-clip-path'),
  ],
}
