import { test, expect } from "@playwright/test";
import { selectAlgorithm } from "../helpers/dom-helpers";

test.describe("Grid Interaction", () => {
  test("Dijkstra grid cells render with sufficient count", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 15000 });
    await selectAlgorithm(page, "Dijkstra's Algorithm");
    const cells = page.locator("[class*='grid'] > div");
    await cells.first().waitFor({ timeout: 5000 });
    const cellCount = await cells.count();
    expect(cellCount).toBeGreaterThan(30);
  });
});
