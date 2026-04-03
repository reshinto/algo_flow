/** Step generator for Intro Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const INTRO_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INTRO_SORT!);

const INSERTION_SORT_THRESHOLD = 16;

function insertionSortSlice(
  workingArray: number[],
  tracker: SortingTracker,
  sliceStart: number,
  sliceEnd: number,
): void {
  for (let outerIndex = sliceStart + 1; outerIndex <= sliceEnd; outerIndex++) {
    const currentValue = workingArray[outerIndex]!;
    let innerIndex = outerIndex - 1;

    while (innerIndex >= sliceStart) {
      tracker.compare(innerIndex, outerIndex, {
        outerIndex,
        innerIndex,
        currentValue,
        phase: "insertion",
      });

      if (workingArray[innerIndex]! > currentValue) {
        workingArray[innerIndex + 1] = workingArray[innerIndex]!;
        workingArray[innerIndex] = currentValue;
        tracker.swap(innerIndex + 1, innerIndex, {
          outerIndex,
          innerIndex,
          phase: "insertion",
        });
        innerIndex--;
      } else {
        break;
      }
    }
  }

  // Sync tracker after insertion sort completes for this slice
  for (let syncIdx = sliceStart; syncIdx <= sliceEnd; syncIdx++) {
    tracker.setElementValue(syncIdx, workingArray[syncIdx]!);
  }
}

function heapify(
  workingArray: number[],
  tracker: SortingTracker,
  heapSize: number,
  rootIndex: number,
  heapOffset: number,
): void {
  let largestIndex = rootIndex;
  const leftChild = 2 * rootIndex + 1;
  const rightChild = 2 * rootIndex + 2;

  if (leftChild < heapSize) {
    tracker.compare(heapOffset + leftChild, heapOffset + largestIndex, {
      rootIndex,
      leftChild,
      phase: "heapify",
    });
    if (workingArray[heapOffset + leftChild]! > workingArray[heapOffset + largestIndex]!) {
      largestIndex = leftChild;
    }
  }
  if (rightChild < heapSize) {
    tracker.compare(heapOffset + rightChild, heapOffset + largestIndex, {
      rootIndex,
      rightChild,
      phase: "heapify",
    });
    if (workingArray[heapOffset + rightChild]! > workingArray[heapOffset + largestIndex]!) {
      largestIndex = rightChild;
    }
  }

  if (largestIndex !== rootIndex) {
    const temporaryValue = workingArray[heapOffset + rootIndex]!;
    workingArray[heapOffset + rootIndex] = workingArray[heapOffset + largestIndex]!;
    workingArray[heapOffset + largestIndex] = temporaryValue;
    tracker.swap(heapOffset + rootIndex, heapOffset + largestIndex, {
      rootIndex,
      largestIndex,
      phase: "heapify",
    });
    heapify(workingArray, tracker, heapSize, largestIndex, heapOffset);
  }
}

function heapSortSlice(
  workingArray: number[],
  tracker: SortingTracker,
  sliceStart: number,
  sliceEnd: number,
): void {
  const sliceLength = sliceEnd - sliceStart + 1;

  for (let buildIndex = Math.floor(sliceLength / 2) - 1; buildIndex >= 0; buildIndex--) {
    heapify(workingArray, tracker, sliceLength, buildIndex, sliceStart);
  }

  for (let extractIndex = sliceLength - 1; extractIndex > 0; extractIndex--) {
    const temporaryValue = workingArray[sliceStart]!;
    workingArray[sliceStart] = workingArray[sliceStart + extractIndex]!;
    workingArray[sliceStart + extractIndex] = temporaryValue;
    tracker.swap(sliceStart, sliceStart + extractIndex, {
      extractIndex,
      phase: "heap-extract",
    });
    heapify(workingArray, tracker, extractIndex, 0, sliceStart);
  }
}

function lomutoPartition(
  workingArray: number[],
  tracker: SortingTracker,
  partitionStart: number,
  partitionEnd: number,
): number {
  const pivotValue = workingArray[partitionEnd]!;
  let partitionIndex = partitionStart - 1;

  for (let scanIndex = partitionStart; scanIndex < partitionEnd; scanIndex++) {
    tracker.compare(scanIndex, partitionEnd, {
      scanIndex,
      partitionEnd,
      pivotValue,
      phase: "partition",
    });

    if (workingArray[scanIndex]! <= pivotValue) {
      partitionIndex++;
      const temporaryValue = workingArray[partitionIndex]!;
      workingArray[partitionIndex] = workingArray[scanIndex]!;
      workingArray[scanIndex] = temporaryValue;
      tracker.swap(partitionIndex, scanIndex, {
        partitionIndex,
        scanIndex,
        phase: "partition",
      });
    }
  }

  const temporaryValue = workingArray[partitionIndex + 1]!;
  workingArray[partitionIndex + 1] = workingArray[partitionEnd]!;
  workingArray[partitionEnd] = temporaryValue;
  tracker.swap(partitionIndex + 1, partitionEnd, {
    pivotFinalIndex: partitionIndex + 1,
    phase: "pivot-placed",
  });
  return partitionIndex + 1;
}

function introSortRecurse(
  workingArray: number[],
  tracker: SortingTracker,
  rangeStart: number,
  rangeEnd: number,
  depthLimit: number,
): void {
  const rangeSize = rangeEnd - rangeStart + 1;

  if (rangeSize <= 1) return;

  if (rangeSize <= INSERTION_SORT_THRESHOLD) {
    insertionSortSlice(workingArray, tracker, rangeStart, rangeEnd);
    return;
  }

  if (depthLimit === 0) {
    heapSortSlice(workingArray, tracker, rangeStart, rangeEnd);
    return;
  }

  const pivotIndex = lomutoPartition(workingArray, tracker, rangeStart, rangeEnd);
  introSortRecurse(workingArray, tracker, rangeStart, pivotIndex - 1, depthLimit - 1);
  introSortRecurse(workingArray, tracker, pivotIndex + 1, rangeEnd, depthLimit - 1);
}

export function generateIntroSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], INTRO_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  const depthLimit = arrayLength > 1 ? 2 * Math.floor(Math.log2(arrayLength)) : 0;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength, depthLimit });

  if (arrayLength > 1) {
    introSortRecurse(workingArray, tracker, 0, arrayLength - 1, depthLimit);
  }

  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, { sortedIndex, result: [...workingArray] });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
