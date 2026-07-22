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
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        body: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}