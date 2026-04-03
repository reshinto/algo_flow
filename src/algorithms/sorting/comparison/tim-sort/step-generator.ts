/** Step generator for Tim Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TIM_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TIM_SORT!);

const MIN_RUN_SIZE = 4;

function insertionSortRun(
  workingArray: number[],
  tracker: SortingTracker,
  runStart: number,
  runEnd: number,
): void {
  for (let outerIndex = runStart + 1; outerIndex <= runEnd; outerIndex++) {
    const currentValue = workingArray[outerIndex]!;
    let innerIndex = outerIndex - 1;

    while (innerIndex >= runStart) {
      tracker.compare(innerIndex, outerIndex, {
        outerIndex,
        innerIndex,
        currentValue,
        phase: "insertion-pass",
      });

      if (workingArray[innerIndex]! > currentValue) {
        workingArray[innerIndex + 1] = workingArray[innerIndex]!;
        workingArray[innerIndex] = currentValue;
        tracker.swap(innerIndex + 1, innerIndex, {
          outerIndex,
          innerIndex,
          phase: "insertion-pass",
        });
        innerIndex--;
      } else {
        break;
      }
    }
  }

  // Sync tracker after each insertion sort run
  for (let syncIdx = runStart; syncIdx <= runEnd; syncIdx++) {
    tracker.setElementValue(syncIdx, workingArray[syncIdx]!);
  }
}

function mergeRuns(
  workingArray: number[],
  tracker: SortingTracker,
  leftStart: number,
  midPoint: number,
  rightEnd: number,
): void {
  const leftSlice = workingArray.slice(leftStart, midPoint + 1);
  const rightSlice = workingArray.slice(midPoint + 1, rightEnd + 1);

  let leftPointer = 0;
  let rightPointer = 0;
  let mergeIndex = leftStart;

  while (leftPointer < leftSlice.length && rightPointer < rightSlice.length) {
    const leftVal = leftSlice[leftPointer]!;
    const rightVal = rightSlice[rightPointer]!;

    tracker.compare(leftStart + leftPointer, midPoint + 1 + rightPointer, {
      leftPointer,
      rightPointer,
      mergeIndex,
      phase: "merge",
    });

    if (leftVal <= rightVal) {
      workingArray[mergeIndex] = leftVal;
      leftPointer++;
    } else {
      workingArray[mergeIndex] = rightVal;
      tracker.swap(mergeIndex, midPoint + 1 + rightPointer, {
        mergeIndex,
        phase: "merge",
      });
      rightPointer++;
    }
    mergeIndex++;
  }

  while (leftPointer < leftSlice.length) {
    workingArray[mergeIndex++] = leftSlice[leftPointer++]!;
  }
  while (rightPointer < rightSlice.length) {
    workingArray[mergeIndex++] = rightSlice[rightPointer++]!;
  }

  // Sync tracker after merge completes
  for (let syncIdx = leftStart; syncIdx <= rightEnd; syncIdx++) {
    tracker.setElementValue(syncIdx, workingArray[syncIdx]!);
  }
}

export function generateTimSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], TIM_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength, minRunSize: MIN_RUN_SIZE });

  // Phase 1: insertion sort each run
  for (let runStart = 0; runStart < arrayLength; runStart += MIN_RUN_SIZE) {
    const runEnd = Math.min(runStart + MIN_RUN_SIZE - 1, arrayLength - 1);
    insertionSortRun(workingArray, tracker, runStart, runEnd);
  }

  // Phase 2: merge runs
  for (let mergeSize = MIN_RUN_SIZE; mergeSize < arrayLength; mergeSize *= 2) {
    for (let leftStart = 0; leftStart < arrayLength; leftStart += 2 * mergeSize) {
      const midPoint = Math.min(leftStart + mergeSize - 1, arrayLength - 1);
      const rightEnd = Math.min(leftStart + 2 * mergeSize - 1, arrayLength - 1);

      if (midPoint < rightEnd) {
        mergeRuns(workingArray, tracker, leftStart, midPoint, rightEnd);
      }
    }
  }

  // Mark all elements sorted
  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, { sortedIndex, result: [...workingArray] });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
