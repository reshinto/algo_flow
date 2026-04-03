/** Step generator for Exchange Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const EXCHANGE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.EXCHANGE_SORT!);

export function generateExchangeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], EXCHANGE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  for (let outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
    for (let innerIndex = outerIndex + 1; innerIndex < arrayLength; innerIndex++) {
      tracker.compare(outerIndex, innerIndex, {
        outerIndex,
        innerIndex,
      });

      if (workingArray[outerIndex]! > workingArray[innerIndex]!) {
        const temporaryValue = workingArray[outerIndex]!;
        workingArray[outerIndex] = workingArray[innerIndex]!;
        workingArray[innerIndex] = temporaryValue;

        tracker.swap(outerIndex, innerIndex, {
          outerIndex,
          innerIndex,
          sortedArray: [...workingArray],
        });
      }
    }

    tracker.markSorted(outerIndex, {
      outerIndex,
      sortedPosition: outerIndex,
    });
  }

  // Last element is implicitly in its sorted position
  tracker.markSorted(arrayLength - 1, {
    outerIndex: arrayLength - 1,
    sortedPosition: arrayLength - 1,
  });

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
