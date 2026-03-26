import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import type { LineMap } from "@/trackers";

/*
 * Line mapping: step type → source file line numbers per language.
 *
 * Sliding Window avoids recomputing the window sum from scratch each step.
 * Instead it subtracts the element leaving the window and adds the one
 * entering it, reducing the brute-force O(n*k) approach to O(n).
 */
const SLIDING_WINDOW_LINE_MAP: LineMap = {
  /* Validate inputs and guard against empty/invalid arguments */
  initialize: {
    typescript: [1, 2, 3],
    python: [1, 2],
    java: [2, 3, 4],
  },
  /* Compute the sum of the first window as the baseline */
  "move-window": {
    typescript: [6, 7, 8],
    python: [5, 6, 7],
    java: [7, 8, 9],
  },
  /* Subtract the element leaving the left edge of the window */
  "shrink-window": {
    typescript: [14],
    python: [13],
    java: [16],
  },
  /* Add the element entering the right edge of the window */
  "expand-window": {
    typescript: [15],
    python: [14],
    java: [17],
  },
  /* Check if the new window sum beats the current maximum */
  compare: {
    typescript: [17, 18, 19],
    python: [16, 17, 18],
    java: [19, 20, 21],
  },
  /* Return the best sum and starting index */
  complete: {
    typescript: [22],
    python: [20],
    java: [25],
  },
};

interface SlidingWindowInput {
  inputArray: number[];
  windowSize: number;
}

export function generateSlidingWindowSteps(input: SlidingWindowInput): ExecutionStep[] {
  const { inputArray, windowSize } = input;

  const tracker = new ArrayTracker([...inputArray], SLIDING_WINDOW_LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    windowSize,
    arrayLength: inputArray.length,
  });

  if (inputArray.length === 0 || windowSize <= 0 || windowSize > inputArray.length) {
    tracker.complete({
      maxSum: 0,
      windowStartIndex: 0,
    });
    return tracker.getSteps();
  }

  /* Compute initial window sum */
  let currentSum = 0;
  for (let initIndex = 0; initIndex < windowSize; initIndex++) {
    currentSum += inputArray[initIndex]!;
  }

  tracker.moveWindow(
    0,
    windowSize - 1,
    {
      windowStart: 0,
      windowEnd: windowSize - 1,
      currentSum,
    },
    `Initialize window [0, ${windowSize - 1}] with sum ${currentSum}`,
  );

  let maxSum = currentSum;
  let windowStartIndex = 0;

  /* Slide the window */
  for (let rightIndex = windowSize; rightIndex < inputArray.length; rightIndex++) {
    const leftIndex = rightIndex - windowSize;

    tracker.shrinkWindow(
      {
        removedElement: inputArray[leftIndex],
        removedIndex: leftIndex,
        currentSum,
      },
      `Remove element ${inputArray[leftIndex]} at index ${leftIndex}`,
    );

    currentSum -= inputArray[leftIndex]!;
    currentSum += inputArray[rightIndex]!;

    tracker.expandWindow(
      {
        addedElement: inputArray[rightIndex],
        addedIndex: rightIndex,
        currentSum,
      },
      `Add element ${inputArray[rightIndex]} at index ${rightIndex}, sum = ${currentSum}`,
    );

    if (currentSum > maxSum) {
      maxSum = currentSum;
      windowStartIndex = rightIndex - windowSize + 1;
    }

    tracker.visit(
      rightIndex,
      {
        currentSum,
        maxSum,
        windowStartIndex,
        comparison: `${currentSum} ${currentSum > maxSum ? ">" : "<="} ${maxSum}`,
      },
      `Compare current sum ${currentSum} with max sum ${maxSum}`,
    );
  }

  tracker.complete({
    maxSum,
    windowStartIndex,
    windowEndIndex: windowStartIndex + windowSize - 1,
  });

  return tracker.getSteps();
}
