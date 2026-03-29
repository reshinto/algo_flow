/** Step generator for First Negative in Window — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIRST_NEGATIVE_IN_WINDOW!);

interface FirstNegativeInWindowInput {
  inputArray: number[];
  windowSize: number;
}

export function generateFirstNegativeInWindowSteps(
  input: FirstNegativeInWindowInput,
): ExecutionStep[] {
  const { inputArray, windowSize } = input;
  const arrayLength = inputArray.length;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  if (arrayLength === 0 || windowSize <= 0 || windowSize > arrayLength) {
    tracker.initialize({ arrayLength, windowSize });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const negativeIndices: number[] = [];
  const result: number[] = [];

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    windowSize,
  });

  // Process first window
  for (let initIndex = 0; initIndex < windowSize; initIndex++) {
    if (inputArray[initIndex]! < 0) {
      negativeIndices.push(initIndex);
    }
  }

  const firstResult = negativeIndices.length > 0 ? inputArray[negativeIndices[0]!]! : 0;
  result.push(firstResult);

  tracker.moveWindow(
    0,
    windowSize - 1,
    {
      windowStart: 0,
      windowEnd: windowSize - 1,
      negativeIndices: [...negativeIndices],
      firstNegative: firstResult,
      result: [...result],
    },
    `Initial window [0, ${windowSize - 1}]: first negative = ${firstResult}`,
  );

  // Slide window
  for (let rightIndex = windowSize; rightIndex < arrayLength; rightIndex++) {
    const leftIndex = rightIndex - windowSize;

    // Remove indices out of window
    if (negativeIndices.length > 0 && negativeIndices[0]! <= leftIndex) {
      negativeIndices.shift();
      tracker.shrinkWindow(
        {
          removedIndex: leftIndex,
          negativeIndices: [...negativeIndices],
        },
        `Remove index ${leftIndex} from deque (out of window)`,
      );
    }

    // Add new element if negative
    const incomingElement = inputArray[rightIndex]!;
    if (incomingElement < 0) {
      negativeIndices.push(rightIndex);
      tracker.expandWindow(
        {
          addedIndex: rightIndex,
          addedElement: incomingElement,
          negativeIndices: [...negativeIndices],
        },
        `Add negative ${incomingElement} at index ${rightIndex} to deque`,
      );
    } else {
      tracker.visit(
        rightIndex,
        {
          element: incomingElement,
          negativeIndices: [...negativeIndices],
        },
        `Element ${incomingElement} at index ${rightIndex} is not negative, skip`,
      );
    }

    const windowFirstNegative = negativeIndices.length > 0 ? inputArray[negativeIndices[0]!]! : 0;
    result.push(windowFirstNegative);

    tracker.compareTwo(
      leftIndex + 1,
      rightIndex,
      {
        windowStart: leftIndex + 1,
        windowEnd: rightIndex,
        firstNegative: windowFirstNegative,
        result: [...result],
      },
      `Window [${leftIndex + 1}, ${rightIndex}]: first negative = ${windowFirstNegative}`,
    );
  }

  tracker.complete({ result: [...result] });

  return tracker.getSteps();
}
