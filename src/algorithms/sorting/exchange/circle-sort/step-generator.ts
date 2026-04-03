/** Step generator for Circle Sort — produces ExecutionStep[] using SortingTracker. */
/** Recursion is flattened: each full outer-loop pass collects compare/swap steps iteratively. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CIRCLE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CIRCLE_SORT!);

/** Perform one recursive circle-sort pass, recording steps via the tracker. Returns whether any swaps occurred. */
function circleSortPassWithTracking(
  workingArray: number[],
  tracker: SortingTracker,
  leftIndex: number,
  rightIndex: number,
): boolean {
  if (leftIndex >= rightIndex) {
    return false;
  }

  let swapped = false;
  let low = leftIndex;
  let high = rightIndex;

  while (low < high) {
    tracker.compare(low, high, {
      low,
      high,
      leftIndex,
      rightIndex,
    });

    if (workingArray[low]! > workingArray[high]!) {
      const temporaryValue = workingArray[low]!;
      workingArray[low] = workingArray[high]!;
      workingArray[high] = temporaryValue;
      swapped = true;

      tracker.swap(low, high, {
        low,
        high,
        sortedArray: [...workingArray],
      });
    }

    low++;
    high--;
  }

  if (low === high) {
    tracker.compare(low, high + 1, {
      low,
      high,
      midpointCheck: true,
    });

    if (workingArray[low]! > workingArray[high + 1]!) {
      const temporaryValue = workingArray[low]!;
      workingArray[low] = workingArray[high + 1]!;
      workingArray[high + 1] = temporaryValue;
      swapped = true;

      tracker.swap(low, high + 1, {
        low,
        high,
        sortedArray: [...workingArray],
      });
    }
  }

  const midpoint = Math.floor((leftIndex + rightIndex) / 2);
  const leftSwapped = circleSortPassWithTracking(workingArray, tracker, leftIndex, midpoint);
  const rightSwapped = circleSortPassWithTracking(workingArray, tracker, midpoint + 1, rightIndex);

  return swapped || leftSwapped || rightSwapped;
}

export function generateCircleSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], CIRCLE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  let swapped = true;
  while (swapped) {
    swapped = circleSortPassWithTracking(workingArray, tracker, 0, arrayLength - 1);
  }

  // Mark all elements as sorted
  for (let sortIndex = 0; sortIndex < arrayLength; sortIndex++) {
    tracker.markSorted(sortIndex, { sortIndex });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
