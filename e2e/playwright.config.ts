import { defineConfig } from "@playwright/test";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const isCI = !!process.env.CI;
const configDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(configDir, "..");
const viteBin = resolve(rootDir, "node_modules/vite/bin/vite.js");

export default defineConfig({
  testDir: "./specs",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : "75%",
  globalTimeout: isCI ? 600_000 : undefined,
  reporter: isCI ? [["github"], ["list"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: "http://localhost:5174",
    viewport: { width: 1400, height: 900 },
    video: isCI ? "off" : "retain-on-failure",
    screenshot: "only-on-failure",
    trace: isCI ? "off" : "on-first-retry",
  },
  webServer: {
    command: isCI ? `node ${viteBin} preview --port 5174` : `node ${viteBin} --port 5174`,
    port: 5174,
    reuseExistingServer: !isCI,
    timeout: 60_000,
    cwd: rootDir,
  },
});
