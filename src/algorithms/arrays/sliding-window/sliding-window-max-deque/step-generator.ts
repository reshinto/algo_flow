/** Step generator for Sliding Window Maximum (Deque) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SLIDING_WINDOW_MAX_DEQUE!);

interface SlidingWindowMaxDequeInput {
  inputArray: number[];
  windowSize: number;
}

export function generateSlidingWindowMaxDequeSteps(
  input: SlidingWindowMaxDequeInput,
): ExecutionStep[] {
  const { inputArray, windowSize } = input;
  const arrayLength = inputArray.length;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  if (arrayLength === 0 || windowSize <= 0 || windowSize > arrayLength) {
    tracker.initialize({ arrayLength, windowSize });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const result: number[] = [];
  const deque: number[] = [];

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    windowSize,
    dequeContents: [],
    result: [],
  });

  for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
    const windowStart = currentIndex - windowSize + 1;

    /* Expire front of deque if it has left the window */
    while (deque.length > 0 && deque[0]! < windowStart) {
      const expiredIndex = deque.shift()!;
      tracker.visit(
        expiredIndex,
        {
          currentIndex,
          windowStart,
          expiredIndex,
          dequeContents: [...deque],
          result: [...result],
        },
        `Expire index ${expiredIndex} (outside window starting at ${windowStart})`,
      );
    }

    /* Remove from back any index whose element is smaller than inputArray[currentIndex] */
    while (deque.length > 0 && inputArray[deque[deque.length - 1]!]! < inputArray[currentIndex]!) {
      const smallerIndex = deque.pop()!;
      tracker.compareTwo(
        smallerIndex,
        currentIndex,
        {
          currentIndex,
          smallerIndex,
          smallerValue: inputArray[smallerIndex],
          currentValue: inputArray[currentIndex],
          dequeContents: [...deque],
          result: [...result],
        },
        `Remove index ${smallerIndex} (value=${inputArray[smallerIndex]}) — smaller than current ${inputArray[currentIndex]!}`,
      );
    }

    deque.push(currentIndex);

    tracker.moveWindow(
      Math.max(0, windowStart),
      currentIndex,
      {
        currentIndex,
        windowStart: Math.max(0, windowStart),
        dequeContents: [...deque],
        dequeMaxIndex: deque[0],
        dequeMaxValue: inputArray[deque[0]!],
        result: [...result],
      },
      `Push index ${currentIndex} (value=${inputArray[currentIndex]!}) onto deque`,
    );

    if (currentIndex >= windowSize - 1) {
      const maxValue = inputArray[deque[0]!]!;
      result.push(maxValue);

      tracker.markElement(
        deque[0]!,
        "found",
        {
          currentIndex,
          windowStart,
          windowMax: maxValue,
          windowMaxIndex: deque[0],
          result: [...result],
        },
        `Window [${windowStart}, ${currentIndex}] max = ${maxValue} at index ${deque[0]!}`,
        "visit",
      );
    }
  }

  tracker.complete({ result, windowSize, totalWindows: result.length });

  return tracker.getSteps();
}
