import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/biochem-visual/",
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  plugins: [react()],
}));
