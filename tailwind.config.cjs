/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,sass,css,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1C8B6A',
        'gradient-top': '#35A483FF',
        'gradient-bottom': '#077854FF',
        'orange': '#FFB800',
        'black': '#424242',
        'gray': '#B7B7B7',
        'bg': '#F0F0F0',
      },
      spacing: {
        '15': '60px',
        '18': '72px',
        '19': '76px',
      },
    },
  },
  plugins: [],
}
