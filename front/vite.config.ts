import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const backendHost = process.env.VITE_BACKEND_HOST || "127.0.0.1";
const backendPort = process.env.VITE_BACKEND_PORT || "2024";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": { target: `http://${backendHost}:${backendPort}`, changeOrigin: true },
      "/image": { target: `http://${backendHost}:${backendPort}`, changeOrigin: true },
    },
  },
});
