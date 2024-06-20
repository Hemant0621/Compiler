/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx',
    './public/index.html',
    './src/**/*.{html,jsx}',
    './components/**/*.{html,jsx}',
    './pages/**/*.{html,jsx}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-rounded': {
          'scrollbar-color': '#6b7280 #f3f4f6', // thumb color and track color
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-rounded::-webkit-scrollbar': {
          width: '8px',
        },
        '.scrollbar-thumb-rounded::-webkit-scrollbar-thumb': {
          backgroundColor: '#6b7280', // thumb color
          borderRadius: '9999px', // round the thumb
        },
        '.scrollbar-thumb-rounded::-webkit-scrollbar-track': {
          backgroundColor: '#f3f4f6', // track color
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

