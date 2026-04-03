/** Step generator for Shell Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SHELL_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SHELL_SORT!);

export function generateShellSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], SHELL_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  for (let gapSize = Math.floor(arrayLength / 2); gapSize > 0; gapSize = Math.floor(gapSize / 2)) {
    for (let outerIndex = gapSize; outerIndex < arrayLength; outerIndex++) {
      const currentValue = workingArray[outerIndex]!;
      let innerIndex = outerIndex;

      while (innerIndex >= gapSize) {
        const compareIndex = innerIndex - gapSize;

        tracker.compare(compareIndex, innerIndex, {
          gapSize,
          outerIndex,
          innerIndex,
          currentValue,
        });

        if (workingArray[compareIndex]! <= currentValue) {
          break;
        }

        workingArray[innerIndex] = workingArray[compareIndex]!;

        tracker.swap(compareIndex, innerIndex, {
          gapSize,
          outerIndex,
          innerIndex,
          currentValue,
          sortedArray: [...workingArray],
        });

        innerIndex -= gapSize;
      }

      workingArray[innerIndex] = currentValue;

      // On the final gap (gap === 1) mark each placed element as progressively sorted
      if (gapSize === 1) {
        tracker.markSorted(outerIndex, {
          gapSize,
          outerIndex,
          insertedAt: innerIndex,
        });
      }
    }

    // After each gap pass mark current progress
    if (gapSize !== 1) {
      tracker.markSorted(0, {
        gapSize,
        note: "gap pass complete",
      });
    }
  }

  // Ensure all elements are marked sorted after the final gap-1 pass
  for (let markIndex = 0; markIndex < arrayLength; markIndex++) {
    tracker.markSorted(markIndex, { sortedPosition: markIndex });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
