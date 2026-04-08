/**
 * Automated demo GIF recording for AlgoFlow.
 *
 * Uses Playwright to record a browser session showcasing key features,
 * then converts the WebM output to a high-quality GIF via ffmpeg.
 *
 * Usage:
 *   node scripts/record-demo.mjs            # Record + convert
 *   node scripts/record-demo.mjs --gif-only # Convert existing WebM only
 *
 * Prerequisites:
 *   - ffmpeg installed (brew install ffmpeg)
 *   - Dev server running or auto-started
 */
import { chromium } from "playwright";
import { execFileSync, spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS_DIR = path.join(ROOT_DIR, "docs", "assets");
const WEBM_PATH = path.join(ASSETS_DIR, "demo.webm");
const GIF_PATH = path.join(ASSETS_DIR, "demo.gif");
const PALETTE_PATH = path.join(ASSETS_DIR, "palette.png");

const GIF_ONLY = process.argv.includes("--gif-only");

// ── Preflight checks ────────────────────────────────────────────────────────

function checkFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
  } catch {
    console.error("ffmpeg not found. Install with: brew install ffmpeg");
    process.exit(1);
  }
}

// ── Server utilities ───────────────────────────────────────────────────────

function isReachable(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        res.resume();
        resolve(true);
      })
      .on("error", () => resolve(false));
  });
}

async function ensureServer() {
  const ports = [5173, 5174, 5175, 5176];
  for (const port of ports) {
    if (await isReachable(`http://localhost:${port}`)) {
      return { url: `http://localhost:${port}`, serverProcess: null };
    }
  }

  console.log("No dev server found. Starting one...");
  const serverProcess = spawn("npx", ["vite", "--port", "5174"], {
    cwd: ROOT_DIR,
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

// ── Browser helpers ─────────────────────────────────────────────────────────

async function selectAlgorithm(page, name) {
  const selectorBtn = page.locator("button[aria-label='Search algorithms']");
  await selectorBtn.click();
  await page.waitForSelector("[role='dialog']", { timeout: 3000 });

  const searchInput = page.locator("#algo-search-input");
  await searchInput.fill(name.slice(0, 10));

  const optionBtn = page.locator("[role='dialog'] button").filter({ hasText: name }).first();
  await optionBtn.waitFor({ timeout: 3000 });
  await optionBtn.click();

  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 4000 });
  await page
    .locator("span")
    .filter({ hasText: /^\d+ \/ \d+$/ })
    .first()
    .waitFor({ timeout: 5000 });
}

async function waitMs(page, milliseconds) {
  await page.waitForTimeout(milliseconds);
}

async function playFor(page, durationMs) {
  const playBtn = page.locator("button[aria-label='Play']");
  await playBtn.click();
  await waitMs(page, durationMs);
  const pauseBtn = page.locator("button[aria-label='Pause']");
  await pauseBtn.click();
  await waitMs(page, 200);
}

// ── Demo scenario ───────────────────────────────────────────────────────────

async function runDemoScenario(page) {
  // Scene 1: Bubble Sort — array bar chart + code highlighting
  console.log("  Scene 1: Bubble Sort with bar chart visualization...");
  await waitMs(page, 400);
  await playFor(page, 1800);

  // Scene 2: Step-by-step control
  console.log("  Scene 2: Step-by-step control...");
  const resetBtn = page.locator("button[aria-label='Reset']");
  await resetBtn.click();
  await waitMs(page, 200);
  const stepFwdBtn = page.locator("button[aria-label='Step forward']");
  for (let stepIndex = 0; stepIndex < 3; stepIndex++) {
    await stepFwdBtn.click();
    await waitMs(page, 350);
  }

  // Scene 3: Dijkstra — grid pathfinding wavefront
  console.log("  Scene 3: Dijkstra pathfinding wavefront...");
  await selectAlgorithm(page, "Dijkstra's Algorithm");
  await waitMs(page, 300);
  await playFor(page, 2200);

  // Scene 4: BST In-Order — tree visualization
  console.log("  Scene 4: BST In-Order tree traversal...");
  await selectAlgorithm(page, "BST In-Order Traversal");
  await waitMs(page, 300);
  await playFor(page, 1500);

  // Scene 5: BFS — graph traversal
  console.log("  Scene 5: BFS graph traversal...");
  await selectAlgorithm(page, "Breadth-First Search");
  await waitMs(page, 300);
  await playFor(page, 1500);

  await waitMs(page, 200);
}

// ── Recording ───────────────────────────────────────────────────────────────

async function recordDemo(baseUrl) {
  console.log("\nRecording demo...");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: ASSETS_DIR, size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 8000 });
  await waitMs(page, 800);

  await runDemoScenario(page);

  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  if (fs.existsSync(videoPath) && videoPath !== WEBM_PATH) {
    fs.renameSync(videoPath, WEBM_PATH);
  }

  console.log(`WebM recorded: ${WEBM_PATH}`);
  const webmSize = fs.statSync(WEBM_PATH).size;
  console.log(`WebM size: ${(webmSize / 1024 / 1024).toFixed(2)} MB`);
}

// ── Conversion ──────────────────────────────────────────────────────────────

function convertToGif() {
  if (!fs.existsSync(WEBM_PATH)) {
    console.error(`WebM not found at ${WEBM_PATH}. Run without --gif-only first.`);
    process.exit(1);
  }

  console.log("\nConverting to GIF (two-pass palette)...");

  // Pass 1: generate optimal palette
  console.log("  Pass 1: Generating palette...");
  execFileSync("ffmpeg", [
    "-y",
    "-i",
    WEBM_PATH,
    "-vf",
    "fps=12,scale=640:-1:flags=lanczos,palettegen",
    PALETTE_PATH,
  ]);

  // Pass 2: apply palette for high-quality GIF
  console.log("  Pass 2: Rendering GIF...");
  execFileSync("ffmpeg", [
    "-y",
    "-i",
    WEBM_PATH,
    "-i",
    PALETTE_PATH,
    "-lavfi",
    "fps=12,scale=640:-1:flags=lanczos [x]; [x][1:v] paletteuse",
    GIF_PATH,
  ]);

  // Cleanup intermediates
  if (fs.existsSync(PALETTE_PATH)) fs.unlinkSync(PALETTE_PATH);
  if (fs.existsSync(WEBM_PATH)) fs.unlinkSync(WEBM_PATH);

  const gifSize = fs.statSync(GIF_PATH).size;
  console.log(`\nGIF created: ${GIF_PATH}`);
  console.log(`GIF size: ${(gifSize / 1024 / 1024).toFixed(2)} MB`);

  if (gifSize > 5 * 1024 * 1024) {
    console.warn("Warning: GIF exceeds 5MB. Consider reducing duration or resolution.");
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

checkFfmpeg();
fs.mkdirSync(ASSETS_DIR, { recursive: true });

let serverProcess = null;

if (!GIF_ONLY) {
  const server = await ensureServer();
  serverProcess = server.serverProcess;
  await recordDemo(server.url);
}

convertToGif();

if (serverProcess) {
  serverProcess.kill();
  console.log("Dev server stopped.");
}

// Clean up any remaining WebM files in assets dir
const remainingWebm = fs.readdirSync(ASSETS_DIR).filter((fileName) => fileName.endsWith(".webm"));
for (const fileName of remainingWebm) {
  fs.unlinkSync(path.join(ASSETS_DIR, fileName));
}

console.log("\nDone! Demo GIF at docs/assets/demo.gif");
