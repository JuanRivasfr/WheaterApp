/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        searchC : "#D0BCFF",
        bgHome : "#F6EDFF",
      },
    },
  },
  plugins: [],
}

