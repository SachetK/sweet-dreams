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
        'pink-dark': '#e1968f',
        'dark-red': '#a64d4d',
        yellow: '#ffe985',
        green: '#abcb99',
        purple: '#d2cad7',
        orange: '#ffc688',
        blue: '#72acae',
        'green-dark': '#7fa867',
        'blue-dark': '#548b8d',
        'purple-dark': '#b4a6bd',
        'orange-dark': '#d8a267',
      },
      clipPath: {
        heading:
          'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
        'button-prev': 'polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%);',
        'button-next': 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%);',
      },
      backgroundImage: {
        main: "url('../../public/background-image.png')",
      },
    },
  },
  plugins: [
    require('tailwind-clip-path'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms'),
  ],
}
