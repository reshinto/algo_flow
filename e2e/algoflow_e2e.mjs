import { chromium } from "playwright";
import { execSync, spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

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
let currentAlgorithm = null;

// ── Step counter utilities ───────────────────────────────────────────────────

/** Locate the step counter span showing "N / M" */
function getStepCounter() {
  return page
    .locator("span")
    .filter({ hasText: /^\d+ \/ \d+$/ })
    .first();
}

/** Read the current step index from the step counter */
async function getStepIndex() {
  const text = await getStepCounter().textContent();
  const match = text.match(/^(\d+) \/ (\d+)$/);
  return match ? { current: Number(match[1]), total: Number(match[2]) } : null;
}

/** Wait for the step counter's current value to differ from previousCurrent */
async function waitForStepChange(previousCurrent) {
  await page.waitForFunction(
    (prev) => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((s) => /^\d+ \/ \d+$/.test(s.textContent ?? ""));
      if (!counter) return false;
      const match = counter.textContent.match(/^(\d+) \/ (\d+)$/);
      return match && Number(match[1]) !== prev;
    },
    previousCurrent,
    { timeout: 3000 },
  );
}

/** Wait for the step counter to reset to "1 / N" */
async function waitForStepReset() {
  await page.waitForFunction(
    () => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((s) => /^\d+ \/ \d+$/.test(s.textContent ?? ""));
      if (!counter) return false;
      const match = counter.textContent.match(/^(\d+) \/ (\d+)$/);
      return match && Number(match[1]) === 1;
    },
    undefined,
    { timeout: 3000 },
  );
}

// ── Input fill helpers ───────────────────────────────────────────────────────

async function fillTextInput(value) {
  const textInput = page.locator("input[type='text']").first();
  await textInput.click({ clickCount: 3 });
  await textInput.fill(value);
  await textInput.press("Tab");
}

async function fillNumberInput(value) {
  const numInput = page.locator("input[type='number']").first();
  await numInput.click({ clickCount: 3 });
  await numInput.fill(String(value));
  await numInput.press("Tab");
}

async function fillNthTextInput(nthIndex, value) {
  const inputs = page.locator("input[type='text']");
  await inputs.nth(nthIndex).click({ clickCount: 3 });
  await inputs.nth(nthIndex).fill(value);
  await inputs.nth(nthIndex).press("Tab");
}

// ── Modal utilities ──────────────────────────────────────────────────────────

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
  const optionBtn = page
    .locator("[role='dialog']")
    .getByRole("button", { name, exact: true })
    .first();
  await optionBtn.waitFor({ timeout: 3000 });
  await optionBtn.click();
  // Modal closes automatically after selection
  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 4000 });
  // Wait for the step counter to appear, confirming the algorithm loaded
  await getStepCounter().waitFor({ timeout: 5000 });
  currentAlgorithm = name;
}

// ── Test suites ──────────────────────────────────────────────────────────────

// Test all playback buttons for current algorithm
async function testPlayback(algoName) {
  const stepFwd = page.locator("button[aria-label='Step forward']");
  const stepBwd = page.locator("button[aria-label='Step backward']");
  const reset = page.locator("button[aria-label='Reset']");
  const rerun = page.locator("button[aria-label='Rerun']");
  const play = page.locator("button[aria-label='Play']");
  const pause = page.locator("button[aria-label='Pause']");

  await check(`${algoName}: step forward ×3`, async () => {
    for (let clickIndex = 0; clickIndex < 3; clickIndex++) {
      const before = await getStepIndex();
      await stepFwd.click();
      await waitForStepChange(before.current);
    }
  });

  await check(`${algoName}: step backward`, async () => {
    const before = await getStepIndex();
    await stepBwd.click();
    await waitForStepChange(before.current);
  });

  await check(`${algoName}: reset`, async () => {
    await reset.click();
    await waitForStepReset();
  });

  await check(`${algoName}: play → pause`, async () => {
    await play.click();
    await pause.waitFor({ timeout: 3000 });
    await pause.click();
    await play.waitFor({ timeout: 3000 });
  });

  await check(`${algoName}: rerun`, async () => {
    await rerun.click();
    await pause.waitFor({ timeout: 3000 });
    await pause.click().catch(() => {}); // may have already stopped
    await play.waitFor({ timeout: 3000 });
  });
}

// Test all three language tabs
async function testLanguageTabs(algoName) {
  for (const lang of ["Python", "Java", "TypeScript"]) {
    await check(`${algoName}: ${lang} tab`, async () => {
      const tab = page.locator(`button:has-text("${lang}")`).first();
      await tab.waitFor({ timeout: 3000 });
      await tab.click();
      await page
        .locator("button[role='tab'][aria-selected='true']")
        .filter({ hasText: lang })
        .waitFor({ timeout: 3000 });
    });
  }
}

// Test the educational drawer (L key + Toggle button)
async function testEducationalDrawer(algoName) {
  await check(`${algoName}: educational drawer opens (L key)`, async () => {
    // Click body first to ensure keyboard focus is not trapped in an input
    await page.locator("body").click({ position: { x: 700, y: 400 } });
    await page.keyboard.press("l");
    // Look for drawer content — the drawer shows section headings
    const overview = page.locator("text=Overview").first();
    await overview.waitFor({ timeout: 3000 });
  });
  await check(`${algoName}: educational drawer closes (Escape)`, async () => {
    // Click body to ensure focus is on the page, then press Escape
    await page.locator("body").click({ position: { x: 700, y: 400 } });
    await page.keyboard.press("Escape");
    const overview = page.locator("text=Overview").first();
    await overview.waitFor({ state: "hidden", timeout: 3000 });
    // Retry once if drawer is still visible (handles rare timing issues)
    const visible = await overview.isVisible().catch(() => false);
    if (visible) {
      await page.keyboard.press("Escape");
      await overview.waitFor({ state: "hidden", timeout: 3000 });
    }
  });
}

// Test keyboard shortcuts (Space / ArrowRight / ArrowLeft / R)
async function testKeyboard(algoName) {
  await check(`${algoName}: Space play/pause`, async () => {
    await page.keyboard.press("Space");
    await page.locator("button[aria-label='Pause']").waitFor({ timeout: 3000 });
    await page.keyboard.press("Space");
    await page.locator("button[aria-label='Play']").waitFor({ timeout: 3000 });
  });
  await check(`${algoName}: ArrowRight → ArrowLeft`, async () => {
    const before = await getStepIndex();
    await page.keyboard.press("ArrowRight");
    await waitForStepChange(before.current);
    const after = await getStepIndex();
    await page.keyboard.press("ArrowLeft");
    await waitForStepChange(after.current);
  });
  await check(`${algoName}: R resets to step 0`, async () => {
    const before = await getStepIndex();
    if (before.current === 1) {
      await page.keyboard.press("ArrowRight");
      await waitForStepChange(before.current);
    }
    await page.keyboard.press("r");
    await waitForStepReset();
  });
}

// ── Algorithm discovery ──────────────────────────────────────────────────────

/**
 * Discover algorithms from the filesystem. Recursively traverses category
 * directories to find algorithm index.ts files at any nesting depth.
 * Picks the first algorithm per category as a representative for full UI testing.
 */
function discoverAlgorithms() {
  const algorithmsDir = path.join(process.cwd(), "src/algorithms");
  const categories = fs
    .readdirSync(algorithmsDir)
    .filter((entry) => fs.statSync(path.join(algorithmsDir, entry)).isDirectory());

  const allAlgorithms = [];
  const representativeSet = new Set();

  for (const category of categories) {
    const categoryDir = path.join(algorithmsDir, category);
    let firstInCategory = true;

    function walkDir(dir) {
      const entries = fs.readdirSync(dir).sort();
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        if (!fs.statSync(fullPath).isDirectory()) continue;

        const indexFile = path.join(fullPath, "index.ts");
        if (fs.existsSync(indexFile)) {
          const content = fs.readFileSync(indexFile, "utf-8");
          const nameMatch = content.match(/name:\s*"([^"]+)"/);
          if (nameMatch) {
            const name = nameMatch[1];
            allAlgorithms.push(name);
            if (firstInCategory) {
              representativeSet.add(name);
              firstInCategory = false;
            }
          }
        } else {
          walkDir(fullPath);
        }
      }
    }

    walkDir(categoryDir);
  }
  return { allAlgorithms, representativeSet };
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
await check("App loads at localhost", async () => {
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
await check("Category pill filter is visible", async () => {
  await page.click("button[aria-label='Search algorithms']");
  await page.waitForSelector("[role='dialog']", { timeout: 3000 });
  const pillGroup = page.locator("[role='group'][aria-label='Filter by category']");
  await pillGroup.waitFor({ timeout: 3000 });
  const allPill = pillGroup.locator("button[aria-pressed='true']").first();
  await allPill.waitFor({ timeout: 2000 });
});
await check("Category pill filters algorithm list", async () => {
  const pillGroup = page.locator("[role='group'][aria-label='Filter by category']");
  // Click a category pill (skip "All" which is first)
  const categoryPill = pillGroup.locator("button[aria-pressed='false']").first();
  await categoryPill.click();
  await categoryPill.waitFor({ timeout: 2000 });
  // Verify the pill is now active
  const activePills = pillGroup.locator("button[aria-pressed='true']");
  const activeCount = await activePills.count();
  if (activeCount !== 1) throw new Error(`Expected 1 active pill, got ${activeCount}`);
  // Close and reopen to verify reset
  await page.click("button[aria-label='Close command palette']");
  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 3000 });
});

// ─── 3. Discover all registered algorithms from filesystem ───────────────────
const { allAlgorithms: algorithms, representativeSet } = discoverAlgorithms();
console.log(
  `\nDiscovered ${algorithms.length} algorithms (${representativeSet.size} representatives)`,
);

for (const algo of algorithms) {
  console.log(`\n━━━ ${algo} ━━━`);

  // Smoke test: every algorithm must load and generate steps
  const selected = await check(`Select "${algo}"`, async () => {
    await selectAlgorithm(algo);
    const stepInfo = await getStepIndex();
    if (!stepInfo || stepInfo.total === 0) throw new Error("No steps generated");
  });

  // Full UI suite: only for representative algorithms (one per category/visual kind)
  if (selected && representativeSet.has(algo)) {
    await testPlayback(algo);
    await testLanguageTabs(algo);
    await testKeyboard(algo);
    await testEducationalDrawer(algo);
  }
}

// ─── 4. Input editors ─────────────────────────────────────────────────────────
console.log("\n━━━ Input Editors ━━━");

const inputTests = [
  { algo: "Bubble Sort", test: () => fillTextInput("5, 3, 8, 1, 9, 2") },
  {
    algo: "Binary Search",
    test: async () => {
      await fillTextInput("2, 5, 8, 12, 16");
      await fillNumberInput(12);
    },
  },
  {
    algo: "Sliding Window (Max Sum)",
    test: async () => {
      await fillTextInput("2, 1, 5, 1, 3, 2");
      await fillNumberInput(3);
    },
  },
  {
    algo: "Kadane's Algorithm (Max Subarray)",
    test: () => fillTextInput("-2, 1, -3, 4, -1, 2"),
  },
  {
    algo: "Best Time to Buy/Sell Stock",
    test: () => fillTextInput("7, 1, 5, 3, 6, 4"),
  },
  {
    algo: "Boyer-Moore Voting (Majority)",
    test: () => fillTextInput("2, 2, 1, 1, 1, 2, 2"),
  },
  { algo: "Move Zeros to End", test: () => fillTextInput("0, 1, 0, 3, 12") },
  {
    algo: "Remove Duplicates (Sorted)",
    test: () => fillTextInput("1, 1, 2, 2, 3, 4"),
  },
  {
    algo: "Two Sum (Sorted, Two Pointer)",
    test: async () => {
      await fillTextInput("1, 2, 4, 6, 8, 11");
      await fillNumberInput(10);
    },
  },
  { algo: "Find Missing Number (XOR)", test: () => fillTextInput("3, 0, 1") },
  { algo: "Single Number (XOR)", test: () => fillTextInput("4, 1, 2, 1, 2") },
  {
    algo: "Dutch National Flag (3-Way Partition)",
    test: () => fillTextInput("2, 0, 1, 2, 1, 0"),
  },
  {
    algo: "Rotate Array (Reversal)",
    test: async () => {
      await fillTextInput("1, 2, 3, 4, 5, 6, 7");
      await fillNumberInput(3);
    },
  },
  { algo: "Next Greater Element", test: () => fillTextInput("4, 5, 2, 10, 8") },
  {
    algo: "Container With Most Water",
    test: () => fillTextInput("1, 8, 6, 2, 5, 4, 8, 3, 7"),
  },
  {
    algo: "Product of Array Except Self",
    test: () => fillTextInput("1, 2, 3, 4, 5"),
  },
  {
    algo: "Three Sum (Zero Triplets)",
    test: () => fillTextInput("-1, 0, 1, 2, -1, -4"),
  },
  {
    algo: "Lomuto Partition",
    test: () => fillTextInput("8, 3, 6, 1, 5, 9, 2, 7"),
  },
  { algo: "Cyclic Sort", test: () => fillTextInput("3, 5, 2, 1, 4, 6") },
  {
    algo: "Prefix Sum (Range Query)",
    test: () => fillTextInput("2, 4, 1, 3, 5"),
  },
  {
    algo: "Subarray Sum Equals K",
    test: async () => {
      await fillTextInput("1, 2, 3, -1, 1");
      await fillNumberInput(3);
    },
  },
  {
    algo: "Merge Two Sorted Arrays",
    test: async () => {
      await fillNthTextInput(0, "1, 3, 5, 7");
      await fillNthTextInput(1, "2, 4, 6, 8");
    },
  },
  {
    algo: "Difference Array (Range Update)",
    test: () => fillNumberInput(6),
  },
  {
    algo: "Counting Sort",
    test: () => fillTextInput("4, 2, 2, 8, 3, 3, 1"),
  },
  {
    algo: "Sliding Window (Min Sum)",
    test: async () => {
      await fillTextInput("4, 2, 1, 7, 8, 1, 2");
      await fillNumberInput(3);
    },
  },
  {
    algo: "Min Size Subarray Sum",
    test: async () => {
      await fillTextInput("2, 3, 1, 2, 4, 3");
      await fillNumberInput(7);
    },
  },
  {
    algo: "Subarray Product < K",
    test: async () => {
      await fillTextInput("10, 5, 2, 6");
      await fillNumberInput(100);
    },
  },
  {
    algo: "Max Consecutive Ones III",
    test: async () => {
      await fillTextInput("1, 1, 0, 0, 1, 1, 1, 0");
      await fillNumberInput(2);
    },
  },
  {
    algo: "Minimum Subarray Sum",
    test: () => fillTextInput("3, -4, 2, -3, -1, 7"),
  },
  {
    algo: "Count Anagram Windows",
    test: async () => {
      await fillNthTextInput(0, "1, 2, 3, 1, 2, 1, 3");
      await fillNthTextInput(1, "1, 2, 3");
    },
  },
  {
    algo: "First Negative in Window",
    test: async () => {
      await fillTextInput("12, -1, -7, 8, -15, 30");
      await fillNumberInput(3);
    },
  },
  {
    algo: "Longest K-Distinct Subarray",
    test: async () => {
      await fillTextInput("1, 2, 1, 2, 3, 3, 4");
      await fillNumberInput(2);
    },
  },
  {
    algo: "Maximum Product Subarray",
    test: () => fillTextInput("2, 3, -2, 4, -1, 2"),
  },
  {
    algo: "Quickselect (K-th Smallest)",
    test: async () => {
      await fillTextInput("7, 2, 1, 6, 8, 5, 3");
      await fillNumberInput(4);
    },
  },
  {
    algo: "Rotate Array (Cyclic)",
    test: async () => {
      await fillTextInput("1, 2, 3, 4, 5, 6");
      await fillNumberInput(2);
    },
  },
  {
    algo: "Find All Duplicates",
    test: () => fillTextInput("4, 3, 2, 7, 8, 2, 3, 1"),
  },
  {
    algo: "First Missing Positive",
    test: () => fillTextInput("3, 4, -1, 1, 7, 5"),
  },
  {
    algo: "XOR Range Query",
    test: () => fillTextInput("3, 5, 2, 7, 1, 4"),
  },
  {
    algo: "Trapping Rain Water",
    test: () => fillTextInput("0, 1, 0, 2, 1, 0, 1, 3"),
  },
  {
    algo: "Largest Rectangle in Histogram",
    test: () => fillTextInput("2, 1, 5, 6, 2, 3"),
  },
  {
    algo: "Sliding Window Maximum (Deque)",
    test: async () => {
      await fillTextInput("1, 3, -1, -3, 5, 3, 6");
      await fillNumberInput(3);
    },
  },
  {
    algo: "Best Time Buy/Sell (Unlimited)",
    test: () => fillTextInput("7, 1, 5, 3, 6, 4"),
  },
  {
    algo: "Four Sum",
    test: async () => {
      await fillTextInput("1, 0, -1, 0, -2, 2");
      await fillNumberInput(0);
    },
  },
  {
    algo: "Previous Smaller Element",
    test: () => fillTextInput("4, 10, 5, 8, 20, 15"),
  },
  {
    algo: "Daily Temperatures",
    test: () => fillTextInput("73, 74, 75, 71, 69, 72, 76"),
  },
  {
    algo: "Floyd's Cycle Detection",
    test: () => fillTextInput("1, 3, 4, 2, 2"),
  },
  {
    algo: "Fibonacci (Tabulation)",
    test: () => fillNumberInput(10),
  },
  {
    algo: "KMP Search",
    test: async () => {
      await fillNthTextInput(0, "AABABAB");
      await fillNthTextInput(1, "ABAB");
    },
  },
  {
    algo: "Set Intersection",
    test: async () => {
      await fillNthTextInput(0, "10, 20, 30, 40");
      await fillNthTextInput(1, "20, 40, 60");
    },
  },
  {
    algo: "Two Sum",
    test: async () => {
      await fillTextInput("3, 5, 8, 2");
      await fillNumberInput(10);
    },
  },
  {
    algo: "Valid Parentheses",
    test: () => fillTextInput("({[]})"),
  },
  {
    algo: "Build Min Heap",
    test: () => fillTextInput("8, 3, 7, 1, 5"),
  },
  {
    algo: "Build Max Heap",
    test: () => fillTextInput("3, 7, 1, 5, 9"),
  },
  {
    algo: "Heap Insert",
    test: async () => {
      await fillTextInput("1, 3, 5, 7, 9");
      await fillNumberInput(2);
    },
  },
  {
    algo: "Kth Largest Element",
    test: async () => {
      await fillTextInput("3, 1, 5, 12, 2, 11");
      await fillNumberInput(3);
    },
  },
  {
    algo: "Kth Smallest Element",
    test: async () => {
      await fillTextInput("7, 10, 4, 3, 20");
      await fillNumberInput(2);
    },
  },
  {
    algo: "Sort Nearly Sorted",
    test: async () => {
      await fillTextInput("6, 5, 3, 2, 8, 10");
      await fillNumberInput(3);
    },
  },
  {
    algo: "Reverse Linked List",
    test: () => fillTextInput("1, 2, 3, 4, 5"),
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
    },
  },
  {
    algo: "Zigzag Traversal",
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
    },
  },
  {
    algo: "Transpose Matrix",
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
    },
  },
  {
    algo: "Set Matrix Zeroes",
    test: async () => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ timeout: 3000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 0, 3\n4, 5, 6\n7, 8, 9");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Kth Smallest in Sorted Matrix",
    test: async () => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ timeout: 3000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 5, 9\n10, 11, 13\n12, 13, 15");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Island Count",
    test: async () => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ timeout: 3000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 1, 0\n0, 1, 0\n0, 0, 1");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Rotate Layer by Layer",
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
    },
  },
];

for (const { algo, test } of inputTests) {
  await check(`${algo}: input editor interaction`, async () => {
    if (currentAlgorithm !== algo) {
      await selectAlgorithm(algo);
    }
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
  const play = page.locator("button[aria-label='Play']");
  const pause = page.locator("button[aria-label='Pause']");
  await play.click();
  await pause.waitFor({ timeout: 3000 });
  await pause.click();
  await play.waitFor({ timeout: 3000 });
});
await check("Dijkstra: step through 5 more steps", async () => {
  const stepFwd = page.locator("button[aria-label='Step forward']");
  for (let clickIndex = 0; clickIndex < 5; clickIndex++) {
    const before = await getStepIndex();
    await stepFwd.click();
    await waitForStepChange(before.current);
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
  // Wait for step counter to show a non-initial value
  await page.waitForFunction(
    () => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((s) => /^\d+ \/ \d+$/.test(s.textContent ?? ""));
      if (!counter) return false;
      const match = counter.textContent.match(/^(\d+) \/ (\d+)$/);
      return match && Number(match[1]) !== 1 && Number(match[1]) !== Number(match[2]);
    },
    undefined,
    { timeout: 3000 },
  );
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

async function waitForSpeed(expectedValue) {
  await page.waitForFunction(
    (val) => {
      const select = document.querySelector("select[aria-label='Playback speed']");
      return select && select.value === val;
    },
    expectedValue,
    { timeout: 3000 },
  );
}

await check("Speed: select 2x", async () => {
  await speedSelect.selectOption({ value: "2" });
  await waitForSpeed("2");
});
await check("Speed: select 0.5x", async () => {
  await speedSelect.selectOption({ value: "0.5" });
  await waitForSpeed("0.5");
});
await check("Speed: keyboard '1' → 0.25x", async () => {
  // Click the visualization panel to blur the speed select before sending keyboard shortcuts
  await page.locator("body").click({ position: { x: 700, y: 400 } });
  await page.keyboard.press("1");
  await waitForSpeed("0.25");
});
await check("Speed: keyboard '3' → 1x", async () => {
  await page.locator("body").click({ position: { x: 700, y: 400 } });
  await page.keyboard.press("3");
  await waitForSpeed("1");
});
await check("Speed: keyboard '5' → 4x", async () => {
  await page.locator("body").click({ position: { x: 700, y: 400 } });
  await page.keyboard.press("5");
  await waitForSpeed("4");
});

// ─── 8. Theme toggle ─────────────────────────────────────────────────────────
console.log("\n━━━ Theme Toggle ━━━");
await check("Theme toggle button exists", async () => {
  const themeBtn = page.locator("button[aria-label='Switch to light theme']");
  await themeBtn.waitFor({ timeout: 3000 });
});
await check("Theme cycles dark → light → system → dark", async () => {
  // Start: dark — aria-label is "Switch to light theme"
  const lightBtn = page.locator("button[aria-label='Switch to light theme']");
  await lightBtn.click();

  // Now light — aria-label becomes "Switch to system theme"
  await page.waitForFunction(
    () => document.documentElement.getAttribute("data-theme") === "light",
    undefined,
    { timeout: 3000 },
  );
  const systemBtn = page.locator("button[aria-label='Switch to system theme']");
  await systemBtn.waitFor({ timeout: 3000 });

  // Click to system — aria-label becomes "Switch to dark theme"
  await systemBtn.click();
  const darkBtn = page.locator("button[aria-label='Switch to dark theme']");
  await darkBtn.waitFor({ timeout: 3000 });

  // Click back to dark — data-theme removed
  await darkBtn.click();
  await page.waitForFunction(
    () => !document.documentElement.getAttribute("data-theme"),
    undefined,
    { timeout: 3000 },
  );
});

// ─── 9. Tablet layout ───────────────────────────────────────────────────────
console.log("\n━━━ Tablet Layout ━━━");
await check("Tablet layout renders at 768px", async () => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await selectAlgorithm("Bubble Sort");
  // Tablet layout should show Steps/Code tabs
  const stepsTab = page.locator("[role='tab']").filter({ hasText: "Steps" });
  await stepsTab.waitFor({ timeout: 3000 });
  const codeTab = page.locator("[role='tab']").filter({ hasText: "Code" });
  await codeTab.waitFor({ timeout: 3000 });
});
await check("Tablet: Code tab switches to editor", async () => {
  const codeTab = page.locator("[role='tab']").filter({ hasText: "Code" });
  await codeTab.click();
  await page.waitForSelector("[role='tabpanel']", { timeout: 3000 });
  // Monaco editor should be visible in the Code tab
  const editor = page.locator(".monaco-editor");
  await editor.waitFor({ timeout: 5000 });
});
await check("Tablet: Steps tab switches back", async () => {
  const stepsTab = page.locator("[role='tab']").filter({ hasText: "Steps" });
  await stepsTab.click();
  // Should show explanation content (metrics heading)
  const metrics = page.locator("h3").filter({ hasText: "Metrics" });
  await metrics.waitFor({ timeout: 3000 });
});

// ─── 10. Mobile layout ──────────────────────────────────────────────────────
console.log("\n━━━ Mobile Layout ━━━");
await check("Mobile layout renders at 375px", async () => {
  await page.setViewportSize({ width: 375, height: 812 });
  // Mobile should show Visualize/Code/Steps tabs
  const vizTab = page.locator("[role='tab']").filter({ hasText: "Visualize" });
  await vizTab.waitFor({ timeout: 3000 });
});
await check("Mobile: tab switching works", async () => {
  const codeTab = page.locator("[role='tab']").filter({ hasText: "Code" });
  await codeTab.click();
  await page.waitForSelector("[role='tabpanel']", { timeout: 3000 });
  // Switch back to Visualize
  const vizTab = page.locator("[role='tab']").filter({ hasText: "Visualize" });
  await vizTab.click();
  // Wait for Visualize tabpanel to be active
  const vizPanel = page.locator("[role='tabpanel']").filter({ hasText: /Array values|comma/ });
  await vizPanel.waitFor({ timeout: 3000 });
});

// Restore desktop viewport for remaining tests
await page.setViewportSize({ width: 1400, height: 900 });

// ─── 11. Console errors ───────────────────────────────────────────────────────
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
