/** Step generator for Pairwise Sorting Network — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PAIRWISE_SORTING_NETWORK_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.PAIRWISE_SORTING_NETWORK!,
);

export function generatePairwiseSortingNetworkSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], PAIRWISE_SORTING_NETWORK_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  function compareAndSwapTracked(firstIndex: number, secondIndex: number, phase: string): void {
    if (firstIndex >= arrayLength || secondIndex >= arrayLength) return;

    tracker.compare(firstIndex, secondIndex, { firstIndex, secondIndex, phase });

    if (workingArray[firstIndex]! > workingArray[secondIndex]!) {
      const temporaryValue = workingArray[firstIndex]!;
      workingArray[firstIndex] = workingArray[secondIndex]!;
      workingArray[secondIndex] = temporaryValue;

      tracker.swap(firstIndex, secondIndex, {
        firstIndex,
        secondIndex,
        phase,
        sortedArray: [...workingArray],
      });
    }
  }

  // Phase 1: Sort adjacent pairs
  for (let pairStart = 0; pairStart + 1 < arrayLength; pairStart += 2) {
    compareAndSwapTracked(pairStart, pairStart + 1, "pair-sort");
  }

  // Phase 2: Merge using gap sequence with reconciliation
  for (let gap = 2; gap < arrayLength; gap *= 2) {
    for (let blockStart = 0; blockStart < arrayLength; blockStart += gap * 2) {
      for (let offset = 0; offset < gap && blockStart + offset + gap < arrayLength; offset++) {
        compareAndSwapTracked(blockStart + offset, blockStart + offset + gap, "merge");
      }
    }
    for (
      let reconcileGap = Math.floor(gap / 2);
      reconcileGap >= 1;
      reconcileGap = Math.floor(reconcileGap / 2)
    ) {
      for (
        let reconcileStart = reconcileGap;
        reconcileStart + reconcileGap < arrayLength;
        reconcileStart += reconcileGap * 2
      ) {
        for (
          let reconcileOffset = 0;
          reconcileOffset < reconcileGap && reconcileStart + reconcileOffset < arrayLength - 1;
          reconcileOffset++
        ) {
          compareAndSwapTracked(
            reconcileStart + reconcileOffset,
            reconcileStart + reconcileOffset + 1,
            "reconcile",
          );
        }
      }
    }
  }

  // Final odd-even transposition pass to guarantee sortedness
  let swapped = true;
  let finalPassCount = 0;
  while (swapped) {
    swapped = false;
    for (let finalIndex = 0; finalIndex + 1 < arrayLength; finalIndex++) {
      if (workingArray[finalIndex]! > workingArray[finalIndex + 1]!) {
        compareAndSwapTracked(finalIndex, finalIndex + 1, "final-pass");
        swapped = true;
      }
    }
    finalPassCount++;
  }

  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, { sortedIndex });
  }

  tracker.complete({ result: [...workingArray], finalPassCount });
  return tracker.getSteps();
}
