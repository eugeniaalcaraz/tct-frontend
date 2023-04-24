/// <reference types="vitest" />
import { defineConfig } from "vite";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
 optimizeDeps: {
  esbuildOptions: {
    define: {
      global: "globalThis", //<-- AWS SDK
    },
  },
},
 build: {
  rollupOptions: {
    plugins: [rollupNodePolyFill()],
  },
},
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser", //fix production build
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components/": fileURLToPath(
        new URL("./src/components/", import.meta.url)
      ),
      "@assets/": fileURLToPath(new URL("./src/assets/", import.meta.url)),
    },
  },
  plugins: [react(), eslint()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
  },
});
