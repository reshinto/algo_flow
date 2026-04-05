import { test, expect } from "@playwright/test";
import { discoverAlgorithms } from "../../helpers/discovery";
import { selectAlgorithm, getStepIndex } from "../../helpers/dom-helpers";

const { allAlgorithms, algorithmCategories } = discoverAlgorithms();
const categoryAlgos = allAlgorithms.filter(
  (_, idx) => algorithmCategories[idx] === "dynamic-programming",
);

for (const algo of categoryAlgos) {
  test(`Dynamic Programming: ${algo} — selects, generates steps, renders`, async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("button[aria-label='Search algorithms']");
    await selectAlgorithm(page, algo);

    const stepInfo = await getStepIndex(page);
    expect(stepInfo).not.toBeNull();
    expect(stepInfo!.total).toBeGreaterThan(0);

    const dpCell = page.locator(".h-12.w-16").first();
    const arrayViz = page.locator(".flex.flex-1.justify-center.gap-1").first();
    const hasViz =
      (await dpCell.isVisible().catch(() => false)) ||
      (await arrayViz.isVisible().catch(() => false));
    expect(hasViz).toBe(true);
  });
}
