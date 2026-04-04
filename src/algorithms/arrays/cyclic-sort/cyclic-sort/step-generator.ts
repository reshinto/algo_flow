/** Step generator for Cyclic Sort — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CYCLIC_SORT!);

interface CyclicSortInput {
  inputArray: number[];
}

export function generateCyclicSortSteps(input: CyclicSortInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    currentIndex: 0,
  });

  if (inputArray.length === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const workArray = [...inputArray];
  let currentIndex = 0;
  let swapCount = 0;

  while (currentIndex < workArray.length) {
    const currentValue = workArray[currentIndex]!;
    const correctIndex = currentValue - 1;

    tracker.visit(
      currentIndex,
      {
        currentIndex,
        currentValue,
        correctIndex,
        swapCount,
        isInPlace: currentValue === currentIndex + 1,
      },
      `Examine arr[${currentIndex}]=${currentValue} — correct position is index ${correctIndex}`,
    );

    if (
      correctIndex >= 0 &&
      correctIndex < workArray.length &&
      correctIndex !== currentIndex &&
      workArray[correctIndex] !== currentValue
    ) {
      tracker.swap(
        currentIndex,
        correctIndex,
        {
          currentIndex,
          correctIndex,
          currentValue,
          displacedValue: workArray[correctIndex]!,
          swapCount: swapCount + 1,
        },
        `Swap arr[${currentIndex}]=${currentValue} to its home at index ${correctIndex}`,
      );

      const tempValue = workArray[correctIndex]!;
      workArray[correctIndex] = workArray[currentIndex]!;
      workArray[currentIndex] = tempValue;
      swapCount++;
    } else {
      tracker.markElement(
        currentIndex,
        "sorted",
        { currentIndex, currentValue, swapCount },
        `arr[${currentIndex}]=${currentValue} is in its correct position`,
      );
      currentIndex++;
    }
  }

  tracker.complete({
    result: [...workArray],
    swapCount,
  });

  return tracker.getSteps();
}
