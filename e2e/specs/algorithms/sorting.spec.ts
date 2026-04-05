import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../../helpers/discovery";
import {
  selectAlgorithm,
  getStepIndex,
  goToLastStep,
  getDisplayedArrayValues,
} from "../../helpers/dom-helpers";

const STALIN_SORT = "Stalin Sort";

const { allAlgorithms, algorithmCategories } = discoverAlgorithms();
const categoryAlgos = allAlgorithms.filter((_, idx) => algorithmCategories[idx] === "sorting");

for (const algo of categoryAlgos) {
  test(`Sorting: ${algo} — selects, generates steps, renders, sorts`, async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("button[aria-label='Search algorithms']");
    await selectAlgorithm(page, algo);

    const stepInfo = await getStepIndex(page);
    expect(stepInfo).not.toBeNull();
    expect(stepInfo!.total).toBeGreaterThan(0);

    const values = await getDisplayedArrayValues(page);
    expect(values).not.toBeNull();
    expect(values!.length).toBeGreaterThan(0);

    if (algo !== STALIN_SORT) {
      await goToLastStep(page);
      const finalValues = await getDisplayedArrayValues(page);
      expect(finalValues).not.toBeNull();
      expect(finalValues!.length).toBeGreaterThan(0);
      for (let valueIndex = 1; valueIndex < finalValues!.length; valueIndex++) {
        expect(finalValues![valueIndex]).toBeGreaterThanOrEqual(finalValues![valueIndex - 1]);
      }
    }
  });
}
