import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const BUBBLE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUBBLE_SORT);

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
