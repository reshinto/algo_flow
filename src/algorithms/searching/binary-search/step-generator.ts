import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const BINARY_SEARCH_LINE_MAP = buildLineMapFromSources("binary-search");

export function generateBinarySearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, BINARY_SEARCH_LINE_MAP);

  let lowIndex = 0;
  let highIndex = workingArray.length - 1;

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    lowIndex,
    highIndex,
  });

  let foundTarget = false;
  let foundIndex = -1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midValue = workingArray[midIndex]!;

    const pointers = { low: lowIndex, mid: midIndex, high: highIndex };

    tracker.compare(
      midIndex,
      pointers,
      {
        lowIndex,
        highIndex,
        midIndex,
        midValue,
        targetValue,
      },
      `Compare midValue ${midValue} with target ${targetValue}`,
    );

    if (midValue === targetValue) {
      foundIndex = midIndex;
      tracker.found(midIndex, {
        lowIndex,
        highIndex,
        midIndex,
        resultIndex: midIndex,
      });
      foundTarget = true;
      break;
    } else if (midValue < targetValue) {
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
          targetValue,
        },
        `${midValue} < ${targetValue}, eliminate left half (indices ${eliminatedStart}-${eliminatedEnd})`,
      );
    } else {
      const eliminatedStart = midIndex;
      const eliminatedEnd = highIndex;
      highIndex = midIndex - 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: highIndex },
        {
          lowIndex,
          highIndex,
          midValue,
          targetValue,
        },
        `${midValue} > ${targetValue}, eliminate right half (indices ${eliminatedStart}-${eliminatedEnd})`,
      );
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
