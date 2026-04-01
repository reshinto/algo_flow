/** Step generator for Ternary Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TERNARY_SEARCH!);

export function generateTernarySearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "ternary search");

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
    const rangeSize = highIndex - lowIndex;
    const mid1Index = lowIndex + Math.floor(rangeSize / 3);
    const mid2Index = highIndex - Math.floor(rangeSize / 3);
    const mid1Value = workingArray[mid1Index]!;
    const mid2Value = workingArray[mid2Index]!;

    const pointers = { low: lowIndex, mid1: mid1Index, mid2: mid2Index, high: highIndex };

    // Compare against mid1
    tracker.compare(
      mid1Index,
      pointers,
      {
        lowIndex,
        highIndex,
        mid1Index,
        mid2Index,
        mid1Value,
        mid2Value,
        targetValue,
      },
      `Compare mid1 value ${mid1Value} at index ${mid1Index} with target ${targetValue}`,
    );

    if (mid1Value === targetValue) {
      foundIndex = mid1Index;
      foundTarget = true;
      tracker.found(mid1Index, {
        lowIndex,
        highIndex,
        mid1Index,
        mid2Index,
        resultIndex: mid1Index,
      });
      break;
    }

    // Compare against mid2
    tracker.compare(
      mid2Index,
      pointers,
      {
        lowIndex,
        highIndex,
        mid1Index,
        mid2Index,
        mid1Value,
        mid2Value,
        targetValue,
      },
      `Compare mid2 value ${mid2Value} at index ${mid2Index} with target ${targetValue}`,
    );

    if (mid2Value === targetValue) {
      foundIndex = mid2Index;
      foundTarget = true;
      tracker.found(mid2Index, {
        lowIndex,
        highIndex,
        mid1Index,
        mid2Index,
        resultIndex: mid2Index,
      });
      break;
    }

    if (targetValue < mid1Value) {
      const previousHigh = highIndex;
      highIndex = mid1Index - 1;

      tracker.eliminate(
        mid1Index,
        previousHigh,
        { low: lowIndex, mid1: mid1Index, mid2: mid2Index, high: highIndex },
        { lowIndex, highIndex, mid1Index, mid2Index, mid1Value, mid2Value, targetValue },
        `${targetValue} < ${mid1Value}, eliminate middle and right portions (indices ${mid1Index}–${previousHigh})`,
      );
    } else if (targetValue > mid2Value) {
      const previousLow = lowIndex;
      lowIndex = mid2Index + 1;

      tracker.eliminate(
        previousLow,
        mid2Index,
        { low: lowIndex, mid1: mid1Index, mid2: mid2Index, high: highIndex },
        { lowIndex, highIndex, mid1Index, mid2Index, mid1Value, mid2Value, targetValue },
        `${targetValue} > ${mid2Value}, eliminate left and middle portions (indices ${previousLow}–${mid2Index})`,
      );
    } else {
      const previousLow = lowIndex;
      const previousHigh = highIndex;
      lowIndex = mid1Index + 1;
      highIndex = mid2Index - 1;

      tracker.eliminate(
        previousLow,
        mid1Index,
        { low: lowIndex, mid1: mid1Index, mid2: mid2Index, high: highIndex },
        { lowIndex, highIndex, mid1Index, mid2Index, mid1Value, mid2Value, targetValue },
        `${mid1Value} < ${targetValue} < ${mid2Value}, eliminate outer portions (${previousLow}–${mid1Index} and ${mid2Index}–${previousHigh})`,
      );
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
