/** Step generator for Bitonic Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BITONIC_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BITONIC_SORT!);

export function generateBitonicSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BITONIC_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    if (arrayLength === 1) tracker.markSorted(0, { sortedPosition: 0 });
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  // Compute padded length (next power of 2)
  let paddedLength = 1;
  while (paddedLength < arrayLength) paddedLength <<= 1;

  // Use Infinity for padding so that padding values always sort last
  const paddedArray: number[] = [...workingArray];
  while (paddedArray.length < paddedLength) paddedArray.push(Number.MAX_SAFE_INTEGER);

  // Bitonic sort network — for each (stage, step) pair, compare-and-swap partner pairs
  for (let stage = 2; stage <= paddedLength; stage <<= 1) {
    for (let step = stage >> 1; step > 0; step >>= 1) {
      let swapHappenedThisStep = false;

      for (let elementIndex = 0; elementIndex < paddedLength; elementIndex++) {
        const partnerIndex = elementIndex ^ step;

        if (partnerIndex > elementIndex) {
          // Only emit steps for real (non-padded) index pairs
          const isRealPair = elementIndex < arrayLength && partnerIndex < arrayLength;

          if (isRealPair) {
            tracker.compare(elementIndex, partnerIndex, {
              stage,
              step,
              elementIndex,
              partnerIndex,
              isAscending: (elementIndex & stage) === 0,
            });
          }

          const isAscending = (elementIndex & stage) === 0;

          if (isAscending && paddedArray[elementIndex]! > paddedArray[partnerIndex]!) {
            const temporaryValue = paddedArray[elementIndex]!;
            paddedArray[elementIndex] = paddedArray[partnerIndex]!;
            paddedArray[partnerIndex] = temporaryValue;

            // Sync workingArray for real elements
            if (elementIndex < arrayLength) workingArray[elementIndex] = paddedArray[elementIndex]!;
            if (partnerIndex < arrayLength) workingArray[partnerIndex] = paddedArray[partnerIndex]!;

            if (isRealPair) {
              tracker.swap(elementIndex, partnerIndex, {
                stage,
                step,
                elementIndex,
                partnerIndex,
                sortedArray: [...workingArray],
              });
            }
            swapHappenedThisStep = true;
          } else if (!isAscending && paddedArray[elementIndex]! < paddedArray[partnerIndex]!) {
            const temporaryValue = paddedArray[elementIndex]!;
            paddedArray[elementIndex] = paddedArray[partnerIndex]!;
            paddedArray[partnerIndex] = temporaryValue;

            if (elementIndex < arrayLength) workingArray[elementIndex] = paddedArray[elementIndex]!;
            if (partnerIndex < arrayLength) workingArray[partnerIndex] = paddedArray[partnerIndex]!;

            if (isRealPair) {
              tracker.swap(elementIndex, partnerIndex, {
                stage,
                step,
                elementIndex,
                partnerIndex,
                sortedArray: [...workingArray],
              });
            }
            swapHappenedThisStep = true;
          }
        }
      }

      // Mark progress after each full step pass
      if (!swapHappenedThisStep && step === 1) {
        // Final step of this stage — mark sorted portion
        const sortedUpTo = Math.min(stage, arrayLength);
        for (let markIdx = 0; markIdx < sortedUpTo; markIdx++) {
          tracker.markSorted(markIdx, { sortedPosition: markIdx, stage });
        }
      }
    }
  }

  // Mark all elements as sorted
  for (let finalIndex = 0; finalIndex < arrayLength; finalIndex++) {
    tracker.markSorted(finalIndex, { sortedPosition: finalIndex });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
