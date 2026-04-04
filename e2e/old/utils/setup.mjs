import { chromium } from "playwright";
import { execSync, spawn } from "node:child_process";
import http from "node:http";

export function isReachable(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        res.resume();
        resolve(true);
      })
      .on("error", () => resolve(false));
  });
}

export async function ensureServer() {
  const ports = [5173, 5174, 5175, 5176];
  for (const port of ports) {
    if (await isReachable(`http://localhost:${port}`)) {
      return { url: `http://localhost:${port}`, serverProcess: null };
    }
  }

  console.log("No dev server found. Starting one...");
  const serverProcess = spawn("npx", ["vite", "--port", "5174"], {
    stdio: "ignore",
    detached: true,
  });

  const targetUrl = "http://localhost:5174";
  for (let attempt = 0; attempt < 60; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (await isReachable(targetUrl)) {
      console.log("Dev server started on port 5174.");
      return { url: targetUrl, serverProcess };
    }
  }

  serverProcess.kill();
  throw new Error("Dev server did not start within 30s");
}

export function ensureBrowsers() {
  try {
    execSync("npx playwright install --with-deps chromium", { stdio: "inherit" });
  } catch {
    throw new Error("Failed to install Playwright browsers");
  }
}

export async function setupEnvironment() {
  try {
    await chromium.launch({ headless: true }).then((b) => b.close());
  } catch {
    console.log("Playwright browsers not found. Installing...");
    ensureBrowsers();
  }
  return await ensureServer();
}
