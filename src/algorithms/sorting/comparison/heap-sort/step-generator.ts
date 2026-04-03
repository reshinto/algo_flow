/** Step generator for Heap Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_SORT!);

export function generateHeapSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], HEAP_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  function siftDown(rootIndex: number, heapSize: number): void {
    let largestIndex = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    if (leftChild < heapSize) {
      tracker.compare(leftChild, largestIndex, {
        rootIndex,
        leftChild,
        rightChild,
        heapSize,
        phase: "sift-down",
      });
      if (workingArray[leftChild]! > workingArray[largestIndex]!) {
        largestIndex = leftChild;
      }
    }

    if (rightChild < heapSize) {
      tracker.compare(rightChild, largestIndex, {
        rootIndex,
        leftChild,
        rightChild,
        heapSize,
        phase: "sift-down",
      });
      if (workingArray[rightChild]! > workingArray[largestIndex]!) {
        largestIndex = rightChild;
      }
    }

    if (largestIndex !== rootIndex) {
      const temporaryValue = workingArray[rootIndex]!;
      workingArray[rootIndex] = workingArray[largestIndex]!;
      workingArray[largestIndex] = temporaryValue;

      tracker.swap(rootIndex, largestIndex, {
        rootIndex,
        largestIndex,
        heapSize,
        sortedArray: [...workingArray],
      });

      siftDown(largestIndex, heapSize);
    }
  }

  // Phase 1: Build the max-heap
  for (let buildIndex = Math.floor(arrayLength / 2) - 1; buildIndex >= 0; buildIndex--) {
    siftDown(buildIndex, arrayLength);
  }

  // Phase 2: Extract maximum elements
  for (let extractIndex = arrayLength - 1; extractIndex > 0; extractIndex--) {
    // Swap root (max) to the end
    const temporaryValue = workingArray[0]!;
    workingArray[0] = workingArray[extractIndex]!;
    workingArray[extractIndex] = temporaryValue;

    tracker.swap(0, extractIndex, {
      extractIndex,
      extractedValue: workingArray[extractIndex],
      sortedArray: [...workingArray],
    });

    tracker.markSorted(extractIndex, {
      sortedPosition: extractIndex,
    });

    // Restore heap property
    siftDown(0, extractIndex);
  }

  // The last remaining element (index 0) is also sorted
  if (arrayLength > 0) {
    tracker.markSorted(0, { sortedPosition: 0 });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
