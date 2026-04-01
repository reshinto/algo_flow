/** Step generator for Find Peak Element — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIND_PEAK_ELEMENT!);

export function generateFindPeakElementSteps(input: { array: number[] }): ExecutionStep[] {
  const workingArray = [...input.array];
  // No targetValue for this algorithm — pass 0 as placeholder required by SearchingTracker
  const tracker = new SearchingTracker(workingArray, 0, LINE_MAP, "find peak element");

  let lowIndex = 0;
  let highIndex = workingArray.length - 1;

  tracker.initialize({
    array: workingArray,
    description: "Find a peak element in the array",
    lowIndex,
    highIndex,
  });

  while (lowIndex < highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midValue = workingArray[midIndex]!;
    const nextValue = workingArray[midIndex + 1]!;
    const pointers = { low: lowIndex, mid: midIndex, high: highIndex };

    tracker.compare(
      midIndex,
      pointers,
      { lowIndex, highIndex, midIndex, midValue, nextValue },
      `Compare arr[${midIndex}]=${midValue} with arr[${midIndex + 1}]=${nextValue}`,
    );

    if (midValue < nextValue) {
      // Slope is ascending — peak must be to the right
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
          nextValue,
          note: "ascending slope — peak is to the right",
        },
        `${midValue} < ${nextValue}: ascending slope, eliminate left half up to index ${midIndex}`,
      );
    } else {
      // Slope is descending or flat — peak is at mid or to the left
      const eliminatedStart = midIndex + 1;
      const eliminatedEnd = highIndex;
      highIndex = midIndex;

      if (eliminatedStart <= eliminatedEnd) {
        tracker.eliminate(
          eliminatedStart,
          eliminatedEnd,
          { low: lowIndex, high: highIndex },
          {
            lowIndex,
            highIndex,
            midValue,
            nextValue,
            note: "descending slope — peak is at mid or left",
          },
          `${midValue} >= ${nextValue}: descending slope, eliminate right half from index ${midIndex + 1}`,
        );
      }
    }
  }

  // When low === high, that position is the peak
  const peakIndex = lowIndex;
  const peakValue = workingArray[peakIndex]!;

  tracker.found(peakIndex, {
    peakIndex,
    peakValue,
    note: "low === high — peak element found",
  });

  tracker.complete({ peakIndex, peakValue }, true);
  return tracker.getSteps();
}
