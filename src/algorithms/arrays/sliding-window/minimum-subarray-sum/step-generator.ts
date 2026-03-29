/** Step generator for Minimum Subarray Sum (Inverted Kadane's) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const MINIMUM_SUBARRAY_SUM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MINIMUM_SUBARRAY_SUM!);

interface MinimumSubarraySumInput {
  inputArray: number[];
}

export function generateMinimumSubarraySumSteps(input: MinimumSubarraySumInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], MINIMUM_SUBARRAY_SUM_LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
  });

  if (inputArray.length === 0) {
    tracker.complete({ minSum: 0, startIndex: 0, endIndex: 0 });
    return tracker.getSteps();
  }

  let minEndingHere = inputArray[0]!;
  let minSoFar = inputArray[0]!;
  let currentStartIndex = 0;
  let bestStartIndex = 0;
  let bestEndIndex = 0;

  /* Mark initial element as the current subarray start */
  tracker.visit(
    0,
    {
      element: inputArray[0],
      minEndingHere,
      minSoFar,
      currentStartIndex,
      bestStartIndex,
      bestEndIndex,
    },
    `Initialize: first element ${inputArray[0]}, minEndingHere = ${minEndingHere}`,
  );

  for (let elementIndex = 1; elementIndex < inputArray.length; elementIndex++) {
    const currentElement = inputArray[elementIndex]!;
    const extendedSum = minEndingHere + currentElement;
    const restarts = currentElement < extendedSum;

    if (restarts) {
      minEndingHere = currentElement;
      currentStartIndex = elementIndex;
    } else {
      minEndingHere = extendedSum;
    }

    const updatedBest = minEndingHere < minSoFar;
    if (updatedBest) {
      minSoFar = minEndingHere;
      bestStartIndex = currentStartIndex;
      bestEndIndex = elementIndex;
    }

    tracker.compareTwo(
      currentStartIndex,
      elementIndex,
      {
        elementIndex,
        currentElement,
        minEndingHere,
        minSoFar,
        restarts,
        currentStartIndex,
        bestStartIndex,
        bestEndIndex,
        updatedBest,
      },
      restarts
        ? `Restart subarray at index ${elementIndex} (${currentElement} < extended sum ${extendedSum})`
        : `Extend subarray: minEndingHere = ${minEndingHere}${updatedBest ? " — new best!" : ""}`,
    );
  }

  tracker.complete({
    minSum: minSoFar,
    startIndex: bestStartIndex,
    endIndex: bestEndIndex,
  });

  return tracker.getSteps();
}
