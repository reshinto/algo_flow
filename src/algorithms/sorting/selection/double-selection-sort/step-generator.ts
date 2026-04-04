/** Step generator for Double Selection Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DOUBLE_SELECTION_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DOUBLE_SELECTION_SORT!);

export function generateDoubleSelectionSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], DOUBLE_SELECTION_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  let leftBound = 0;
  let rightBound = arrayLength - 1;

  while (leftBound < rightBound) {
    let minimumIndex = leftBound;
    let maximumIndex = leftBound;

    // Scan for both minimum and maximum simultaneously
    for (let scanIndex = leftBound + 1; scanIndex <= rightBound; scanIndex++) {
      tracker.compare(scanIndex, minimumIndex, {
        leftBound,
        rightBound,
        scanIndex,
        minimumIndex,
        maximumIndex,
      });

      if (workingArray[scanIndex]! < workingArray[minimumIndex]!) {
        minimumIndex = scanIndex;
      }

      tracker.compare(scanIndex, maximumIndex, {
        leftBound,
        rightBound,
        scanIndex,
        minimumIndex,
        maximumIndex,
      });

      if (workingArray[scanIndex]! > workingArray[maximumIndex]!) {
        maximumIndex = scanIndex;
      }
    }

    // Swap minimum to left bound
    if (minimumIndex !== leftBound) {
      const temporaryMin = workingArray[leftBound]!;
      workingArray[leftBound] = workingArray[minimumIndex]!;
      workingArray[minimumIndex] = temporaryMin;

      tracker.swap(leftBound, minimumIndex, {
        leftBound,
        rightBound,
        minimumIndex,
        swappingMin: true,
        sortedArray: [...workingArray],
      });

      if (maximumIndex === leftBound) {
        maximumIndex = minimumIndex;
      }
    }

    // Swap maximum to right bound
    if (maximumIndex !== rightBound) {
      const temporaryMax = workingArray[rightBound]!;
      workingArray[rightBound] = workingArray[maximumIndex]!;
      workingArray[maximumIndex] = temporaryMax;

      tracker.swap(rightBound, maximumIndex, {
        leftBound,
        rightBound,
        maximumIndex,
        swappingMax: true,
        sortedArray: [...workingArray],
      });
    }

    // Mark both ends as sorted
    tracker.markSorted(leftBound, {
      leftBound,
      rightBound,
      sortedPosition: leftBound,
    });

    tracker.markSorted(rightBound, {
      leftBound,
      rightBound,
      sortedPosition: rightBound,
    });

    leftBound++;
    rightBound--;
  }

  // If array length is odd, the middle element is trivially sorted
  if (leftBound === rightBound) {
    tracker.markSorted(leftBound, { sortedPosition: leftBound });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
