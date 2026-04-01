/** Step generator for Minimum in Rotated Sorted Array — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MIN_ROTATED_ARRAY!);

export function generateMinRotatedArraySteps(input: { sortedArray: number[] }): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const tracker = new SearchingTracker(workingArray, 0, LINE_MAP, "minimum in rotated array");

  let lowIndex = 0;
  let highIndex = workingArray.length - 1;

  tracker.initialize({
    sortedArray: workingArray,
    lowIndex,
    highIndex,
  });

  while (lowIndex < highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midValue = workingArray[midIndex]!;
    const highValue = workingArray[highIndex]!;

    const pointers = { low: lowIndex, mid: midIndex, high: highIndex };

    tracker.compare(
      midIndex,
      pointers,
      {
        lowIndex,
        highIndex,
        midIndex,
        midValue,
        highValue,
      },
      `Compare midValue ${midValue} with highValue ${highValue}`,
    );

    if (midValue > highValue) {
      const eliminatedStart = lowIndex;
      const eliminatedEnd = midIndex;
      lowIndex = midIndex + 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: highIndex },
        {
          lowIndex,
          highIndex,
          midValue,
          highValue,
        },
        `${midValue} > ${highValue}, minimum is in right half — eliminate indices ${eliminatedStart}-${eliminatedEnd}`,
      );
    } else {
      const eliminatedStart = midIndex + 1;
      const eliminatedEnd = highIndex;
      highIndex = midIndex;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: highIndex },
        {
          lowIndex,
          highIndex,
          midValue,
          highValue,
        },
        `${midValue} <= ${highValue}, minimum is in left half or at mid — eliminate indices ${eliminatedStart}-${eliminatedEnd}`,
      );
    }
  }

  const minimumValue = workingArray[lowIndex]!;

  tracker.found(lowIndex, {
    lowIndex,
    highIndex,
    resultIndex: lowIndex,
    minimumValue,
  });

  tracker.complete({ resultValue: minimumValue, resultIndex: lowIndex }, true);
  return tracker.getSteps();
}
