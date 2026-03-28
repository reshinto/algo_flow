/** Step generator for Subarray Product < K — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const SUBARRAY_PRODUCT_LESS_THAN_K_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.SUBARRAY_PRODUCT_LESS_THAN_K!,
);

interface SubarrayProductInput {
  inputArray: number[];
  threshold: number;
}

export function generateSubarrayProductSteps(input: SubarrayProductInput): ExecutionStep[] {
  const { inputArray, threshold } = input;

  const tracker = new ArrayTracker([...inputArray], SUBARRAY_PRODUCT_LESS_THAN_K_LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    threshold,
    arrayLength: inputArray.length,
  });

  if (inputArray.length === 0 || threshold <= 1) {
    tracker.complete({ count: 0 });
    return tracker.getSteps();
  }

  let leftPointer = 0;
  let currentProduct = 1;
  let count = 0;

  tracker.setWindowActive(true);

  for (let rightPointer = 0; rightPointer < inputArray.length; rightPointer++) {
    currentProduct *= inputArray[rightPointer]!;

    tracker.expandWindow(
      {
        rightPointer,
        leftPointer,
        addedElement: inputArray[rightPointer],
        currentProduct,
      },
      `Expand: multiply by ${inputArray[rightPointer]} at index ${rightPointer}, product = ${currentProduct}`,
    );

    while (currentProduct >= threshold && leftPointer <= rightPointer) {
      tracker.shrinkWindow(
        {
          removedElement: inputArray[leftPointer],
          removedIndex: leftPointer,
          currentProduct,
        },
        `Shrink: divide by ${inputArray[leftPointer]} at index ${leftPointer}, product = ${currentProduct}`,
      );

      currentProduct = Math.round(currentProduct / inputArray[leftPointer]!);
      leftPointer++;
    }

    const windowCount = rightPointer - leftPointer + 1;
    count += windowCount;

    tracker.visit(
      rightPointer,
      {
        leftPointer,
        rightPointer,
        currentProduct,
        windowCount,
        totalCount: count,
        threshold,
      },
      `Add ${windowCount} subarrays ending at index ${rightPointer}, total count = ${count}`,
    );
  }

  tracker.complete({ count });

  return tracker.getSteps();
}
