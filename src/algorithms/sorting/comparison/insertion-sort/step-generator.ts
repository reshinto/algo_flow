/** Step generator for Insertion Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const INSERTION_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INSERTION_SORT!);

export function generateInsertionSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], INSERTION_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  // The first element is trivially sorted; mark it before the loop begins
  if (arrayLength > 0) {
    tracker.markSorted(0, { outerIndex: 0, sortedPosition: 0 });
  }

  for (let outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
    const currentValue = workingArray[outerIndex]!;
    let innerIndex = outerIndex - 1;

    while (innerIndex >= 0 && workingArray[innerIndex]! > currentValue) {
      tracker.compare(innerIndex, outerIndex, {
        outerIndex,
        innerIndex,
        currentValue,
      });

      // Shift element right
      workingArray[innerIndex + 1] = workingArray[innerIndex]!;

      tracker.swap(innerIndex, innerIndex + 1, {
        outerIndex,
        innerIndex,
        currentValue,
        sortedArray: [...workingArray],
      });

      innerIndex--;
    }

    // If innerIndex did not move, still record the comparison that terminated the while loop
    if (innerIndex === outerIndex - 1 && outerIndex > 0) {
      tracker.compare(innerIndex, outerIndex, {
        outerIndex,
        innerIndex,
        currentValue,
      });
    }

    workingArray[innerIndex + 1] = currentValue;

    tracker.markSorted(outerIndex, {
      outerIndex,
      insertedAt: innerIndex + 1,
      currentValue,
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
