/** Step generator for Counting Sort (Distribution) — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const COUNTING_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COUNTING_SORT_DISTRIBUTION!);

export function generateCountingSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], COUNTING_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  let minValue = workingArray[0]!;
  let maxValue = workingArray[0]!;
  for (const value of workingArray) {
    if (value < minValue) minValue = value;
    if (value > maxValue) maxValue = value;
  }

  const valueRange = maxValue - minValue + 1;
  const countArray = new Array<number>(valueRange).fill(0);

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    minValue,
    maxValue,
    valueRange,
  });

  // Count phase — use compare() to show we are classifying each element into its bucket
  for (let countIndex = 0; countIndex < arrayLength; countIndex++) {
    const bucketPosition = workingArray[countIndex]! - minValue;
    countArray[bucketPosition]!++;
    tracker.compare(
      countIndex,
      countIndex,
      {
        countIndex,
        value: workingArray[countIndex],
        bucketPosition,
        counts: [...countArray],
      },
      `Counting element ${String(workingArray[countIndex]!)} — bucket ${String(bucketPosition)} now has ${String(countArray[bucketPosition]!)} occurrence(s)`,
    );
  }

  // Place phase — reconstruct sorted array from counts
  let writeIndex = 0;
  for (let valueIndex = 0; valueIndex < valueRange; valueIndex++) {
    while (countArray[valueIndex]! > 0) {
      const placedValue = valueIndex + minValue;
      const originalIndex = writeIndex;
      workingArray[writeIndex] = placedValue;
      countArray[valueIndex]!--;
      writeIndex++;
      tracker.swap(
        originalIndex,
        originalIndex,
        {
          valueIndex,
          placedValue,
          writeIndex,
          counts: [...countArray],
          sortedArray: [...workingArray],
        },
        `Placing value ${String(placedValue)} at position ${String(originalIndex)}`,
      );
    }
  }

  // Mark all elements sorted after placement completes
  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, {
      sortedIndex,
      value: workingArray[sortedIndex],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
