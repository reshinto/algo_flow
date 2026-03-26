import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import type { LineMap } from "@/trackers";

/*
 * Line mapping: step type → source file line numbers per language.
 *
 * Bubble Sort repeatedly passes through the array, swapping adjacent
 * out-of-order elements. The inner loop shrinks by outerIndex each
 * iteration because the largest unsorted element bubbles to the end
 * on every pass. An early-exit flag detects an already-sorted array
 * for O(n) best-case performance.
 */
const BUBBLE_SORT_LINE_MAP: LineMap = {
  /* Copy input and record its length */
  initialize: {
    typescript: [1, 2, 3],
    python: [1, 2, 3],
    java: [2, 3, 4],
  },
  /* Begin next pass; reset the swapped flag */
  "outer-loop": {
    typescript: [5, 6],
    python: [5, 6],
    java: [6, 7],
  },
  /* Walk adjacent pairs in the unsorted portion */
  "inner-loop": {
    typescript: [8],
    python: [8],
    java: [9],
  },
  /* Compare adjacent elements */
  compare: {
    typescript: [9],
    python: [9],
    java: [10],
  },
  /* Swap via temporary variable when out of order */
  swap: {
    typescript: [10, 11, 12, 13],
    python: [10, 11, 12, 13],
    java: [11, 12, 13, 14],
  },
  /* No swaps this pass → array is sorted; break early */
  "early-exit": {
    typescript: [17],
    python: [15, 16],
    java: [18],
  },
  /* Largest unsorted element reached its final position */
  "mark-sorted": {
    typescript: [5],
    python: [5],
    java: [6],
  },
  /* Return the fully sorted array */
  complete: {
    typescript: [20],
    python: [18],
    java: [21],
  },
};

export function generateBubbleSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BUBBLE_SORT_LINE_MAP);
  const arrayLength = inputArray.length;

  tracker.initialize({
    sortedArray: [...inputArray],
    arrayLength,
  });

  for (let outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
    let swappedThisPass = false;

    for (let innerIndex = 0; innerIndex < arrayLength - 1 - outerIndex; innerIndex++) {
      tracker.compare(innerIndex, innerIndex + 1, {
        outerIndex,
        innerIndex,
        swappedThisPass,
      });

      if (inputArray[innerIndex]! > inputArray[innerIndex + 1]!) {
        const temporaryValue = inputArray[innerIndex]!;
        inputArray[innerIndex] = inputArray[innerIndex + 1]!;
        inputArray[innerIndex + 1] = temporaryValue;
        swappedThisPass = true;

        tracker.swap(innerIndex, innerIndex + 1, {
          outerIndex,
          innerIndex,
          swappedThisPass,
        });
      }
    }

    tracker.markSorted(arrayLength - 1 - outerIndex, {
      outerIndex,
      sortedPosition: arrayLength - 1 - outerIndex,
    });

    if (!swappedThisPass) break;
  }

  tracker.complete({ result: [...inputArray] });
  return tracker.getSteps();
}
