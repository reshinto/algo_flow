/** Step generator for Strand Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const STRAND_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.STRAND_SORT!);

/**
 * Merge two sorted arrays and return the merged result.
 * Pure utility — does not produce tracker steps.
 */
function mergeArrays(leftArray: number[], rightArray: number[]): number[] {
  const merged: number[] = [];
  let leftPointer = 0;
  let rightPointer = 0;

  while (leftPointer < leftArray.length && rightPointer < rightArray.length) {
    if (leftArray[leftPointer]! <= rightArray[rightPointer]!) {
      merged.push(leftArray[leftPointer]!);
      leftPointer++;
    } else {
      merged.push(rightArray[rightPointer]!);
      rightPointer++;
    }
  }

  while (leftPointer < leftArray.length) {
    merged.push(leftArray[leftPointer]!);
    leftPointer++;
  }
  while (rightPointer < rightArray.length) {
    merged.push(rightArray[rightPointer]!);
    rightPointer++;
  }

  return merged;
}

export function generateStrandSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], STRAND_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  // remainingItems stores {value, originalIndex} for each unprocessed element
  let remainingItems: Array<{ value: number; originalIndex: number }> = Array.from(
    { length: arrayLength },
    (_, idx) => ({ value: workingArray[idx]!, originalIndex: idx }),
  );
  let outputValues: number[] = [];

  let strandPass = 0;

  while (remainingItems.length > 0) {
    strandPass++;

    // Extract an ascending strand from the remaining items
    const strandItems: Array<{ value: number; originalIndex: number }> = [remainingItems[0]!];
    const leftoverItems: Array<{ value: number; originalIndex: number }> = [];

    for (let scanPos = 1; scanPos < remainingItems.length; scanPos++) {
      const currentItem = remainingItems[scanPos]!;
      const lastStrandItem = strandItems[strandItems.length - 1]!;

      // Use original indices for visual comparison markers (clamped to valid range)
      const visCurrentIndex = Math.min(currentItem.originalIndex, arrayLength - 1);
      const visLastIndex = Math.min(lastStrandItem.originalIndex, arrayLength - 1);

      tracker.compare(visCurrentIndex, visLastIndex, {
        phase: "extract-strand",
        strandPass,
        scanPos,
        strandLength: strandItems.length,
      });

      if (currentItem.value >= lastStrandItem.value) {
        strandItems.push(currentItem);
      } else {
        leftoverItems.push(currentItem);
      }
    }

    const strandValues = strandItems.map((item) => item.value);

    // Merge strand into output
    outputValues = mergeArrays(outputValues, strandValues);

    // Update workingArray to reflect the merged sorted prefix
    for (let outputPos = 0; outputPos < outputValues.length; outputPos++) {
      workingArray[outputPos] = outputValues[outputPos]!;
    }

    // Use a compare step to mark the merge-strand event visually
    if (strandItems.length >= 2) {
      tracker.compare(
        Math.min(strandItems[0]!.originalIndex, arrayLength - 1),
        Math.min(strandItems[strandItems.length - 1]!.originalIndex, arrayLength - 1),
        {
          phase: "merge-strand",
          strandPass,
          strandLength: strandItems.length,
          outputLength: outputValues.length,
        },
      );
    }

    remainingItems = leftoverItems;
  }

  // Sync tracker elements with final sorted workingArray, then mark all as sorted
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, {
      sortedIndex,
      sortedArray: [...workingArray],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
