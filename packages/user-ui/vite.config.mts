import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@job-portal/common/src": resolve(__dirname, "../common/src"),
      "@job-portal/common": resolve(__dirname, "../common/src"),
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3004,
  },
  build: {
    outDir: "build",
  },
});
