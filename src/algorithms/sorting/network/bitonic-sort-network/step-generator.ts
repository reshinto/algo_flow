/** Step generator for Bitonic Sort Network — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BITONIC_SORT_NETWORK_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BITONIC_SORT_NETWORK!);

export function generateBitonicSortNetworkSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BITONIC_SORT_NETWORK_LINE_MAP);
  const workingArray = [...inputArray];
  const originalLength = workingArray.length;

  // Pad to next power of 2
  let paddedLength = 1;
  while (paddedLength < originalLength) {
    paddedLength *= 2;
  }
  const paddedArray = [...workingArray];
  while (paddedArray.length < paddedLength) {
    paddedArray.push(Number.MAX_SAFE_INTEGER);
  }

  tracker.initialize({ sortedArray: [...workingArray], originalLength, paddedLength });

  for (let stageSize = 2; stageSize <= paddedLength; stageSize *= 2) {
    for (let subSize = stageSize; subSize >= 2; subSize = Math.floor(subSize / 2)) {
      const halfSubSize = subSize / 2;
      for (let elementIndex = 0; elementIndex < paddedLength; elementIndex++) {
        const partnerIndex = elementIndex ^ halfSubSize;
        if (partnerIndex > elementIndex) {
          // Only track visible (non-padded) comparisons
          if (elementIndex < originalLength && partnerIndex < originalLength) {
            tracker.compare(elementIndex, partnerIndex, {
              elementIndex,
              partnerIndex,
              stageSize,
              subSize,
            });
          }

          const ascending = (elementIndex & stageSize) === 0;
          if (
            (ascending && paddedArray[elementIndex]! > paddedArray[partnerIndex]!) ||
            (!ascending && paddedArray[elementIndex]! < paddedArray[partnerIndex]!)
          ) {
            const temporaryValue = paddedArray[elementIndex]!;
            paddedArray[elementIndex] = paddedArray[partnerIndex]!;
            paddedArray[partnerIndex] = temporaryValue;

            // Only track visible (non-padded) swaps — also sync the tracker's internal state
            if (elementIndex < originalLength && partnerIndex < originalLength) {
              // Sync workingArray to match paddedArray visible portion
              workingArray[elementIndex] = paddedArray[elementIndex]!;
              workingArray[partnerIndex] = paddedArray[partnerIndex]!;
              tracker.swap(elementIndex, partnerIndex, {
                elementIndex,
                partnerIndex,
                sortedArray: workingArray.slice(0, originalLength),
              });
            }
          }
        }
      }
    }
  }

  // Mark all elements sorted after network completes
  for (let sortedIndex = 0; sortedIndex < originalLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, { sortedIndex });
  }

  tracker.complete({ result: paddedArray.slice(0, originalLength) });
  return tracker.getSteps();
}
