/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          brand: '#EC3B79',
        },
        blue: {
          brand: '#1E8ED0',
        },
        softpink: '#FAB0EA',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
