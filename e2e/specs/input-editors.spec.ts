import { test, expect } from "@playwright/test";
import { inputTests } from "../helpers/inputs";
import { selectAlgorithm, getStepIndex } from "../helpers/dom-helpers";

test.describe.configure({ mode: "serial" });

test.describe("Input Editors", () => {
  for (const { algo, test: runInputTest } of inputTests) {
    test(`${algo}: input editor interaction`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']", { timeout: 8000 });
      await selectAlgorithm(page, algo);
      await runInputTest(page);
      // Verify the algorithm still has valid steps after input change
      const stepInfo = await getStepIndex(page);
      expect(stepInfo).not.toBeNull();
      expect(stepInfo!.total).toBeGreaterThan(0);
    });
  }
});
