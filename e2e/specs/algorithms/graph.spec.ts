import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../../helpers/discovery";
import { selectAlgorithm, getStepIndex } from "../../helpers/dom-helpers";

const { allAlgorithms, algorithmCategories } = discoverAlgorithms();
const categoryAlgos = allAlgorithms.filter((_, idx) => algorithmCategories[idx] === "graph");

for (const algo of categoryAlgos) {
  test(`Graph: ${algo} — selects, generates steps, renders`, async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("button[aria-label='Search algorithms']");
    await selectAlgorithm(page, algo);

    const stepInfo = await getStepIndex(page);
    expect(stepInfo).not.toBeNull();
    expect(stepInfo!.total).toBeGreaterThan(0);

    const svgElement = page.locator("svg").first();
    await expect(svgElement).toBeVisible();
  });
}
