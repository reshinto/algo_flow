/** Step generator for Pancake Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PANCAKE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PANCAKE_SORT!);

export function generatePancakeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], PANCAKE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  for (let unsortedSize = arrayLength; unsortedSize > 1; unsortedSize--) {
    // Find max in unsorted portion
    let maxIndex = 0;
    for (let searchIndex = 1; searchIndex < unsortedSize; searchIndex++) {
      tracker.compare(searchIndex, maxIndex, {
        searchIndex,
        maxIndex,
        unsortedSize,
      });

      if (workingArray[searchIndex]! > workingArray[maxIndex]!) {
        maxIndex = searchIndex;
      }
    }

    if (maxIndex !== unsortedSize - 1) {
      // Flip max to front
      if (maxIndex !== 0) {
        let flipLeft = 0;
        let flipRight = maxIndex;
        while (flipLeft < flipRight) {
          const temporaryValue = workingArray[flipLeft]!;
          workingArray[flipLeft] = workingArray[flipRight]!;
          workingArray[flipRight] = temporaryValue;

          tracker.swap(flipLeft, flipRight, {
            flipLeft,
            flipRight,
            phase: "flip-to-front",
            sortedArray: [...workingArray],
          });

          flipLeft++;
          flipRight--;
        }
      }

      // Flip front to end of unsorted portion
      let flipLeft = 0;
      let flipRight = unsortedSize - 1;
      while (flipLeft < flipRight) {
        const temporaryValue = workingArray[flipLeft]!;
        workingArray[flipLeft] = workingArray[flipRight]!;
        workingArray[flipRight] = temporaryValue;

        tracker.swap(flipLeft, flipRight, {
          flipLeft,
          flipRight,
          phase: "flip-to-end",
          sortedArray: [...workingArray],
        });

        flipLeft++;
        flipRight--;
      }
    }

    tracker.markSorted(unsortedSize - 1, {
      unsortedSize,
      sortedPosition: unsortedSize - 1,
    });
  }

  tracker.markSorted(0, { sortedPosition: 0 });
  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
