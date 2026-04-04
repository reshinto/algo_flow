import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../../helpers/discovery";
import { selectAlgorithm, getStepIndex } from "../../helpers/dom-helpers";

test.describe.configure({ mode: "serial" });

const { allAlgorithms, algorithmCategories } = discoverAlgorithms();
const categoryAlgos = allAlgorithms.filter((_, idx) => algorithmCategories[idx] === "linked-lists");

for (const algo of categoryAlgos) {
  test.describe(`Linked Lists: ${algo}`, () => {
    test(`selects "${algo}" and generates steps`, async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const stepInfo = await getStepIndex(page);
      expect(stepInfo).not.toBeNull();
      expect(stepInfo!.total).toBeGreaterThan(0);
    });

    test(`${algo}: SVG visualization renders`, async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const svgElement = page.locator("svg").first();
      await expect(svgElement).toBeVisible();
    });
  });
}
