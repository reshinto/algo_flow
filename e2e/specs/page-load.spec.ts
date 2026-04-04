import { test, expect } from "@playwright/test";

test.describe("Page Load", () => {
  test("app loads at localhost", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("button[aria-label='Search algorithms']");
    expect(page.url()).toContain("localhost");
  });

  test("title is set", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test("AlgoFlow h1 visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("h1").filter({ hasText: "AlgoFlow" })).toBeVisible();
  });
});

test.describe("Command Palette", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("button[aria-label='Search algorithms']");
  });

  test("opens on button click", async ({ page }) => {
    await page.click("button[aria-label='Search algorithms']");
    await expect(page.locator("[role='dialog']")).toBeVisible();
  });

  test("search input auto-focused", async ({ page }) => {
    await page.click("button[aria-label='Search algorithms']");
    await page.waitForSelector("[role='dialog']", { timeout: 3000 });
    const isFocused = await page.$eval(
      "#algo-search-input",
      (element) => document.activeElement === element,
    );
    expect(isFocused).toBe(true);
  });

  test("filtering works", async ({ page }) => {
    await page.click("button[aria-label='Search algorithms']");
    await page.waitForSelector("[role='dialog']", { timeout: 3000 });
    await page.fill("#algo-search-input", "breadth");
    const resultButton = page
      .locator("[role='dialog'] button")
      .filter({ hasText: "Breadth-First Search" })
      .first();
    await expect(resultButton).toBeVisible();
  });

  test("closes via X button", async ({ page }) => {
    await page.click("button[aria-label='Search algorithms']");
    await page.waitForSelector("[role='dialog']", { timeout: 3000 });
    await page.click("button[aria-label='Close command palette']");
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });

  test("closes via backdrop click", async ({ page }) => {
    await page.click("button[aria-label='Search algorithms']");
    await page.waitForSelector("[role='dialog']", { timeout: 3000 });
    await page.mouse.click(50, 50);
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });
});
