/**
 * Value verification tests for algorithm visualizations.
 * Navigates to the final step and verifies that the values displayed
 * in the visualization are valid and consistent, catching tracker
 * desync bugs where the visual state doesn't match the algorithm output.
 */
import { check } from "../utils/logger.mjs";
import { getStepIndex } from "../utils/dom-helpers.mjs";

/**
 * Read array element values from the ArrayVisualizer bars.
 * Returns null if no array visualizer is found (e.g., graph/grid algorithms).
 */
async function getDisplayedArrayValues(page) {
  return page.evaluate(() => {
    const barContainer = document.querySelector(".flex.flex-1.justify-center.gap-1");
    if (!barContainer) return null;

    const bars = barContainer.querySelectorAll(":scope > div");
    const values = [];
    for (const bar of bars) {
      const valueSpan = bar.querySelector("span.font-mono.text-xs");
      if (valueSpan) {
        const parsed = Number(valueSpan.textContent);
        if (!Number.isNaN(parsed)) {
          values.push(parsed);
        }
      }
    }
    return values.length > 0 ? values : null;
  });
}

/**
 * Check if the current algorithm uses the array visualizer.
 */
async function hasArrayVisualizer(page) {
  const values = await getDisplayedArrayValues(page);
  return values !== null && values.length > 0;
}

/**
 * Navigate to the last step by clicking the progress bar at 100%.
 */
async function goToLastStep(page) {
  const stepInfo = await getStepIndex(page);
  if (!stepInfo) throw new Error("No step counter found");

  const bar = page.locator("input[type='range'][aria-label='Playback progress']");
  await bar.waitFor({ timeout: 3000 });
  const box = await bar.boundingBox();
  if (!box) throw new Error("Progress bar not found");

  await page.mouse.click(box.x + box.width * 0.99, box.y + box.height / 2);

  await page.waitForFunction(
    (total) => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((spanEl) => /^\d+ \/ \d+$/.test(spanEl.textContent ?? ""));
      if (!counter) return false;
      const match = counter.textContent.match(/^(\d+) \/ (\d+)$/);
      return match && Number(match[1]) === total;
    },
    stepInfo.total,
    { timeout: 5000 },
  );
}

/**
 * Verify that sorting algorithms display fully sorted values at the final step.
 */
export async function testSortedValueVerification(page, algoName, excludeAlgorithms = []) {
  if (excludeAlgorithms.includes(algoName)) return;

  await check(`${algoName}: final state values are sorted`, async () => {
    await goToLastStep(page);

    const values = await getDisplayedArrayValues(page);
    if (!values || values.length === 0) {
      throw new Error("Could not read array values from visualization");
    }

    for (let valueIndex = 1; valueIndex < values.length; valueIndex++) {
      if (values[valueIndex] < values[valueIndex - 1]) {
        throw new Error(
          `Array not sorted at index ${valueIndex}: ` +
            `[...${values[valueIndex - 1]}, ${values[valueIndex]}...] ` +
            `Full values: [${values.join(", ")}]`,
        );
      }
    }
  });
}

/**
 * Verify that any algorithm using an array visualizer displays valid
 * (non-NaN, non-undefined) values at the final step.
 *
 * Skips algorithms that don't use the array visualizer BEFORE navigating
 * to the last step, avoiding expensive timeouts on graph/grid algorithms.
 */
export async function testFinalStateValuesExist(page, algoName) {
  // Check FIRST if this algorithm uses an array visualizer (at current step)
  const usesArrayViz = await hasArrayVisualizer(page);
  if (!usesArrayViz) return;

  await check(`${algoName}: final state values are valid`, async () => {
    await goToLastStep(page);

    const values = await getDisplayedArrayValues(page);
    if (!values || values.length === 0) {
      throw new Error("Array visualizer rendered but no values found at final step");
    }

    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
      if (typeof values[valueIndex] !== "number" || Number.isNaN(values[valueIndex])) {
        throw new Error(
          `Invalid value at index ${valueIndex}: ${values[valueIndex]} ` +
            `Full values: [${values.join(", ")}]`,
        );
      }
    }
  });
}
