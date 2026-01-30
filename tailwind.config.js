/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "sans-serif"],
        sogang: ["Sogang", "serif"],
      },
      backgroundImage: {
        "header-dark":
          "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        "header-light":
          "linear-gradient(180deg, rgba(255,255,255,0) 100%, rgba(255,255,255,0.6) 0%)",
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
