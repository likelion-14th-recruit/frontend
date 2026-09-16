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
});
