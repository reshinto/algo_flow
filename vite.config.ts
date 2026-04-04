/**
 * Vite configuration for AlgoFlow.
 * Configures React (SWC), Tailwind CSS v4 plugin, @/ path alias,
 * BASE_URL env var for GitHub Pages deployment, and Vitest (jsdom).
 */
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { fnImportPlugin } from "./vite-plugin-fn-import";

export default defineConfig({
  base: process.env.BASE_URL ?? "/",
  plugins: [fnImportPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    testTimeout: 1000,
    projects: [
      {
        extends: true,
        test: {
          name: "algorithms",
          include: ["src/algorithms/**/*.test.ts"],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "components",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/algorithms/**/*.test.ts"],
          environment: "jsdom",
        },
      },
    ],
  },
});
