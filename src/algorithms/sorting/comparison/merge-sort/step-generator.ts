/** Step generator for Merge Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MERGE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MERGE_SORT!);

export function generateMergeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], MERGE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  function mergeSortRecursive(leftStart: number, rightEnd: number): void {
    if (rightEnd - leftStart <= 1) return;

    const midPoint = Math.floor((leftStart + rightEnd) / 2);

    mergeSortRecursive(leftStart, midPoint);
    mergeSortRecursive(midPoint, rightEnd);

    // Copy left and right halves for merging
    const leftHalf = workingArray.slice(leftStart, midPoint);
    const rightHalf = workingArray.slice(midPoint, rightEnd);

    let leftIndex = 0;
    let rightIndex = 0;
    let mergePosition = leftStart;

    while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
      const leftValue = leftHalf[leftIndex]!;
      const rightValue = rightHalf[rightIndex]!;

      tracker.compare(leftStart + leftIndex, midPoint + rightIndex, {
        leftStart,
        midPoint,
        rightEnd,
        mergePosition,
        leftValue,
        rightValue,
      });

      if (leftValue <= rightValue) {
        workingArray[mergePosition] = leftValue;
        tracker.swap(leftStart + leftIndex, mergePosition, {
          leftStart,
          mergePosition,
          placedValue: leftValue,
          sortedArray: [...workingArray],
        });
        leftIndex++;
      } else {
        workingArray[mergePosition] = rightValue;
        tracker.swap(midPoint + rightIndex, mergePosition, {
          leftStart,
          mergePosition,
          placedValue: rightValue,
          sortedArray: [...workingArray],
        });
        rightIndex++;
      }
      mergePosition++;
    }

    while (leftIndex < leftHalf.length) {
      workingArray[mergePosition] = leftHalf[leftIndex]!;
      mergePosition++;
      leftIndex++;
    }

    while (rightIndex < rightHalf.length) {
      workingArray[mergePosition] = rightHalf[rightIndex]!;
      mergePosition++;
      rightIndex++;
    }

    // Mark the merged segment as sorted at this level
    for (let markIndex = leftStart; markIndex < rightEnd; markIndex++) {
      if (rightEnd === arrayLength && leftStart === 0) {
        tracker.markSorted(markIndex, { mergedSegment: [leftStart, rightEnd] });
      }
    }
  }

  mergeSortRecursive(0, arrayLength);

  // Mark all elements sorted on the final complete merge if not already done
  if (arrayLength <= 1) {
    for (let markIndex = 0; markIndex < arrayLength; markIndex++) {
      tracker.markSorted(markIndex, { sortedPosition: markIndex });
    }
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
