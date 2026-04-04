/** Step generator for Merge Insertion Sort (Ford-Johnson) — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MERGE_INSERTION_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MERGE_INSERTION_SORT!);

export function generateMergeInsertionSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], MERGE_INSERTION_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  const pairCount = Math.floor(arrayLength / 2);
  const hasUnpaired = arrayLength % 2 === 1;

  // Step 1: Compare and orient each pair (larger first)
  for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
    const leftPos = pairIndex * 2;
    const rightPos = leftPos + 1;

    tracker.compare(leftPos, rightPos, {
      phase: "pair",
      pairIndex,
      leftValue: workingArray[leftPos],
      rightValue: workingArray[rightPos],
    });

    if (workingArray[leftPos]! < workingArray[rightPos]!) {
      const temporaryValue = workingArray[leftPos]!;
      workingArray[leftPos] = workingArray[rightPos]!;
      workingArray[rightPos] = temporaryValue;

      tracker.swap(leftPos, rightPos, {
        phase: "pair",
        pairIndex,
        sortedArray: [...workingArray],
      });
    }
  }

  // Step 2: Extract larger and smaller elements
  const largerElements: number[] = [];
  const smallerElements: number[] = [];

  for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
    largerElements.push(workingArray[pairIndex * 2]!);
    smallerElements.push(workingArray[pairIndex * 2 + 1]!);
  }
  if (hasUnpaired) {
    smallerElements.push(workingArray[arrayLength - 1]!);
  }

  // Step 3: Sort the larger elements using insertion sort
  for (let insertIndex = 1; insertIndex < largerElements.length; insertIndex++) {
    const currentValue = largerElements[insertIndex]!;
    let innerIndex = insertIndex - 1;

    tracker.compare(insertIndex, innerIndex, {
      phase: "sort-larger",
      insertIndex,
      currentValue,
    });

    while (innerIndex >= 0 && largerElements[innerIndex]! > currentValue) {
      largerElements[innerIndex + 1] = largerElements[innerIndex]!;
      innerIndex--;

      // Update visual representation (workingArray only — tracker sync after swap)
      for (let visualIndex = 0; visualIndex < largerElements.length; visualIndex++) {
        workingArray[visualIndex] = largerElements[visualIndex]!;
      }

      tracker.swap(innerIndex + 2, innerIndex + 1, {
        phase: "sort-larger",
        sortedArray: [...workingArray],
      });

      if (innerIndex >= 0) {
        tracker.compare(innerIndex + 1, innerIndex, {
          phase: "sort-larger",
          innerIndex,
          currentValue,
        });
      }
    }
    largerElements[innerIndex + 1] = currentValue;

    // Sync tracker state after each insertion pass
    for (let syncIdx = 0; syncIdx < largerElements.length; syncIdx++) {
      tracker.setElementValue(syncIdx, largerElements[syncIdx]!);
    }
  }

  // Place sorted larger elements into the working array
  for (let largeIndex = 0; largeIndex < largerElements.length; largeIndex++) {
    workingArray[largeIndex] = largerElements[largeIndex]!;
  }

  let insertedCount = largerElements.length;

  // Step 4: Binary-insert each smaller element
  for (let smallerIndex = 0; smallerIndex < smallerElements.length; smallerIndex++) {
    const valueToInsert = smallerElements[smallerIndex]!;

    // Binary search for insertion position
    let low = 0;
    let high = insertedCount;

    while (low < high) {
      const midPoint = Math.floor((low + high) / 2);

      tracker.compare(midPoint, midPoint, {
        phase: "binary-insert",
        smallerIndex,
        valueToInsert,
        midPoint,
        low,
        high,
        midValue: workingArray[midPoint],
      });

      if (workingArray[midPoint]! < valueToInsert) {
        low = midPoint + 1;
      } else {
        high = midPoint;
      }
    }

    const insertionPosition = low;

    // Shift elements right and place the value
    for (let shiftIndex = insertedCount; shiftIndex > insertionPosition; shiftIndex--) {
      workingArray[shiftIndex] = workingArray[shiftIndex - 1]!;
      tracker.swap(shiftIndex, shiftIndex - 1, {
        phase: "binary-insert-shift",
        shiftIndex,
        valueToInsert,
        sortedArray: [...workingArray],
      });
    }
    workingArray[insertionPosition] = valueToInsert;

    // Sync tracker after shift completes
    for (let syncIdx = 0; syncIdx <= insertedCount; syncIdx++) {
      tracker.setElementValue(syncIdx, workingArray[syncIdx]!);
    }

    insertedCount++;
  }

  // Sync tracker elements with final sorted values before marking sorted
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  // Mark all elements as sorted
  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, {
      sortedIndex,
      sortedArray: [...workingArray],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
