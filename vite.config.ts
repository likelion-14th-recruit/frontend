import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://likelion14-recruit-staging.duckdns.org", // test 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api 부분을 지우고 전달
      },
    },
  },
});
