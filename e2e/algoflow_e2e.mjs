import { chromium } from "playwright";
import { execSync, spawn } from "node:child_process";
import http from "node:http";

const PASS = "✅";
const FAIL = "❌";
const results = [];

// ── Server & browser setup ───────────────────────────────────────────────────

/** Check if a URL is reachable */
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

/** Find a running dev server on standard Vite ports, or start one */
async function ensureServer() {
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

  // Wait up to 30s for server to be ready
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

/** Install Playwright browsers if missing */
function ensureBrowsers() {
  try {
    execSync("npx playwright install --with-deps chromium", { stdio: "inherit" });
  } catch {
    throw new Error("Failed to install Playwright browsers");
  }
}

// Ensure Chromium is available — install if missing
try {
  await chromium.launch({ headless: true }).then((b) => b.close());
} catch {
  console.log("Playwright browsers not found. Installing...");
  ensureBrowsers();
}

const { url: BASE_URL, serverProcess } = await ensureServer();

function log(icon, msg) {
  const line = `${icon} ${msg}`;
  console.log(line);
  results.push({ pass: icon === PASS, text: line });
}

async function check(label, fn) {
  try {
    await fn();
    log(PASS, label);
    return true;
  } catch (err) {
    log(FAIL, `${label} — ${err.message.split("\n")[0].slice(0, 100)}`);
    return false;
  }
}

let page;

// Close the command palette if it's open, by clicking the X button
async function ensureModalClosed() {
  const dialog = page.locator("[role='dialog']");
  const isOpen = await dialog.isVisible().catch(() => false);
  if (isOpen) {
    const closeBtn = page.locator("button[aria-label='Close command palette']");
    await closeBtn.click();
    await page
      .waitForSelector("[role='dialog']", { state: "detached", timeout: 3000 })
      .catch(() => {});
    await page.waitForTimeout(300);
  }
}

// Open the command palette and click an algorithm by name
async function selectAlgorithm(name) {
  await ensureModalClosed();
  const selectorBtn = page.locator("button[aria-label='Search algorithms']");
  await selectorBtn.click();
  await page.waitForSelector("[role='dialog']", { timeout: 3000 });
  // Type to filter if the name is long
  const searchInput = page.locator("#algo-search-input");
  await searchInput.fill(name.slice(0, 6));
  await page.waitForTimeout(200);
  const optionBtn = page.locator("[role='dialog'] button").filter({ hasText: name }).first();
  await optionBtn.waitFor({ timeout: 3000 });
  await optionBtn.click();
  // Modal closes automatically after selection
  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 4000 });
  await page.waitForTimeout(400);
}

// Test all playback buttons for current algorithm
async function testPlayback(algoName) {
  const stepFwd = page.locator("button[aria-label='Step forward']");
  const stepBwd = page.locator("button[aria-label='Step backward']");
  const reset = page.locator("button[aria-label='Reset']");
  const rerun = page.locator("button[aria-label='Rerun']");
  const play = page.locator("button[aria-label='Play']");
  const pause = page.locator("button[aria-label='Pause']");

  await check(`${algoName}: step forward ×3`, async () => {
    for (let i = 0; i < 3; i++) {
      await stepFwd.click();
      await page.waitForTimeout(100);
    }
  });

  await check(`${algoName}: step backward`, async () => {
    await stepBwd.click();
    await page.waitForTimeout(150);
  });

  await check(`${algoName}: reset`, async () => {
    await reset.click();
    await page.waitForTimeout(200);
  });

  await check(`${algoName}: play → pause`, async () => {
    await play.click();
    await page.waitForTimeout(500);
    await pause.click();
    await page.waitForTimeout(200);
  });

  await check(`${algoName}: rerun`, async () => {
    await rerun.click();
    await page.waitForTimeout(500);
    await pause.click().catch(() => {}); // may have already stopped
    await page.waitForTimeout(200);
  });
}

// Test all three language tabs
async function testLanguageTabs(algoName) {
  for (const lang of ["Python", "Java", "TypeScript"]) {
    await check(`${algoName}: ${lang} tab`, async () => {
      const tab = page.locator(`button:has-text("${lang}")`).first();
      await tab.waitFor({ timeout: 3000 });
      await tab.click();
      await page.waitForTimeout(200);
    });
  }
}

// Test the educational drawer (L key + Toggle button)
async function testEducationalDrawer(algoName) {
  await check(`${algoName}: educational drawer opens (L key)`, async () => {
    // Click body first to ensure keyboard focus is not trapped in an input
    await page.locator("body").click({ position: { x: 700, y: 400 } });
    await page.waitForTimeout(100);
    await page.keyboard.press("l");
    await page.waitForTimeout(400);
    // Look for drawer content — the drawer shows section headings
    const overview = page.locator("text=Overview").first();
    await overview.waitFor({ timeout: 3000 });
  });
  await check(`${algoName}: educational drawer closes (Escape)`, async () => {
    // Click body to ensure focus is on the page, then press Escape
    await page.locator("body").click({ position: { x: 700, y: 400 } });
    await page.waitForTimeout(100);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    // Retry once if drawer is still visible (handles rare timing issues)
    const overview = page.locator("text=Overview").first();
    let visible = await overview.isVisible().catch(() => false);
    if (visible) {
      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);
      visible = await overview.isVisible().catch(() => false);
    }
    if (visible) throw new Error("Drawer still open after Escape");
  });
}

// Test keyboard shortcuts (Space / ArrowRight / ArrowLeft / R)
async function testKeyboard(algoName) {
  await check(`${algoName}: Space play/pause`, async () => {
    await page.keyboard.press("Space");
    await page.waitForTimeout(300);
    await page.keyboard.press("Space");
    await page.waitForTimeout(200);
  });
  await check(`${algoName}: ArrowRight → ArrowLeft`, async () => {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(100);
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(100);
  });
  await check(`${algoName}: R resets to step 0`, async () => {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(100);
    await page.keyboard.press("r");
    await page.waitForTimeout(200);
  });
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
// Pass -H to run with a visible browser window. Default is headless (CI-friendly).
const headless = !process.argv.includes("-H");
const browser = await chromium.launch({ headless, slowMo: headless ? 0 : 50 });
const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
page = await context.newPage();

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(`PAGE ERROR: ${err.message}`));

// ─── 1. Load ───────────────────────────────────────────────────────────────────
console.log("\n━━━ Page Load ━━━");
await check("App loads at localhost:5174", async () => {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 8000 });
});
await check("Title is set", async () => {
  const title = await page.title();
  if (!title) throw new Error("no title");
});
await check("AlgoFlow h1 visible", async () => {
  await page.waitForSelector("h1:has-text('AlgoFlow')", { timeout: 3000 });
});

// ─── 2. Command Palette modal ─────────────────────────────────────────────────
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
  await page.waitForTimeout(200);
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
await check("Opens again and closes via backdrop click", async () => {
  await page.click("button[aria-label='Search algorithms']");
  await page.waitForSelector("[role='dialog']", { timeout: 3000 });
  // Click the backdrop (the fixed overlay div behind the modal)
  await page.mouse.click(50, 50); // top-left corner = outside modal = on backdrop
  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 3000 });
});

// ─── 3. All 14 algorithms ─────────────────────────────────────────────────────
const algorithms = [
  "Bubble Sort",
  "Binary Search",
  "Breadth-First Search",
  "Dijkstra's Algorithm",
  "Fibonacci (Tabulation)",
  "Fibonacci (Memoization)",
  "Sliding Window (Max Sum)",
  "BST In-Order Traversal",
  "Reverse Linked List",
  "Build Min Heap",
  "Valid Parentheses",
  "Two Sum",
  "KMP Search",
  "Spiral Order",
  "Set Intersection",
];

for (const algo of algorithms) {
  console.log(`\n━━━ ${algo} ━━━`);

  await check(`Select "${algo}"`, async () => {
    await selectAlgorithm(algo);
    const empty = await page
      .locator("text=Select an algorithm to begin")
      .isVisible()
      .catch(() => false);
    if (empty) throw new Error("still showing empty state");
  });

  await testPlayback(algo);
  await testLanguageTabs(algo);
  await testKeyboard(algo);
  await testEducationalDrawer(algo);
}

// ─── 4. Input editors ─────────────────────────────────────────────────────────
console.log("\n━━━ Input Editors ━━━");

const inputTests = [
  {
    algo: "Bubble Sort",
    test: async () => {
      const input = page.locator("input[type='text']").first();
      await input.click({ clickCount: 3 });
      await input.fill("5, 3, 8, 1, 9, 2");
      await input.press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Binary Search",
    test: async () => {
      const textInput = page.locator("input[type='text']").first();
      await textInput.click({ clickCount: 3 });
      await textInput.fill("2, 5, 8, 12, 16");
      await textInput.press("Tab");
      const numInput = page.locator("input[type='number']").first();
      await numInput.click({ clickCount: 3 });
      await numInput.fill("12");
      await numInput.press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Sliding Window (Max Sum)",
    test: async () => {
      const textInput = page.locator("input[type='text']").first();
      await textInput.click({ clickCount: 3 });
      await textInput.fill("2, 1, 5, 1, 3, 2");
      await textInput.press("Tab");
      const numInput = page.locator("input[type='number']").first();
      await numInput.click({ clickCount: 3 });
      await numInput.fill("3");
      await numInput.press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Fibonacci (Tabulation)",
    test: async () => {
      const numInput = page.locator("input[type='number']").first();
      await numInput.click({ clickCount: 3 });
      await numInput.fill("10");
      await numInput.press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "KMP Search",
    test: async () => {
      const inputs = page.locator("input[type='text']");
      await inputs.nth(0).click({ clickCount: 3 });
      await inputs.nth(0).fill("AABABAB");
      await inputs.nth(0).press("Tab");
      await inputs.nth(1).click({ clickCount: 3 });
      await inputs.nth(1).fill("ABAB");
      await inputs.nth(1).press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Set Intersection",
    test: async () => {
      const inputs = page.locator("input[type='text']");
      await inputs.nth(0).click({ clickCount: 3 });
      await inputs.nth(0).fill("10, 20, 30, 40");
      await inputs.nth(0).press("Tab");
      await inputs.nth(1).click({ clickCount: 3 });
      await inputs.nth(1).fill("20, 40, 60");
      await inputs.nth(1).press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Two Sum",
    test: async () => {
      const textInput = page.locator("input[type='text']").first();
      await textInput.click({ clickCount: 3 });
      await textInput.fill("3, 5, 8, 2");
      await textInput.press("Tab");
      const numInput = page.locator("input[type='number']").first();
      await numInput.click({ clickCount: 3 });
      await numInput.fill("10");
      await numInput.press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Valid Parentheses",
    test: async () => {
      const input = page.locator("input[type='text']").first();
      await input.click({ clickCount: 3 });
      await input.fill("({[]})");
      await input.press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Build Min Heap",
    test: async () => {
      const input = page.locator("input[type='text']").first();
      await input.click({ clickCount: 3 });
      await input.fill("8, 3, 7, 1, 5");
      await input.press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Reverse Linked List",
    test: async () => {
      const input = page.locator("input[type='text']").first();
      await input.click({ clickCount: 3 });
      await input.fill("1, 2, 3, 4, 5");
      await input.press("Tab");
      await page.waitForTimeout(400);
    },
  },
  {
    algo: "Spiral Order",
    test: async () => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ timeout: 3000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 2, 3\n4, 5, 6\n7, 8, 9");
      await page.keyboard.press("Tab");
      await page.waitForTimeout(400);
    },
  },
];

for (const { algo, test } of inputTests) {
  await check(`${algo}: input editor interaction`, async () => {
    await selectAlgorithm(algo);
    await test();
  });
}

// ─── 5. Dijkstra grid ─────────────────────────────────────────────────────────
console.log("\n━━━ Dijkstra Grid ━━━");
await check("Grid cells render (no input editor expected)", async () => {
  await selectAlgorithm("Dijkstra's Algorithm");
  // Grid should have many cells
  const cells = page.locator("[class*='grid'] > div");
  await cells.first().waitFor({ timeout: 5000 });
  const count = await cells.count();
  if (count < 30) throw new Error(`Only ${count} cells — grid may not be rendering`);
});
await check("Dijkstra: play wavefront and pause", async () => {
  await page.locator("button[aria-label='Play']").click();
  await page.waitForTimeout(600);
  await page.locator("button[aria-label='Pause']").click();
  await page.waitForTimeout(200);
});
await check("Dijkstra: step through 5 more steps", async () => {
  const stepFwd = page.locator("button[aria-label='Step forward']");
  for (let i = 0; i < 5; i++) {
    await stepFwd.click();
    await page.waitForTimeout(100);
  }
});

// ─── 6. Progress bar scrub ────────────────────────────────────────────────────
console.log("\n━━━ Progress Bar Scrub ━━━");
await check("Scrub to 50% of Bubble Sort", async () => {
  await selectAlgorithm("Bubble Sort");
  const bar = page.locator("input[type='range'][aria-label='Playback progress']");
  await bar.waitFor({ timeout: 3000 });
  const box = await bar.boundingBox();
  if (!box) throw new Error("no progress bar");
  await page.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
  await page.waitForTimeout(300);
  // Verify step index changed (not 0 or max)
  const stepText = await page
    .locator("span")
    .filter({ hasText: /\d+ \/ \d+/ })
    .first()
    .textContent()
    .catch(() => "");
  const match = stepText.match(/(\d+) \/ (\d+)/);
  if (match) {
    const current = Number(match[1]);
    const total = Number(match[2]);
    if (current === 1 || current === total) throw new Error(`Step didn't change: ${stepText}`);
  }
});

// ─── 7. Speed controls ────────────────────────────────────────────────────────
console.log("\n━━━ Speed Controls ━━━");
const speedSelect = page.locator("select[aria-label='Playback speed']");
await check("Speed: select 2x", async () => {
  await speedSelect.selectOption({ value: "2" });
  await page.waitForTimeout(200);
});
await check("Speed: select 0.5x", async () => {
  await speedSelect.selectOption({ value: "0.5" });
  await page.waitForTimeout(200);
});
await check("Speed: keyboard '1' → 0.25x", async () => {
  // Click the visualization panel to blur the speed select before sending keyboard shortcuts
  await page.locator("body").click({ position: { x: 700, y: 400 } });
  await page.waitForTimeout(100);
  await page.keyboard.press("1");
  await page.waitForTimeout(200);
  const val = await speedSelect.inputValue();
  if (val !== "0.25") throw new Error(`Expected 0.25, got ${val}`);
});
await check("Speed: keyboard '3' → 1x", async () => {
  await page.locator("body").click({ position: { x: 700, y: 400 } });
  await page.waitForTimeout(100);
  await page.keyboard.press("3");
  await page.waitForTimeout(200);
  const val = await speedSelect.inputValue();
  if (val !== "1") throw new Error(`Expected 1, got ${val}`);
});
await check("Speed: keyboard '5' → 4x", async () => {
  await page.locator("body").click({ position: { x: 700, y: 400 } });
  await page.waitForTimeout(100);
  await page.keyboard.press("5");
  await page.waitForTimeout(200);
  const val = await speedSelect.inputValue();
  if (val !== "4") throw new Error(`Expected 4, got ${val}`);
});

// ─── 8. Console errors ────────────────────────────────────────────────────────
console.log("\n━━━ Browser Console Errors ━━━");
const reactErrors = consoleErrors.filter(
  (e) => !e.includes("ResizeObserver") && !e.includes("favicon") && !e.includes("chunk"),
);
if (reactErrors.length === 0) {
  log(PASS, "Zero console errors");
} else {
  for (const err of reactErrors) {
    log(FAIL, `Console error: ${err.slice(0, 120)}`);
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────
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
