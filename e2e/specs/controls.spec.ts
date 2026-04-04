import { test, expect } from "@playwright/test";
import { selectAlgorithm, getStepIndex } from "../helpers/dom-helpers";

test.describe("Playback Controls", () => {
  test("progress bar scrub to 50% changes current step", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 8000 });
    await selectAlgorithm(page, "Bubble Sort");

    const bar = page.locator("input[type='range'][aria-label='Playback progress']");
    await bar.waitFor({ timeout: 3000 });
    const box = await bar.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.click(box!.x + box!.width * 0.5, box!.y + box!.height / 2);

    const stepInfo = await getStepIndex(page);
    expect(stepInfo).not.toBeNull();
    expect(stepInfo!.current).toBeGreaterThan(1);
  });

  test("speed selector: select 2x", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 8000 });
    const speedSelect = page.locator("select[aria-label='Playback speed']");
    await speedSelect.selectOption({ value: "2" });
    await expect(speedSelect).toHaveValue("2");
  });
});
