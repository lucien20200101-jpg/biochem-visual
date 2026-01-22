import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // In development (Codespaces, dev server): base = /
  // In production (GitHub Pages): base = /biochem-visual/
  const base = mode === "production" ? "/biochem-visual/" : "/";

  return {
    base,
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      strictPort: true,
    },
  };
});
