/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#E85A1D',
          'primary-hover': '#D1490F',
          hover: '#D1490F',
        },
        surface: {
          burgundy: '#2A080C',
          charcoal: '#121212',
          cream: '#FDFBF7',
        },
        text: {
          light: '#FDFBF7',
          dark: '#121212',
          muted: '#78716C',
        },
        fondo: {
          'sec-1': '#2A080C',
          'sec-2': '#121212',
          'sec-3': '#FDFBF7',
        },
        texto: {
          oscuro: '#FDFBF7',
          claro: '#121212',
          secundario: '#78716C',
        },
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        body: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}