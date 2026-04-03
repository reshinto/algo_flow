/** Step generator for Odd-Even Merge Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ODD_EVEN_MERGE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ODD_EVEN_MERGE_SORT!);

export function generateOddEvenMergeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], ODD_EVEN_MERGE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  // Batcher's odd-even transposition sort
  const totalRounds = Math.ceil(arrayLength / 2) * 2;

  for (let roundIndex = 0; roundIndex < totalRounds; roundIndex++) {
    const isOddRound = roundIndex % 2 === 0;
    const startIndex = isOddRound ? 0 : 1;

    for (let leftIndex = startIndex; leftIndex + 1 < arrayLength; leftIndex += 2) {
      const rightIndex = leftIndex + 1;

      tracker.compare(leftIndex, rightIndex, {
        leftIndex,
        rightIndex,
        roundIndex,
        phase: isOddRound ? "odd" : "even",
      });

      if (workingArray[leftIndex]! > workingArray[rightIndex]!) {
        const temporaryValue = workingArray[leftIndex]!;
        workingArray[leftIndex] = workingArray[rightIndex]!;
        workingArray[rightIndex] = temporaryValue;

        tracker.swap(leftIndex, rightIndex, {
          leftIndex,
          rightIndex,
          roundIndex,
          sortedArray: [...workingArray],
        });
      }
    }
  }

  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, { sortedIndex });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
