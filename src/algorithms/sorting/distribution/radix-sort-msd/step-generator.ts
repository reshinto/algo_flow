/** Step generator for Radix Sort MSD — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RADIX_SORT_MSD_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RADIX_SORT_MSD!);

export function generateRadixSortMsdSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], RADIX_SORT_MSD_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  // Offset negatives
  const minValue = Math.min(...workingArray);
  const offset = minValue < 0 ? -minValue : 0;
  for (let offsetIndex = 0; offsetIndex < arrayLength; offsetIndex++) {
    workingArray[offsetIndex] = workingArray[offsetIndex]! + offset;
  }
  const maxValue = Math.max(...workingArray);
  const base = 10;

  let maxDivisor = 1;
  while (maxDivisor * base <= maxValue) {
    maxDivisor *= base;
  }

  tracker.initialize({
    sortedArray: [...inputArray],
    arrayLength,
    minValue,
    maxValue,
    offset,
    maxDivisor,
  });

  // Iterative simulation of MSD recursion for step generation
  // We flatten the recursive passes into sequential steps using an explicit work stack
  const outputArray = [...workingArray];

  function collectMsdSteps(subIndices: number[], digitDivisor: number): void {
    if (subIndices.length <= 1 || digitDivisor < 1) return;

    const buckets: number[][] = Array.from({ length: base }, () => []);
    const bucketSourceIndices: number[][] = Array.from({ length: base }, () => []);

    // Distribute — compare() shows digit extraction
    for (const globalIndex of subIndices) {
      const value = outputArray[globalIndex]!;
      const digit = Math.floor(value / digitDivisor) % base;
      buckets[digit]!.push(value);
      bucketSourceIndices[digit]!.push(globalIndex);
      tracker.compare(
        globalIndex,
        globalIndex,
        {
          globalIndex,
          value: value - offset,
          digit,
          digitDivisor,
        },
        `MSD digit (÷${String(digitDivisor)}): value ${String(value - offset)} → bucket ${String(digit)}`,
      );
    }

    // Recursively sort each non-empty bucket
    for (let bucketIndex = 0; bucketIndex < base; bucketIndex++) {
      if (buckets[bucketIndex]!.length > 1) {
        collectMsdSteps(bucketSourceIndices[bucketIndex]!, Math.floor(digitDivisor / base));
      }
    }

    // Collect — swap() shows writing back sorted values
    let writePosition = subIndices[0]!;
    for (let bucketIndex = 0; bucketIndex < base; bucketIndex++) {
      for (const bucketValue of buckets[bucketIndex]!) {
        outputArray[writePosition] = bucketValue;
        tracker.swap(
          writePosition,
          writePosition,
          {
            bucketIndex,
            bucketValue: bucketValue - offset,
            writePosition,
            sortedArray: outputArray.map((val) => val - offset),
          },
          `Collecting bucket ${String(bucketIndex)}: placing ${String(bucketValue - offset)} at position ${String(writePosition)}`,
        );
        writePosition++;
      }
    }
  }

  const allIndices = Array.from({ length: arrayLength }, (_, idx) => idx);
  collectMsdSteps(allIndices, maxDivisor);

  // Restore offset and mark sorted
  for (let restoreIndex = 0; restoreIndex < arrayLength; restoreIndex++) {
    outputArray[restoreIndex] = outputArray[restoreIndex]! - offset;
    tracker.markSorted(restoreIndex, {
      restoreIndex,
      value: outputArray[restoreIndex],
    });
  }

  tracker.complete({ result: [...outputArray] });
  return tracker.getSteps();
}
