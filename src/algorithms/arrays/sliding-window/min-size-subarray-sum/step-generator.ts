/** Step generator for Min Size Subarray Sum — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const MIN_SIZE_SUBARRAY_SUM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MIN_SIZE_SUBARRAY_SUM!);

interface MinSizeSubarraySumInput {
  inputArray: number[];
  target: number;
}

export function generateMinSizeSubarraySumSteps(input: MinSizeSubarraySumInput): ExecutionStep[] {
  const { inputArray, target } = input;

  const tracker = new ArrayTracker([...inputArray], MIN_SIZE_SUBARRAY_SUM_LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    target,
    arrayLength: inputArray.length,
  });

  if (inputArray.length === 0 || target <= 0) {
    tracker.complete({ minLength: 0, startIndex: 0 });
    return tracker.getSteps();
  }

  let leftPointer = 0;
  let currentSum = 0;
  let minLength = Infinity;
  let bestStartIndex = 0;

  tracker.setWindowActive(true);

  for (let rightPointer = 0; rightPointer < inputArray.length; rightPointer++) {
    currentSum += inputArray[rightPointer]!;

    tracker.expandWindow(
      {
        rightPointer,
        leftPointer,
        addedElement: inputArray[rightPointer],
        currentSum,
      },
      `Expand: add element ${inputArray[rightPointer]} at index ${rightPointer}, sum = ${currentSum}`,
    );

    while (currentSum >= target) {
      const windowLength = rightPointer - leftPointer + 1;

      if (windowLength < minLength) {
        minLength = windowLength;
        bestStartIndex = leftPointer;
      }

      tracker.compareTwo(
        leftPointer,
        rightPointer,
        {
          leftPointer,
          rightPointer,
          windowLength,
          minLength: minLength === Infinity ? "none" : minLength,
          currentSum,
          target,
        },
        `Window [${leftPointer}, ${rightPointer}] length ${windowLength} — sum ${currentSum} >= ${target}`,
      );

      tracker.shrinkWindow(
        {
          removedElement: inputArray[leftPointer],
          removedIndex: leftPointer,
          currentSum,
        },
        `Shrink: remove element ${inputArray[leftPointer]} at index ${leftPointer}`,
      );

      currentSum -= inputArray[leftPointer]!;
      leftPointer++;
    }
  }

  tracker.complete({
    minLength: minLength === Infinity ? 0 : minLength,
    startIndex: bestStartIndex,
  });

  return tracker.getSteps();
}
