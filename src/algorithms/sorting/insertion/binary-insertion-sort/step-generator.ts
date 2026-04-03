/** Step generator for Binary Insertion Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BINARY_INSERTION_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BINARY_INSERTION_SORT!);

export function generateBinaryInsertionSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BINARY_INSERTION_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  for (let outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
    const currentElement = workingArray[outerIndex]!;
    let searchLeft = 0;
    let searchRight = outerIndex - 1;

    // Binary search phase
    while (searchLeft <= searchRight) {
      const midIndex = Math.floor((searchLeft + searchRight) / 2);

      tracker.compare(outerIndex, midIndex, {
        outerIndex,
        currentElement,
        searchLeft,
        searchRight,
        midIndex,
      });

      if (currentElement < workingArray[midIndex]!) {
        searchRight = midIndex - 1;
      } else {
        searchLeft = midIndex + 1;
      }
    }

    // Shift phase — shift elements right to open the insertion slot
    let shiftIndex = outerIndex - 1;
    while (shiftIndex >= searchLeft) {
      workingArray[shiftIndex + 1] = workingArray[shiftIndex]!;

      tracker.swap(shiftIndex, shiftIndex + 1, {
        outerIndex,
        shiftIndex,
        insertPosition: searchLeft,
        sortedArray: [...workingArray],
      });

      shiftIndex--;
    }
    workingArray[searchLeft] = currentElement;

    tracker.markSorted(outerIndex, {
      outerIndex,
      insertPosition: searchLeft,
      sortedArray: [...workingArray],
    });
  }

  // Mark index 0 as sorted (it was trivially sorted from the start)
  tracker.markSorted(0, { outerIndex: 0, sortedPosition: 0 });

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
