/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#bbe3e2',
        white: '#f6f3e4',
        red: '#d4584d',
        pink: '#fac0bb',
        yellow: '#ffe985',
        'pink-dark': '#e1968f',
        'dark-red': '#a64d4d',
        'green-dark': '#7fa867',
        'blue-dark': '#548b8d',
        'purple-dark': '#b4a6bd',
        'orange-dark': '#d8a267',
      },
      clipPath: {
        heading:
          'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
      },
      backgroundImage: {
        main: "url('../../public/background-image.png')",
      },
    },
  },
  plugins: [require('tailwind-clip-path'), require('tailwind-scrollbar-hide')],
}
