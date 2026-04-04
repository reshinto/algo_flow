import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../helpers/discovery";
import { selectAlgorithm } from "../helpers/dom-helpers";

const IGNORED_ERROR_PATTERNS = ["ResizeObserver", "favicon", "chunk"];

function isRealError(message: string): boolean {
  return !IGNORED_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
}

test.describe("Console Errors", () => {
  test("no console errors during algorithm selection run", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error" && isRealError(msg.text())) {
        consoleErrors.push(msg.text());
      }
    });

    page.on("pageerror", (err) => {
      if (isRealError(err.message)) {
        consoleErrors.push(`PAGE ERROR: ${err.message}`);
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 15000 });

    const { allAlgorithms } = discoverAlgorithms();
    // Run a sample of algorithms to keep test duration reasonable
    const sampleSize = Math.min(10, allAlgorithms.length);
    const step = Math.floor(allAlgorithms.length / sampleSize);
    const sampledAlgorithms = allAlgorithms.filter((_, idx) => idx % step === 0);

    for (const algo of sampledAlgorithms) {
      await selectAlgorithm(page, algo);
    }

    expect(consoleErrors, `Console errors found:\n${consoleErrors.join("\n")}`).toHaveLength(0);
  });
});
