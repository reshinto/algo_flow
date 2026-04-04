import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../../helpers/discovery";
import { selectAlgorithm, getStepIndex } from "../../helpers/dom-helpers";

const { allAlgorithms, algorithmCategories } = discoverAlgorithms();
const categoryAlgos = allAlgorithms.filter((_, idx) => algorithmCategories[idx] === "pathfinding");

for (const algo of categoryAlgos) {
  test.describe(`Pathfinding: ${algo}`, () => {
    test(`selects "${algo}" and generates steps`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const stepInfo = await getStepIndex(page);
      expect(stepInfo).not.toBeNull();
      expect(stepInfo!.total).toBeGreaterThan(0);
    });

    test(`${algo}: grid visualization renders`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const gridCells = page.locator("[class*='grid'] > div");
      await gridCells.first().waitFor({ timeout: 5000 });
      const cellCount = await gridCells.count();
      expect(cellCount).toBeGreaterThan(0);
    });
  });
}
