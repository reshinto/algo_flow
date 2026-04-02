import { chromium } from "playwright";
import { setupEnvironment } from "./utils/setup.mjs";
import { log, check, results, PASS, FAIL } from "./utils/logger.mjs";
import { discoverAlgorithms } from "./utils/discovery.mjs";
import { selectAlgorithm, getStepIndex, waitForStepChange } from "./utils/dom-helpers.mjs";
import {
  testPlayback,
  testLanguageTabs,
  testEducationalDrawer,
  testKeyboard,
} from "./suites/core-ui.mjs";
import { inputTests } from "./data/inputs.mjs";

const { url: BASE_URL, serverProcess } = await setupEnvironment();

// ── MAIN ──────────────────────────────────────────────────────────────────────
const headless = !process.argv.includes("-H");
const browser = await chromium.launch({ headless, slowMo: headless ? 0 : 50 });
const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await context.newPage();

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(`PAGE ERROR: ${err.message}`));

console.log("\n━━━ Page Load ━━━");
await check("App loads at localhost", async () => {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 8000 });
});
await check("Title is set", async () => {
  if (!(await page.title())) throw new Error("no title");
});
await check("AlgoFlow h1 visible", async () => {
  await page.waitForSelector("h1:has-text('AlgoFlow')", { timeout: 3000 });
});

console.log("\n━━━ Command Palette ━━━");
await check("Opens on button click", async () => {
  await page.click("button[aria-label='Search algorithms']");
  await page.waitForSelector("[role='dialog']", { timeout: 3000 });
});
await check("Search input auto-focused", async () => {
  const focused = await page.$eval("#algo-search-input", (el) => document.activeElement === el);
  if (!focused) throw new Error("search input not focused");
});
await check("Filtering works (type 'breadth')", async () => {
  await page.fill("#algo-search-input", "breadth");
  const btn = page
    .locator("[role='dialog'] button")
    .filter({ hasText: "Breadth-First Search" })
    .first();
  await btn.waitFor({ timeout: 2000 });
});
await check("Closes via X button", async () => {
  await page.click("button[aria-label='Close command palette']");
  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 3000 });
});
await check("Opens again and closes via backdrop", async () => {
  await page.click("button[aria-label='Search algorithms']");
  await page.waitForSelector("[role='dialog']", { timeout: 3000 });
  await page.mouse.click(50, 50);
  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 3000 });
});

const { allAlgorithms: algorithms, representativeSet } = discoverAlgorithms();
console.log(
  `\nDiscovered ${algorithms.length} algorithms (${representativeSet.size} representatives)`,
);

let currentAlgorithm = null;
for (const algo of algorithms) {
  console.log(`\n━━━ ${algo} ━━━`);
  const selected = await check(`Select "${algo}"`, async () => {
    await selectAlgorithm(page, algo);
    currentAlgorithm = algo;
    const stepInfo = await getStepIndex(page);
    if (!stepInfo || stepInfo.total === 0) throw new Error("No steps generated");
  });

  if (selected && representativeSet.has(algo)) {
    await testPlayback(page, algo);
    await testLanguageTabs(page, algo);
    await testKeyboard(page, algo);
    await testEducationalDrawer(page, algo);
  }
}

console.log("\n━━━ Input Editors ━━━");
for (const { algo, test } of inputTests) {
  await check(`${algo}: input editor interaction`, async () => {
    if (currentAlgorithm !== algo) {
      await selectAlgorithm(page, algo);
      currentAlgorithm = algo;
    }
    await test(page);
  });
}

// ── Dijkstra grid
console.log("\n━━━ Dijkstra Grid ━━━");
await check("Grid cells render", async () => {
  await selectAlgorithm(page, "Dijkstra's Algorithm");
  const cells = page.locator("[class*='grid'] > div");
  await cells.first().waitFor({ timeout: 5000 });
  const count = await cells.count();
  if (count < 30) throw new Error(`Only ${count} cells`);
});

// ── Progress scrub
console.log("\n━━━ Progress Bar Scrub ━━━");
await check("Scrub to 50% of Bubble Sort", async () => {
  await selectAlgorithm(page, "Bubble Sort");
  const bar = page.locator("input[type='range'][aria-label='Playback progress']");
  await bar.waitFor({ timeout: 3000 });
  const box = await bar.boundingBox();
  await page.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
});

// ── Speed controls
console.log("\n━━━ Speed Controls ━━━");
const speedSelect = page.locator("select[aria-label='Playback speed']");
await check("Speed: select 2x", async () => {
  await speedSelect.selectOption({ value: "2" });
});

// ── Mobile layout
console.log("\n━━━ Mobile Layout ━━━");
await check("Mobile layout renders at 375px", async () => {
  await page.setViewportSize({ width: 375, height: 812 });
  const vizTab = page.locator("[role='tab']").filter({ hasText: "Visualize" });
  await vizTab.waitFor({ timeout: 3000 });
});
await page.setViewportSize({ width: 1400, height: 900 });

console.log("\n━━━ Browser Console Errors ━━━");
const reactErrors = consoleErrors.filter(
  (e) => !e.includes("ResizeObserver") && !e.includes("favicon") && !e.includes("chunk"),
);
if (reactErrors.length === 0) {
  log(PASS, "Zero console errors");
} else {
  for (const err of reactErrors) log(FAIL, `Console error: ${err.slice(0, 120)}`);
}

const passed = results.filter((r) => r.pass).length;
const failed = results.filter((r) => !r.pass).length;
const total = passed + failed;
console.log("\n" + "═".repeat(70));
console.log(`RESULT: ${passed}/${total} passed, ${failed} failed`);
if (failed > 0) {
  console.log("\nFailed checks:");
  results.filter((r) => !r.pass).forEach((r) => console.log(" ", r.text));
}
console.log("═".repeat(70));

await browser.close();
if (serverProcess) {
  serverProcess.kill();
  console.log("Dev server stopped.");
}
process.exit(failed > 0 ? 1 : 0);
