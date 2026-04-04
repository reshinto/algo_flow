/** Step generator for Cocktail Shaker Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const COCKTAIL_SHAKER_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COCKTAIL_SHAKER_SORT!);

export function generateCocktailShakerSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], COCKTAIL_SHAKER_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  let leftBound = 0;
  let rightBound = arrayLength - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (let forwardIndex = leftBound; forwardIndex < rightBound; forwardIndex++) {
      tracker.compare(forwardIndex, forwardIndex + 1, {
        forwardIndex,
        leftBound,
        rightBound,
        pass: "forward",
      });

      if (workingArray[forwardIndex]! > workingArray[forwardIndex + 1]!) {
        const temporaryValue = workingArray[forwardIndex]!;
        workingArray[forwardIndex] = workingArray[forwardIndex + 1]!;
        workingArray[forwardIndex + 1] = temporaryValue;
        swapped = true;

        tracker.swap(forwardIndex, forwardIndex + 1, {
          forwardIndex,
          sortedArray: [...workingArray],
        });
      }
    }

    tracker.markSorted(rightBound, { rightBound, sortedArray: [...workingArray] });
    rightBound--;

    if (!swapped) break;
    swapped = false;

    // Backward pass
    for (let backwardIndex = rightBound; backwardIndex > leftBound; backwardIndex--) {
      tracker.compare(backwardIndex - 1, backwardIndex, {
        backwardIndex,
        leftBound,
        rightBound,
        pass: "backward",
      });

      if (workingArray[backwardIndex - 1]! > workingArray[backwardIndex]!) {
        const temporaryValue = workingArray[backwardIndex]!;
        workingArray[backwardIndex] = workingArray[backwardIndex - 1]!;
        workingArray[backwardIndex - 1] = temporaryValue;
        swapped = true;

        tracker.swap(backwardIndex - 1, backwardIndex, {
          backwardIndex,
          sortedArray: [...workingArray],
        });
      }
    }

    tracker.markSorted(leftBound, { leftBound, sortedArray: [...workingArray] });
    leftBound++;
  }

  // Mark all remaining elements as sorted
  for (let sortIndex = leftBound; sortIndex <= rightBound; sortIndex++) {
    tracker.markSorted(sortIndex, { sortIndex, sortedArray: [...workingArray] });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
