import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
