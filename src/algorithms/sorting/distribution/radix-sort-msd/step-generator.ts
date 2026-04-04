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

  // MSD radix sort using contiguous sub-ranges for correct in-place sorting
  const outputArray = [...workingArray];

  function collectMsdSteps(startIndex: number, endIndex: number, digitDivisor: number): void {
    if (startIndex >= endIndex || digitDivisor < 1) return;

    // Count elements per bucket
    const bucketCounts: number[] = new Array<number>(base).fill(0);
    for (let scanIndex = startIndex; scanIndex <= endIndex; scanIndex++) {
      const digit = Math.floor(outputArray[scanIndex]! / digitDivisor) % base;
      bucketCounts[digit]!++;
      tracker.compare(
        scanIndex,
        scanIndex,
        {
          scanIndex,
          value: outputArray[scanIndex]! - offset,
          digit,
          digitDivisor,
        },
        `MSD digit (÷${String(digitDivisor)}): value ${String(outputArray[scanIndex]! - offset)} → bucket ${String(digit)}`,
      );
    }

    // Compute bucket start positions within the sub-range
    const bucketStarts: number[] = new Array<number>(base).fill(startIndex);
    for (let bucketIndex = 1; bucketIndex < base; bucketIndex++) {
      bucketStarts[bucketIndex] = bucketStarts[bucketIndex - 1]! + bucketCounts[bucketIndex - 1]!;
    }

    // Stable distribute into temp buffer, then copy back to outputArray
    const tempBuffer: number[] = new Array<number>(endIndex - startIndex + 1);
    const bucketWritePos: number[] = [...bucketStarts];
    for (let scanIndex = startIndex; scanIndex <= endIndex; scanIndex++) {
      const digit = Math.floor(outputArray[scanIndex]! / digitDivisor) % base;
      tempBuffer[bucketWritePos[digit]! - startIndex] = outputArray[scanIndex]!;
      bucketWritePos[digit]!++;
    }

    // Write sorted-by-digit values back and sync tracker
    for (let writeIndex = 0; writeIndex < tempBuffer.length; writeIndex++) {
      const globalPos = startIndex + writeIndex;
      outputArray[globalPos] = tempBuffer[writeIndex]!;
      tracker.setElementValue(globalPos, tempBuffer[writeIndex]! - offset);
      tracker.swap(
        globalPos,
        globalPos,
        {
          digitDivisor,
          placedValue: tempBuffer[writeIndex]! - offset,
          globalPos,
          sortedArray: outputArray.map((val) => val - offset),
        },
        `Placing ${String(tempBuffer[writeIndex]! - offset)} at position ${String(globalPos)}`,
      );
    }

    // Recursively sort each non-empty bucket (now contiguous in outputArray)
    for (let bucketIndex = 0; bucketIndex < base; bucketIndex++) {
      if (bucketCounts[bucketIndex]! > 1) {
        const bucketStart = bucketStarts[bucketIndex]!;
        const bucketEnd = bucketStart + bucketCounts[bucketIndex]! - 1;
        collectMsdSteps(bucketStart, bucketEnd, Math.floor(digitDivisor / base));
      }
    }
  }

  collectMsdSteps(0, arrayLength - 1, maxDivisor);

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
