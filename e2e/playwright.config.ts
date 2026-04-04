import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./specs",
  timeout: 30_000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: "http://localhost:5174",
    viewport: { width: 1400, height: 900 },
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npx vite --port 5174",
    port: 5174,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
