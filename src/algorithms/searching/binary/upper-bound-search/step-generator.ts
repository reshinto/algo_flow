/** Step generator for Upper Bound Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.UPPER_BOUND_SEARCH!);

export function generateUpperBoundSearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "upper bound search");

  let lowIndex = 0;
  let highIndex = workingArray.length;
  let resultIndex = workingArray.length;

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    lowIndex,
    highIndex,
    resultIndex,
  });

  let foundCandidate = false;

  while (lowIndex < highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midValue = workingArray[midIndex]!;
    const pointers = { low: lowIndex, mid: midIndex, high: highIndex };

    tracker.compare(
      midIndex,
      pointers,
      { lowIndex, highIndex, midIndex, midValue, targetValue, resultIndex },
      `Compare midValue ${midValue} with target ${targetValue}`,
    );

    if (midValue > targetValue) {
      // midValue is strictly greater — record as candidate and search left for an earlier one
      resultIndex = midIndex;
      foundCandidate = true;
      tracker.found(midIndex, {
        lowIndex,
        highIndex,
        midIndex,
        resultIndex,
        note: "candidate upper bound — continuing search left",
      });

      const eliminatedStart = midIndex;
      const eliminatedEnd = highIndex - 1;
      highIndex = midIndex;

      if (eliminatedStart <= eliminatedEnd) {
        tracker.eliminate(
          eliminatedStart + 1,
          eliminatedEnd,
          { low: lowIndex, high: highIndex },
          { lowIndex, highIndex, midValue, targetValue, resultIndex },
          `${midValue} > ${targetValue}, record index ${midIndex} as candidate, search left`,
        );
      }
    } else {
      const eliminatedStart = lowIndex;
      const eliminatedEnd = midIndex;
      lowIndex = midIndex + 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: highIndex },
        { lowIndex, highIndex, midValue, targetValue, resultIndex },
        `${midValue} <= ${targetValue}, upper bound must be to the right`,
      );
    }
  }

  tracker.complete({ resultIndex, targetValue, found: foundCandidate }, foundCandidate);
  return tracker.getSteps();
}
