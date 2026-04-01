/** Step generator for Search in Rotated Sorted Array — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SEARCH_ROTATED_ARRAY!);

export function generateSearchRotatedArraySteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(
    workingArray,
    targetValue,
    LINE_MAP,
    "search in rotated sorted array",
  );

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
    const lowValue = workingArray[lowIndex]!;
    const highValue = workingArray[highIndex]!;
    const pointers = { low: lowIndex, mid: midIndex, high: highIndex };

    tracker.compare(
      midIndex,
      pointers,
      { lowIndex, highIndex, midIndex, midValue, targetValue, lowValue, highValue },
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
    }

    if (lowValue <= midValue) {
      // Left half is sorted
      if (lowValue <= targetValue && targetValue < midValue) {
        // Target is in the sorted left half
        const eliminatedStart = midIndex;
        const eliminatedEnd = highIndex;
        highIndex = midIndex - 1;

        tracker.eliminate(
          eliminatedStart,
          eliminatedEnd,
          { low: lowIndex, high: highIndex },
          { lowIndex, highIndex, midValue, targetValue, note: "target in sorted left half" },
          `Left half [${lowValue}..${midValue}] is sorted and contains target — eliminate right half`,
        );
      } else {
        // Target is in the right half
        const eliminatedStart = lowIndex;
        const eliminatedEnd = midIndex;
        lowIndex = midIndex + 1;

        tracker.eliminate(
          eliminatedStart,
          eliminatedEnd,
          { low: lowIndex, high: highIndex },
          { lowIndex, highIndex, midValue, targetValue, note: "target not in sorted left half" },
          `Target not in sorted left half [${lowValue}..${midValue}] — eliminate left half`,
        );
      }
    } else {
      // Right half is sorted
      if (midValue < targetValue && targetValue <= highValue) {
        // Target is in the sorted right half
        const eliminatedStart = lowIndex;
        const eliminatedEnd = midIndex;
        lowIndex = midIndex + 1;

        tracker.eliminate(
          eliminatedStart,
          eliminatedEnd,
          { low: lowIndex, high: highIndex },
          { lowIndex, highIndex, midValue, targetValue, note: "target in sorted right half" },
          `Right half [${midValue}..${highValue}] is sorted and contains target — eliminate left half`,
        );
      } else {
        // Target is in the left half
        const eliminatedStart = midIndex;
        const eliminatedEnd = highIndex;
        highIndex = midIndex - 1;

        tracker.eliminate(
          eliminatedStart,
          eliminatedEnd,
          { low: lowIndex, high: highIndex },
          { lowIndex, highIndex, midValue, targetValue, note: "target not in sorted right half" },
          `Target not in sorted right half [${midValue}..${highValue}] — eliminate right half`,
        );
      }
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
