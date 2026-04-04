import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../helpers/discovery";
import {
  selectAlgorithm,
  getStepIndex,
  waitForStepChange,
  waitForStepReset,
} from "../helpers/dom-helpers";

test.describe.configure({ mode: "serial" });

const { representativeSet } = discoverAlgorithms();
const representatives = [...representativeSet];

for (const algo of representatives) {
  test.describe(`Representative: ${algo}`, () => {
    test(`${algo}: step forward ×3`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);

      const stepFwd = page.locator("button[aria-label='Step forward']");
      for (let clickIndex = 0; clickIndex < 3; clickIndex++) {
        const before = await getStepIndex(page);
        expect(before).not.toBeNull();
        await stepFwd.click();
        await waitForStepChange(page, before!.current);
      }
    });

    test(`${algo}: step backward`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);

      const stepFwd = page.locator("button[aria-label='Step forward']");
      const before = await getStepIndex(page);
      expect(before).not.toBeNull();
      await stepFwd.click();
      await waitForStepChange(page, before!.current);

      const afterForward = await getStepIndex(page);
      expect(afterForward).not.toBeNull();
      const stepBwd = page.locator("button[aria-label='Step backward']");
      await stepBwd.click();
      await waitForStepChange(page, afterForward!.current);
    });

    test(`${algo}: reset`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);

      const stepFwd = page.locator("button[aria-label='Step forward']");
      const before = await getStepIndex(page);
      expect(before).not.toBeNull();
      await stepFwd.click();
      await waitForStepChange(page, before!.current);

      const resetBtn = page.locator("button[aria-label='Reset']");
      await resetBtn.click();
      await waitForStepReset(page);
    });

    test(`${algo}: play then pause`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);

      const playBtn = page.locator("button[aria-label='Play']");
      const pauseBtn = page.locator("button[aria-label='Pause']");
      await playBtn.click();
      await expect(pauseBtn).toBeVisible();
      await pauseBtn.click();
      await expect(playBtn).toBeVisible();
    });

    test(`${algo}: rerun`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);

      const rerunBtn = page.locator("button[aria-label='Rerun']");
      const pauseBtn = page.locator("button[aria-label='Pause']");
      const playBtn = page.locator("button[aria-label='Play']");
      await rerunBtn.click();
      await expect(pauseBtn).toBeVisible();
      await pauseBtn.click().catch(() => {});
      await expect(playBtn).toBeVisible();
    });

    test(`${algo}: TypeScript tab`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const tab = page.locator("button:has-text('TypeScript')").first();
      await tab.waitFor({ timeout: 3000 });
      await tab.click();
      await expect(
        page.locator("button[role='tab'][aria-selected='true']").filter({ hasText: "TypeScript" }),
      ).toBeVisible();
    });

    test(`${algo}: Python tab`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const tab = page.locator("button:has-text('Python')").first();
      await tab.waitFor({ timeout: 3000 });
      await tab.click();
      await expect(
        page.locator("button[role='tab'][aria-selected='true']").filter({ hasText: "Python" }),
      ).toBeVisible();
    });

    test(`${algo}: Java tab`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const tab = page.locator("button:has-text('Java')").first();
      await tab.waitFor({ timeout: 3000 });
      await tab.click();
      await expect(
        page.locator("button[role='tab'][aria-selected='true']").filter({ hasText: "Java" }),
      ).toBeVisible();
    });

    test(`${algo}: Space play/pause keyboard shortcut`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      await page.locator("body").click({ position: { x: 700, y: 400 } });
      await page.keyboard.press("Space");
      await expect(page.locator("button[aria-label='Pause']")).toBeVisible();
      await page.keyboard.press("Space");
      await expect(page.locator("button[aria-label='Play']")).toBeVisible();
    });

    test(`${algo}: ArrowRight and ArrowLeft keyboard shortcuts`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      await page.locator("body").click({ position: { x: 700, y: 400 } });

      const before = await getStepIndex(page);
      expect(before).not.toBeNull();
      await page.keyboard.press("ArrowRight");
      await waitForStepChange(page, before!.current);
      const after = await getStepIndex(page);
      expect(after).not.toBeNull();
      await page.keyboard.press("ArrowLeft");
      await waitForStepChange(page, after!.current);
    });

    test(`${algo}: R key resets to step 1`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      await page.locator("body").click({ position: { x: 700, y: 400 } });

      const before = await getStepIndex(page);
      expect(before).not.toBeNull();
      if (before!.current === 1) {
        await page.keyboard.press("ArrowRight");
        await waitForStepChange(page, before!.current);
      }
      await page.keyboard.press("r");
      await waitForStepReset(page);
    });

    test(`${algo}: educational drawer opens with L key`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      await page.locator("body").click({ position: { x: 700, y: 400 } });
      await page.keyboard.press("l");
      await expect(page.locator("text=Overview").first()).toBeVisible();
    });

    test(`${algo}: educational drawer closes with Escape`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      await page.locator("body").click({ position: { x: 700, y: 400 } });
      await page.keyboard.press("l");
      await expect(page.locator("text=Overview").first()).toBeVisible();
      await page.locator("body").click({ position: { x: 700, y: 400 } });
      await page.keyboard.press("Escape");
      await expect(page.locator("text=Overview").first()).not.toBeVisible();
    });
  });
}
