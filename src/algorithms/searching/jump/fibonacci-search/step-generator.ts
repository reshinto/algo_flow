/** Step generator for Fibonacci Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIBONACCI_SEARCH!);

export function generateFibonacciSearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "fibonacci search");

  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: workingArray, targetValue, arrayLength });
    tracker.complete({ resultIndex: -1, targetValue }, false);
    return tracker.getSteps();
  }

  let fibM2 = 0;
  let fibM1 = 1;
  let fibM = fibM1 + fibM2;

  while (fibM < arrayLength) {
    fibM2 = fibM1;
    fibM1 = fibM;
    fibM = fibM1 + fibM2;
  }

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    arrayLength,
    fibM,
    fibM1,
    fibM2,
  });

  let offset = -1;
  let foundIndex = -1;
  let foundTarget = false;

  while (fibM > 1) {
    const compareIndex = Math.min(offset + fibM2, arrayLength - 1);
    const compareValue = workingArray[compareIndex]!;

    tracker.compare(
      compareIndex,
      { compareIndex, offset },
      { fibM, fibM1, fibM2, offset, compareIndex, compareValue, targetValue },
      `Compare element ${compareValue} at index ${compareIndex} with target ${targetValue}`,
    );

    if (compareValue < targetValue) {
      const eliminatedEnd = compareIndex;
      fibM = fibM1;
      fibM1 = fibM2;
      fibM2 = fibM - fibM1;
      const previousOffset = offset;
      offset = compareIndex;

      tracker.eliminate(
        previousOffset + 1,
        eliminatedEnd,
        { compareIndex, offset },
        { fibM, fibM1, fibM2, offset, targetValue },
        `${compareValue} < ${targetValue}, eliminate left portion (indices ${previousOffset + 1}–${eliminatedEnd})`,
      );
    } else if (compareValue > targetValue) {
      const eliminatedStart = compareIndex;
      fibM = fibM2;
      fibM1 = fibM1 - fibM2;
      fibM2 = fibM - fibM1;

      tracker.eliminate(
        eliminatedStart,
        arrayLength - 1,
        { compareIndex, offset },
        { fibM, fibM1, fibM2, offset, targetValue },
        `${compareValue} > ${targetValue}, eliminate right portion (from index ${eliminatedStart})`,
      );
    } else {
      foundIndex = compareIndex;
      foundTarget = true;
      tracker.found(compareIndex, {
        fibM,
        fibM1,
        fibM2,
        offset,
        resultIndex: compareIndex,
        compareValue,
        targetValue,
      });
      break;
    }
  }

  if (!foundTarget && fibM1 === 1 && offset + 1 < arrayLength) {
    const remainingIndex = offset + 1;
    const remainingValue = workingArray[remainingIndex]!;

    tracker.compare(
      remainingIndex,
      { compareIndex: remainingIndex, offset },
      { fibM1, offset, compareIndex: remainingIndex, remainingValue, targetValue },
      `Check remaining element ${remainingValue} at index ${remainingIndex}`,
    );

    if (remainingValue === targetValue) {
      foundIndex = remainingIndex;
      foundTarget = true;
      tracker.found(remainingIndex, { resultIndex: remainingIndex, remainingValue, targetValue });
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
