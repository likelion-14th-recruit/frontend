import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    Sitemap({
      hostname: "https://likelion14-sogang.co.kr/",
      dynamicRoutes: ["/"],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://likelion-recruit.duckdns.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api 부분을 지우고 전달
      },
    },
  },
});
