import { test, expect } from "@playwright/test";
import { inputTests } from "../helpers/inputs";
import { selectAlgorithm, getStepIndex, getDisplayedArrayValues } from "../helpers/dom-helpers";

test.describe("Input Editors", () => {
  for (const { algo, test: runInputTest } of inputTests) {
    test(`${algo}: input editor interaction`, async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("button[aria-label='Search algorithms']");
      await selectAlgorithm(page, algo);
      await runInputTest(page);
      // Verify the algorithm still has valid steps after input change
      const stepInfo = await getStepIndex(page);
      expect(stepInfo).not.toBeNull();
      expect(stepInfo!.total).toBeGreaterThan(0);
    });
  }
});

test.describe("Real-time Input Reflection", () => {
  test("Bubble Sort: typing new values updates graph without pressing Enter", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("button[aria-label='Search algorithms']");
    await selectAlgorithm(page, "Bubble Sort");

    // Read initial graph values
    const initialValues = await getDisplayedArrayValues(page);
    expect(initialValues).not.toBeNull();
    expect(initialValues!.length).toBe(7); // defaultInput has 7 elements

    // Find the array input field and type new values (without pressing Enter)
    const arrayInput = page.locator("input[type='text']").first();
    await arrayInput.click({ clickCount: 3 }); // Select all
    await arrayInput.fill("5, 3, 1");

    // Wait for debounce (300ms) + React re-render
    await page.waitForTimeout(500);

    // Read graph values — should now reflect the new input
    const updatedValues = await getDisplayedArrayValues(page);
    expect(updatedValues).not.toBeNull();
    expect(updatedValues!.length).toBe(3); // 3 values typed
    expect(updatedValues).toEqual([5, 3, 1]);
  });

  test("Selection Sort: graph reflects input after algorithm switch", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("button[aria-label='Search algorithms']");

    // Select Bubble Sort first
    await selectAlgorithm(page, "Bubble Sort");
    const bubbleValues = await getDisplayedArrayValues(page);
    expect(bubbleValues).not.toBeNull();

    // Switch to Selection Sort — graph should update to Selection Sort's default input
    await selectAlgorithm(page, "Selection Sort");
    const selectionValues = await getDisplayedArrayValues(page);
    expect(selectionValues).not.toBeNull();
    expect(selectionValues!.length).toBeGreaterThan(0);
  });
});
