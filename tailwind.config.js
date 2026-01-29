/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "sans-serif"],
        sogang: ["Sogang", "serif"],
      },
      colors: {
        lightGray: "#F0F0F0",
        black: "#121212",
        white: "#FFFFFF",
        sogang: "#B60005",
      },
    },
  },
  plugins: [],
};
