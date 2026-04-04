/** Step generator for Stooge Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const STOOGE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.STOOGE_SORT!);

export function generateStoogeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], STOOGE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  function stoogeSortRange(startIndex: number, endIndex: number): void {
    if (startIndex >= endIndex) return;

    tracker.compare(startIndex, endIndex, {
      startIndex,
      endIndex,
      rangeLength: endIndex - startIndex + 1,
    });

    if (workingArray[startIndex]! > workingArray[endIndex]!) {
      const temporaryValue = workingArray[startIndex]!;
      workingArray[startIndex] = workingArray[endIndex]!;
      workingArray[endIndex] = temporaryValue;

      tracker.swap(startIndex, endIndex, {
        startIndex,
        endIndex,
        sortedArray: [...workingArray],
      });
    }

    const rangeLength = endIndex - startIndex + 1;
    if (rangeLength > 2) {
      const thirdLength = Math.floor(rangeLength / 3);

      stoogeSortRange(startIndex, endIndex - thirdLength);
      stoogeSortRange(startIndex + thirdLength, endIndex);
      stoogeSortRange(startIndex, endIndex - thirdLength);
    }
  }

  stoogeSortRange(0, arrayLength - 1);

  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, { sortedIndex });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
