import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../../helpers/discovery";
import { selectAlgorithm, getStepIndex } from "../../helpers/dom-helpers";

test.describe.configure({ mode: "serial" });

const { allAlgorithms, algorithmCategories } = discoverAlgorithms();
const categoryAlgos = allAlgorithms.filter((_, idx) => algorithmCategories[idx] === "heaps");

for (const algo of categoryAlgos) {
  test.describe(`Heaps: ${algo}`, () => {
    test(`selects "${algo}" and generates steps`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 8000 });
      await selectAlgorithm(page, algo);
      const stepInfo = await getStepIndex(page);
      expect(stepInfo).not.toBeNull();
      expect(stepInfo!.total).toBeGreaterThan(0);
    });

    test(`${algo}: heap visualization renders`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 8000 });
      await selectAlgorithm(page, algo);
      // Heap uses SVG tree visualization
      const svgElement = page.locator("svg").first();
      await expect(svgElement).toBeVisible();
    });
  });
}
