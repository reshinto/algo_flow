import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const SLIDING_WINDOW_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SLIDING_WINDOW);

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
