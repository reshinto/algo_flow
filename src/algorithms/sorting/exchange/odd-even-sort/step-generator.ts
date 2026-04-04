/** Step generator for Odd-Even Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ODD_EVEN_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ODD_EVEN_SORT!);

export function generateOddEvenSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], ODD_EVEN_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  let sorted = false;

  while (!sorted) {
    sorted = true;

    // Odd phase
    for (let oddIndex = 1; oddIndex < arrayLength - 1; oddIndex += 2) {
      tracker.compare(oddIndex, oddIndex + 1, {
        oddIndex,
        phase: "odd",
      });

      if (workingArray[oddIndex]! > workingArray[oddIndex + 1]!) {
        const temporaryValue = workingArray[oddIndex]!;
        workingArray[oddIndex] = workingArray[oddIndex + 1]!;
        workingArray[oddIndex + 1] = temporaryValue;
        sorted = false;

        tracker.swap(oddIndex, oddIndex + 1, {
          oddIndex,
          sortedArray: [...workingArray],
        });
      }
    }

    // Even phase
    for (let evenIndex = 0; evenIndex < arrayLength - 1; evenIndex += 2) {
      tracker.compare(evenIndex, evenIndex + 1, {
        evenIndex,
        phase: "even",
      });

      if (workingArray[evenIndex]! > workingArray[evenIndex + 1]!) {
        const temporaryValue = workingArray[evenIndex]!;
        workingArray[evenIndex] = workingArray[evenIndex + 1]!;
        workingArray[evenIndex + 1] = temporaryValue;
        sorted = false;

        tracker.swap(evenIndex, evenIndex + 1, {
          evenIndex,
          sortedArray: [...workingArray],
        });
      }
    }
  }

  // Mark all elements as sorted
  for (let sortIndex = 0; sortIndex < arrayLength; sortIndex++) {
    tracker.markSorted(sortIndex, { sortIndex });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
