/** Step generator for Spaghetti Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SPAGHETTI_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SPAGHETTI_SORT!);

export function generateSpaghettiSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], SPAGHETTI_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ originalArray: [...workingArray], arrayLength });

  // We'll place sorted elements from the end of the array to the front (max first)
  // using the tracker's swap to simulate placing at sorted positions
  const placed = new Array(arrayLength).fill(false) as boolean[];
  let nextSortedPosition = arrayLength - 1;

  for (let extractionPass = 0; extractionPass < arrayLength; extractionPass++) {
    // Find the maximum among unplaced elements
    let tallestValue = -Infinity;
    let tallestIndex = -1;

    for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
      if (!placed[scanIndex]) {
        tracker.compare(scanIndex, tallestIndex >= 0 ? tallestIndex : scanIndex, {
          scanIndex,
          candidateValue: workingArray[scanIndex],
          currentTallest: tallestValue,
          extractionPass,
        });

        if (workingArray[scanIndex]! > tallestValue) {
          tallestValue = workingArray[scanIndex]!;
          tallestIndex = scanIndex;
        }
      }
    }

    if (tallestIndex < 0) break;

    // Swap tallest to next sorted position (from end of array inward)
    if (tallestIndex !== nextSortedPosition) {
      const temporaryValue = workingArray[tallestIndex]!;
      workingArray[tallestIndex] = workingArray[nextSortedPosition]!;
      workingArray[nextSortedPosition] = temporaryValue;

      tracker.swap(tallestIndex, nextSortedPosition, {
        tallestIndex,
        nextSortedPosition,
        tallestValue,
        sortedArray: [...workingArray],
      });

      placed[nextSortedPosition] = true;
    }

    placed[nextSortedPosition] = true;
    tracker.markSorted(nextSortedPosition, {
      sortedPosition: nextSortedPosition,
      value: tallestValue,
      extractionPass,
    });

    nextSortedPosition--;
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
