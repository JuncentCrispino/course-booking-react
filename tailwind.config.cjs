/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EEF2FF',
        secondary: '#CDDEFF',
        hb: '#676FA3',
        cb: '#FFE69A',
        ha2: '#FFD24C'
      },
      boxShadow: {
        'shadow-1': '0 2px 20px hsla(0, 0%, 0%, 0.06)'
      },
      outlineColor: {
        hb: '#676FA3',
        cb: '#FFE69A',
        ha2: '#FFD24C'
      }
    }
  },
  plugins: []
};
