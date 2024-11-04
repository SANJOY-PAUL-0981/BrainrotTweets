/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fontPop: ["Poppins", "Arial", "sans-serif"],
        fontRal: ["Raleway", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}