/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'deep-navy': '#08081a',
        'panel-bg': 'rgba(255,255,255,0.04)',
        'panel-border': 'rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}
