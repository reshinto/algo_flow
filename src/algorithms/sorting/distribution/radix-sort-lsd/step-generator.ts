/** Step generator for Radix Sort LSD — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RADIX_SORT_LSD_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RADIX_SORT_LSD!);

export function generateRadixSortLsdSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], RADIX_SORT_LSD_LINE_MAP);
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

  tracker.initialize({ sortedArray: [...inputArray], arrayLength, minValue, maxValue, offset });

  const base = 10;
  let digitDivisor = 1;
  let digitPosition = 1;

  while (Math.floor(maxValue / digitDivisor) > 0) {
    const buckets: number[][] = Array.from({ length: base }, () => []);

    // Distribute phase — compare() shows digit extraction
    for (let distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
      const digit = Math.floor(workingArray[distributeIndex]! / digitDivisor) % base;
      buckets[digit]!.push(workingArray[distributeIndex]!);
      tracker.compare(
        distributeIndex,
        distributeIndex,
        {
          distributeIndex,
          digitPosition,
          digitDivisor,
          digit,
          value: workingArray[distributeIndex]! - offset,
        },
        `Digit ${String(digitPosition)}: extracting digit ${String(digit)} from value ${String(workingArray[distributeIndex]! - offset)}`,
      );
    }

    // Collect phase — swap() shows placing back into array
    let writeIndex = 0;
    for (let bucketIndex = 0; bucketIndex < base; bucketIndex++) {
      for (const bucketValue of buckets[bucketIndex]!) {
        const originalIndex = writeIndex;
        workingArray[writeIndex] = bucketValue;
        tracker.setElementValue(writeIndex, bucketValue - offset);
        writeIndex++;
        tracker.swap(
          originalIndex,
          originalIndex,
          {
            bucketIndex,
            bucketValue: bucketValue - offset,
            writeIndex: originalIndex,
            sortedArray: workingArray.map((val) => val - offset),
          },
          `Collecting digit ${String(bucketIndex)} bucket: placing ${String(bucketValue - offset)} at position ${String(originalIndex)}`,
        );
      }
    }

    digitDivisor *= base;
    digitPosition++;
  }

  // Restore offset and mark all sorted
  for (let restoreIndex = 0; restoreIndex < arrayLength; restoreIndex++) {
    workingArray[restoreIndex] = workingArray[restoreIndex]! - offset;
    tracker.setElementValue(restoreIndex, workingArray[restoreIndex]!);
    tracker.markSorted(restoreIndex, {
      restoreIndex,
      value: workingArray[restoreIndex],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
