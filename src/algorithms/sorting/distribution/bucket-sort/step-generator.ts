/** Step generator for Bucket Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BUCKET_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUCKET_SORT!);

export function generateBucketSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BUCKET_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const minValue = Math.min(...workingArray);
  const maxValue = Math.max(...workingArray);
  const bucketCount = Math.max(1, arrayLength);
  const valueRange = maxValue - minValue + 1;

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    minValue,
    maxValue,
    bucketCount,
  });

  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
  const bucketMembership: number[] = new Array(arrayLength).fill(0);

  // Distribute phase — compare() shows bucket assignment
  for (let distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
    const normalizedPosition = workingArray[distributeIndex]! - minValue;
    const bucketIndex = Math.min(
      Math.floor((normalizedPosition / valueRange) * bucketCount),
      bucketCount - 1,
    );
    buckets[bucketIndex]!.push(workingArray[distributeIndex]!);
    bucketMembership[distributeIndex] = bucketIndex;
    tracker.compare(
      distributeIndex,
      distributeIndex,
      {
        distributeIndex,
        value: workingArray[distributeIndex],
        bucketIndex,
        normalizedPosition,
      },
      `Assigning value ${String(workingArray[distributeIndex]!)} to bucket ${String(bucketIndex)}`,
    );
  }

  // Sort each bucket — compare() for comparisons, swap() for insertions
  for (let bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) {
    const bucket = buckets[bucketIndex]!;
    for (let outerIndex = 1; outerIndex < bucket.length; outerIndex++) {
      const currentValue = bucket[outerIndex]!;
      let insertPosition = outerIndex - 1;

      tracker.compare(
        bucketIndex,
        bucketIndex,
        {
          bucketIndex,
          outerIndex,
          currentValue,
          bucketContents: [...bucket],
        },
        `Sorting bucket ${String(bucketIndex)}: comparing ${String(currentValue)} against neighbors`,
      );

      while (insertPosition >= 0 && bucket[insertPosition]! > currentValue) {
        bucket[insertPosition + 1] = bucket[insertPosition]!;
        insertPosition--;
        tracker.swap(
          bucketIndex,
          bucketIndex,
          {
            bucketIndex,
            insertPosition,
            currentValue,
            bucketContents: [...bucket],
          },
          `Shifting ${String(bucket[insertPosition + 1]!)} right within bucket ${String(bucketIndex)}`,
        );
      }
      bucket[insertPosition + 1] = currentValue;
    }
  }

  // Collect phase — swap() shows writing back from buckets
  let writeIndex = 0;
  for (let bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) {
    for (const bucketValue of buckets[bucketIndex]!) {
      const targetIndex = writeIndex;
      workingArray[writeIndex] = bucketValue;
      tracker.setElementValue(writeIndex, bucketValue);
      writeIndex++;
      tracker.swap(
        targetIndex,
        targetIndex,
        {
          bucketIndex,
          bucketValue,
          targetIndex,
          sortedArray: [...workingArray],
        },
        `Collecting from bucket ${String(bucketIndex)}: placing ${String(bucketValue)} at position ${String(targetIndex)}`,
      );
    }
  }

  // Mark all sorted
  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, {
      sortedIndex,
      value: workingArray[sortedIndex],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
