/** Step generator for Selection Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SELECTION_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SELECTION_SORT!);

export function generateSelectionSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], SELECTION_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  for (let outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
    let minimumIndex = outerIndex;

    for (let innerIndex = outerIndex + 1; innerIndex < arrayLength; innerIndex++) {
      tracker.compare(innerIndex, minimumIndex, {
        outerIndex,
        innerIndex,
        minimumIndex,
      });

      if (workingArray[innerIndex]! < workingArray[minimumIndex]!) {
        minimumIndex = innerIndex;
      }
    }

    if (minimumIndex !== outerIndex) {
      const temporaryValue = workingArray[outerIndex]!;
      workingArray[outerIndex] = workingArray[minimumIndex]!;
      workingArray[minimumIndex] = temporaryValue;

      tracker.swap(outerIndex, minimumIndex, {
        outerIndex,
        minimumIndex,
        sortedArray: [...workingArray],
      });
    }

    tracker.markSorted(outerIndex, {
      outerIndex,
      sortedPosition: outerIndex,
    });
  }

  // The last element is implicitly in its sorted position after the loop
  tracker.markSorted(arrayLength - 1, {
    outerIndex: arrayLength - 1,
    sortedPosition: arrayLength - 1,
  });

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
