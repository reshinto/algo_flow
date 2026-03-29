/** Step generator for Max Consecutive Ones III — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const MAX_CONSECUTIVE_ONES_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MAX_CONSECUTIVE_ONES!);

interface MaxConsecutiveOnesInput {
  inputArray: number[];
  maxFlips: number;
}

export function generateMaxConsecutiveOnesSteps(input: MaxConsecutiveOnesInput): ExecutionStep[] {
  const { inputArray, maxFlips } = input;

  const tracker = new ArrayTracker([...inputArray], MAX_CONSECUTIVE_ONES_LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    maxFlips,
    arrayLength: inputArray.length,
  });

  if (inputArray.length === 0) {
    tracker.complete({ maxLength: 0, startIndex: 0 });
    return tracker.getSteps();
  }

  let leftPointer = 0;
  let zeroCount = 0;
  let maxLength = 0;
  let bestStartIndex = 0;

  tracker.setWindowActive(true);

  for (let rightPointer = 0; rightPointer < inputArray.length; rightPointer++) {
    const isZero = inputArray[rightPointer] === 0;
    if (isZero) {
      zeroCount++;
    }

    tracker.expandWindow(
      {
        rightPointer,
        leftPointer,
        element: inputArray[rightPointer],
        isZero,
        zeroCount,
        maxFlips,
      },
      `Expand: index ${rightPointer} = ${inputArray[rightPointer]}${isZero ? ` (zero #${zeroCount})` : ""}`,
    );

    while (zeroCount > maxFlips) {
      const removedIsZero = inputArray[leftPointer] === 0;
      if (removedIsZero) {
        zeroCount--;
      }

      tracker.shrinkWindow(
        {
          removedElement: inputArray[leftPointer],
          removedIndex: leftPointer,
          removedIsZero,
          zeroCount,
        },
        `Shrink: remove ${inputArray[leftPointer]} at index ${leftPointer}, zeros = ${zeroCount}`,
      );

      leftPointer++;
    }

    const windowLength = rightPointer - leftPointer + 1;

    if (windowLength > maxLength) {
      maxLength = windowLength;
      bestStartIndex = leftPointer;
    }

    tracker.visit(
      rightPointer,
      {
        leftPointer,
        rightPointer,
        zeroCount,
        windowLength,
        maxLength,
        bestStartIndex,
      },
      `Window [${leftPointer}, ${rightPointer}] length ${windowLength} with ${zeroCount} zeros — maxLength = ${maxLength}`,
    );
  }

  tracker.complete({
    maxLength,
    startIndex: bestStartIndex,
  });

  return tracker.getSteps();
}
