import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import type { LineMap } from "@/trackers";

/*
 * Line mapping: step type → source file line numbers per language.
 *
 * Binary Search halves the search range on each iteration by comparing
 * the middle element to the target. If mid < target the lower half is
 * discarded; if mid > target the upper half is discarded. Returns -1
 * when the range is exhausted without finding the target.
 */
const BINARY_SEARCH_LINE_MAP: LineMap = {
  /* Set low/high pointers to the full array bounds */
  initialize: {
    typescript: [1, 2, 3],
    python: [1, 2, 3],
    java: [2, 3, 4],
  },
  /* Compute midIndex and read midValue for comparison */
  compare: {
    typescript: [6, 7, 9],
    python: [6, 7, 9],
    java: [7, 8, 10],
  },
  /* Discard the half that cannot contain the target */
  eliminate: {
    typescript: [11, 12, 13, 14],
    python: [11, 12, 13, 14],
    java: [12, 13, 14, 15],
  },
  /* midValue matches targetValue — return the index */
  found: {
    typescript: [9, 10],
    python: [9, 10],
    java: [10, 11],
  },
  /* Search range exhausted — target not in array */
  complete: {
    typescript: [18],
    python: [16],
    java: [19],
  },
};

export function generateBinarySearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, BINARY_SEARCH_LINE_MAP);

  let lowIndex = 0;
  let highIndex = workingArray.length - 1;

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    lowIndex,
    highIndex,
  });

  let foundTarget = false;
  let foundIndex = -1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midValue = workingArray[midIndex]!;

    const pointers = { low: lowIndex, mid: midIndex, high: highIndex };

    tracker.compare(
      midIndex,
      pointers,
      {
        lowIndex,
        highIndex,
        midIndex,
        midValue,
        targetValue,
      },
      `Compare midValue ${midValue} with target ${targetValue}`,
    );

    if (midValue === targetValue) {
      foundIndex = midIndex;
      tracker.found(midIndex, {
        lowIndex,
        highIndex,
        midIndex,
        resultIndex: midIndex,
      });
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
        {
          lowIndex,
          highIndex,
          midValue,
          targetValue,
        },
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
        {
          lowIndex,
          highIndex,
          midValue,
          targetValue,
        },
        `${midValue} > ${targetValue}, eliminate right half (indices ${eliminatedStart}-${eliminatedEnd})`,
      );
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
