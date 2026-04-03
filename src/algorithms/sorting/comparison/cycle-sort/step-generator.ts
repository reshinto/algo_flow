/** Step generator for Cycle Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CYCLE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CYCLE_SORT!);

export function generateCycleSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], CYCLE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  for (let cycleStart = 0; cycleStart < arrayLength - 1; cycleStart++) {
    let currentValue = workingArray[cycleStart]!;

    // Count how many elements are smaller → find correct position
    let correctPosition = cycleStart;
    for (let scanIndex = cycleStart + 1; scanIndex < arrayLength; scanIndex++) {
      tracker.compare(scanIndex, cycleStart, {
        scanValue: workingArray[scanIndex],
        currentValue,
        correctPosition,
        phase: "count-position",
      });

      if (workingArray[scanIndex]! < currentValue) {
        correctPosition++;
      }
    }

    // Already in place — skip
    if (correctPosition === cycleStart) {
      continue;
    }

    // Skip duplicates
    while (currentValue === workingArray[correctPosition]!) {
      correctPosition++;
    }

    // Place currentValue at correct position (first write)
    const displacedValue = workingArray[correctPosition]!;
    workingArray[correctPosition] = currentValue;
    currentValue = displacedValue;

    tracker.swap(cycleStart, correctPosition, {
      cycleStart,
      correctPosition,
      placedValue: workingArray[correctPosition],
      displacedValue: currentValue,
      phase: "place-element",
    });

    // Complete the cycle
    while (correctPosition !== cycleStart) {
      correctPosition = cycleStart;

      for (let scanIndex = cycleStart + 1; scanIndex < arrayLength; scanIndex++) {
        tracker.compare(scanIndex, cycleStart, {
          scanValue: workingArray[scanIndex],
          currentValue,
          correctPosition,
          phase: "count-position",
        });

        if (workingArray[scanIndex]! < currentValue) {
          correctPosition++;
        }
      }

      while (currentValue === workingArray[correctPosition]!) {
        correctPosition++;
      }

      if (currentValue !== workingArray[correctPosition]!) {
        const nextDisplacedValue = workingArray[correctPosition]!;
        workingArray[correctPosition] = currentValue;
        currentValue = nextDisplacedValue;

        tracker.swap(cycleStart, correctPosition, {
          cycleStart,
          correctPosition,
          phase: "cycle-rotate",
        });
      }
    }

    tracker.markSorted(cycleStart, {
      cycleStart,
      sortedArray: [...workingArray],
    });
  }

  // Mark the last element sorted
  tracker.markSorted(arrayLength - 1, {
    sortedPosition: arrayLength - 1,
  });

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
