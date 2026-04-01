/** Step generator for Exponential Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.EXPONENTIAL_SEARCH!);

export function generateExponentialSearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "exponential search");

  const arrayLength = workingArray.length;

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    arrayLength,
  });

  if (arrayLength === 0) {
    tracker.complete({ resultIndex: -1, targetValue }, false);
    return tracker.getSteps();
  }

  // Check first element
  const firstValue = workingArray[0]!;
  tracker.visit(0, { bound: 0 }, { boundIndex: 0, firstValue, targetValue });

  if (firstValue === targetValue) {
    tracker.found(0, { resultIndex: 0 });
    tracker.complete({ resultIndex: 0, targetValue }, true);
    return tracker.getSteps();
  }

  // Phase 1: exponential probing
  let boundIndex = 1;
  while (boundIndex < arrayLength && workingArray[boundIndex]! <= targetValue) {
    const probedValue = workingArray[boundIndex]!;
    tracker.visit(boundIndex, { bound: boundIndex }, { boundIndex, probedValue, targetValue });
    boundIndex = boundIndex * 2;
  }

  // Phase 2: binary search within the bounded range
  let lowIndex = Math.floor(boundIndex / 2);
  let highIndex = Math.min(boundIndex, arrayLength - 1);

  tracker.compare(
    Math.floor((lowIndex + highIndex) / 2),
    { low: lowIndex, high: highIndex },
    { lowIndex, highIndex, targetValue },
    `Binary search range set: indices ${lowIndex} to ${highIndex}`,
  );

  let foundTarget = false;
  let foundIndex = -1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midValue = workingArray[midIndex]!;
    const pointers = { low: lowIndex, mid: midIndex, high: highIndex };

    tracker.compare(
      midIndex,
      pointers,
      { lowIndex, highIndex, midIndex, midValue, targetValue },
      `Compare midValue ${midValue} with target ${targetValue}`,
    );

    if (midValue === targetValue) {
      foundIndex = midIndex;
      tracker.found(midIndex, { lowIndex, highIndex, midIndex, resultIndex: midIndex });
      foundTarget = true;
      break;
    } else if (midValue < targetValue) {
      const eliminatedStart = lowIndex;
      const eliminatedEnd = midIndex;
      lowIndex = midIndex + 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: highIndex },
        { lowIndex, highIndex, midValue, targetValue },
        `${midValue} < ${targetValue}, eliminate left half (indices ${eliminatedStart}-${eliminatedEnd})`,
      );
    } else {
      const eliminatedStart = midIndex;
      const eliminatedEnd = highIndex;
      highIndex = midIndex - 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: highIndex },
        { lowIndex, highIndex, midValue, targetValue },
        `${midValue} > ${targetValue}, eliminate right half (indices ${eliminatedStart}-${eliminatedEnd})`,
      );
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
