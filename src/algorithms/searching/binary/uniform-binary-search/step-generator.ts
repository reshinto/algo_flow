/** Step generator for Uniform Binary Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.UNIFORM_BINARY_SEARCH!);

export function generateUniformBinarySearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(
    workingArray,
    targetValue,
    LINE_MAP,
    "uniform binary search",
  );

  const arrayLength = workingArray.length;

  // Build the delta lookup table
  const deltaTable: number[] = [];
  if (arrayLength > 0) {
    let deltaValue = Math.ceil(arrayLength / 2);
    while (deltaValue > 0) {
      deltaTable.push(deltaValue);
      if (deltaValue === 1) break;
      deltaValue = Math.ceil(deltaValue / 2);
    }
  }

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    arrayLength,
    deltaTable,
  });

  if (arrayLength === 0) {
    tracker.complete({ resultIndex: -1, targetValue }, false);
    return tracker.getSteps();
  }

  let currentIndex = (deltaTable[0] ?? 1) - 1;
  let stepLevel = 0;

  while (true) {
    const currentValue = workingArray[currentIndex]!;

    tracker.compare(
      currentIndex,
      { current: currentIndex },
      {
        currentIndex,
        currentValue,
        targetValue,
        stepLevel,
        delta: deltaTable[stepLevel] ?? 0,
      },
      `Compare arr[${currentIndex}]=${currentValue} with target ${targetValue}`,
    );

    if (currentValue === targetValue) {
      tracker.found(currentIndex, {
        currentIndex,
        resultIndex: currentIndex,
        targetValue,
      });
      tracker.complete({ resultIndex: currentIndex, targetValue }, true);
      return tracker.getSteps();
    }

    stepLevel++;
    const nextDelta = deltaTable[stepLevel] ?? 0;

    if (nextDelta === 0) {
      break;
    }

    if (currentValue < targetValue) {
      const eliminatedStart = 0;
      const eliminatedEnd = currentIndex;
      const previousIndex = currentIndex;
      currentIndex += nextDelta;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { current: currentIndex },
        {
          currentIndex,
          previousIndex,
          nextDelta,
          stepLevel,
          direction: "right",
        },
        `arr[${previousIndex}]=${currentValue} < ${targetValue}, move right by ${nextDelta} to index ${currentIndex}`,
      );

      if (currentIndex >= arrayLength) break;
    } else {
      const eliminatedStart = currentIndex;
      const eliminatedEnd = arrayLength - 1;
      const previousIndex = currentIndex;
      currentIndex -= nextDelta;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { current: currentIndex },
        {
          currentIndex,
          previousIndex,
          nextDelta,
          stepLevel,
          direction: "left",
        },
        `arr[${previousIndex}]=${currentValue} > ${targetValue}, move left by ${nextDelta} to index ${currentIndex}`,
      );

      if (currentIndex < 0) break;
    }
  }

  tracker.complete({ resultIndex: -1, targetValue }, false);
  return tracker.getSteps();
}
