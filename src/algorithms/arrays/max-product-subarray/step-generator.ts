/** Step generator for Max Product Subarray — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MAX_PRODUCT_SUBARRAY!);

interface MaxProductSubarrayInput {
  inputArray: number[];
}

export function generateMaxProductSubarraySteps(input: MaxProductSubarrayInput): ExecutionStep[] {
  const { inputArray } = input;
  const arrayLength = inputArray.length;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  if (arrayLength === 0) {
    tracker.initialize({ arrayLength: 0 });
    tracker.complete({ maxProduct: 0, startIndex: 0, endIndex: 0 });
    return tracker.getSteps();
  }

  let currentMax = inputArray[0]!;
  let currentMin = inputArray[0]!;
  let globalMax = inputArray[0]!;
  let currentStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    currentMax,
    currentMin,
    globalMax,
  });

  tracker.visit(
    0,
    { currentMax, currentMin, globalMax, bestStart: 0, bestEnd: 0 },
    `Start with element ${inputArray[0]} — currentMax = currentMin = globalMax = ${inputArray[0]}`,
  );

  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    const currentElement = inputArray[scanIndex]!;

    if (currentElement < 0) {
      const tempMax = currentMax;
      currentMax = currentMin;
      currentMin = tempMax;
    }

    const prevMax = currentMax;
    const prevMin = currentMin;
    currentMax = Math.max(currentElement, prevMax * currentElement);
    currentMin = Math.min(currentElement, prevMin * currentElement);

    if (currentMax === currentElement) {
      currentStart = scanIndex;
    }

    if (currentMax > globalMax) {
      globalMax = currentMax;
      bestStart = currentStart;
      bestEnd = scanIndex;
    }

    tracker.visit(
      scanIndex,
      {
        currentElement,
        currentMax,
        currentMin,
        globalMax,
        currentStart,
        bestStart,
        bestEnd,
        negativeFlip: currentElement < 0,
      },
      `Element ${currentElement}: currentMax = ${currentMax}, globalMax = ${globalMax}`,
    );
  }

  tracker.complete({
    maxProduct: globalMax,
    startIndex: bestStart,
    endIndex: bestEnd,
  });

  return tracker.getSteps();
}
