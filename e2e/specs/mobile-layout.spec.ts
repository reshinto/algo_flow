import { test, expect } from "@playwright/test";

test.describe("Mobile Layout", () => {
  test("renders at 375px viewport with tab switcher visible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("button[aria-label='Search algorithms']");

    const vizTab = page.locator("[role='tab']").filter({ hasText: "Visualize" });
    await expect(vizTab).toBeVisible();
  });

  test("tab switcher visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("button[aria-label='Search algorithms']");

    const tabs = page.locator("[role='tab']");
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThan(0);
  });
});
