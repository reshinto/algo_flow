import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../../helpers/discovery";
import {
  selectAlgorithm,
  getStepIndex,
  goToLastStep,
  getDisplayedArrayValues,
} from "../../helpers/dom-helpers";

test.describe.configure({ mode: "serial" });

const STALIN_SORT = "Stalin Sort";

const { allAlgorithms, algorithmCategories } = discoverAlgorithms();
const categoryAlgos = allAlgorithms.filter((_, idx) => algorithmCategories[idx] === "sorting");

for (const algo of categoryAlgos) {
  test.describe(`Sorting: ${algo}`, () => {
    test(`selects "${algo}" and generates steps`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const stepInfo = await getStepIndex(page);
      expect(stepInfo).not.toBeNull();
      expect(stepInfo!.total).toBeGreaterThan(0);
    });

    test(`${algo}: visualization renders`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      const values = await getDisplayedArrayValues(page);
      expect(values).not.toBeNull();
      expect(values!.length).toBeGreaterThan(0);
    });

    test(`${algo}: final values sorted`, async ({ page }) => {
      if (algo === STALIN_SORT) return;
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      await goToLastStep(page);
      const values = await getDisplayedArrayValues(page);
      expect(values).not.toBeNull();
      expect(values!.length).toBeGreaterThan(0);
      for (let valueIndex = 1; valueIndex < values!.length; valueIndex++) {
        expect(values![valueIndex]).toBeGreaterThanOrEqual(values![valueIndex - 1]);
      }
    });
  });
}
