/** Step generator for Comb Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const COMB_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COMB_SORT!);

const SHRINK_FACTOR = 1.3;

export function generateCombSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], COMB_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  let gap = arrayLength;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / SHRINK_FACTOR);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    tracker.compare(0, gap, {
      gap,
      phase: "gap-update",
    });

    for (let startIndex = 0; startIndex + gap < arrayLength; startIndex++) {
      const compareIndex = startIndex + gap;

      tracker.compare(startIndex, compareIndex, {
        startIndex,
        compareIndex,
        gap,
      });

      if (workingArray[startIndex]! > workingArray[compareIndex]!) {
        const temporaryValue = workingArray[startIndex]!;
        workingArray[startIndex] = workingArray[compareIndex]!;
        workingArray[compareIndex] = temporaryValue;
        sorted = false;

        tracker.swap(startIndex, compareIndex, {
          startIndex,
          compareIndex,
          gap,
          sortedArray: [...workingArray],
        });
      }
    }
  }

  // Mark all elements as sorted
  for (let sortIndex = 0; sortIndex < arrayLength; sortIndex++) {
    tracker.markSorted(sortIndex, { sortIndex });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
