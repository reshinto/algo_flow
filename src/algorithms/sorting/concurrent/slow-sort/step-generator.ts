/** Step generator for Slow Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SLOW_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SLOW_SORT!);

export function generateSlowSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], SLOW_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;
  const sortedIndices = new Set<number>();

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  function slowSortRange(startIndex: number, endIndex: number): void {
    if (startIndex >= endIndex) {
      if (startIndex === endIndex) sortedIndices.add(startIndex);
      return;
    }

    const midIndex = Math.floor((startIndex + endIndex) / 2);

    slowSortRange(startIndex, midIndex);
    slowSortRange(midIndex + 1, endIndex);

    tracker.compare(midIndex, endIndex, {
      startIndex,
      midIndex,
      endIndex,
      leftMax: workingArray[midIndex],
      rightMax: workingArray[endIndex],
    });

    if (workingArray[midIndex]! > workingArray[endIndex]!) {
      const temporaryValue = workingArray[midIndex]!;
      workingArray[midIndex] = workingArray[endIndex]!;
      workingArray[endIndex] = temporaryValue;

      tracker.swap(midIndex, endIndex, {
        midIndex,
        endIndex,
        sortedArray: [...workingArray],
      });
    }

    sortedIndices.add(endIndex);
    tracker.markSorted(endIndex, {
      endIndex,
      maxValue: workingArray[endIndex],
    });

    slowSortRange(startIndex, endIndex - 1);
  }

  slowSortRange(0, arrayLength - 1);

  // Mark any remaining elements that weren't explicitly marked during recursion
  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    if (!sortedIndices.has(sortedIndex)) {
      tracker.markSorted(sortedIndex, { sortedIndex });
    }
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
