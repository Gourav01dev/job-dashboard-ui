/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkGray:'#131415',
        backgroundBlack:'#ffffff',
        zincDark:'#2D3237',
        textGray:'#B3B3B3',
        Primary: '#EEF4F5',
        Secondary: '#BCC2C3'

      }
    },
  },
  plugins: [],
}

