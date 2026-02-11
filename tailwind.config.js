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
          "linear-gradient(180deg, rgba(255,255,255,0.9) 100%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.1) 0%)",
      },
      colors: {
        lightGray: "#F0F0F0",
        black: "#121212",
        white: "#FFFFFF",
        sogang: "#B60005",
        purple: "#0003AC",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 10s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      screens: {
        // 기본(모바일): 375px ~ 768px
        "mobile-lg": "660px",
        md: "769px", // 769px 이상부터 태블릿
        "tablet-lg": "800px",
        lg: "1025px", // 1025px 이상부터 데스크탑
        desktop: "1200px",
      },
    },
  },
  plugins: [],
};
