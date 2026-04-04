import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../../helpers/discovery";
import { selectAlgorithm, getStepIndex, getDisplayedArrayValues } from "../../helpers/dom-helpers";

test.describe.configure({ mode: "serial" });

const { allAlgorithms, algorithmCategories } = discoverAlgorithms();
const categoryAlgos = allAlgorithms.filter((_, idx) => algorithmCategories[idx] === "searching");

for (const algo of categoryAlgos) {
  test.describe(`Searching: ${algo}`, () => {
    test(`selects "${algo}" and generates steps`, async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const stepInfo = await getStepIndex(page);
      expect(stepInfo).not.toBeNull();
      expect(stepInfo!.total).toBeGreaterThan(0);
    });

    test(`${algo}: visualization renders`, async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const values = await getDisplayedArrayValues(page);
      expect(values).not.toBeNull();
      expect(values!.length).toBeGreaterThan(0);
    });
  });
}
