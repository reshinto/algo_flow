/** Step generator for Interpolation Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INTERPOLATION_SEARCH!);

export function generateInterpolationSearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "interpolation search");

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

  while (
    lowIndex <= highIndex &&
    targetValue >= workingArray[lowIndex]! &&
    targetValue <= workingArray[highIndex]!
  ) {
    const lowValue = workingArray[lowIndex]!;
    const highValue = workingArray[highIndex]!;

    // Guard against division by zero when all remaining elements are equal
    if (highValue === lowValue) {
      const pointers = { low: lowIndex, high: highIndex };
      tracker.compare(
        lowIndex,
        pointers,
        { lowIndex, highIndex, lowValue, highValue, targetValue },
        `All elements in range equal ${lowValue} — check if it matches target`,
      );

      if (lowValue === targetValue) {
        foundIndex = lowIndex;
        tracker.found(lowIndex, { lowIndex, highIndex, resultIndex: lowIndex });
        foundTarget = true;
      }
      break;
    }

    // Interpolation formula — estimate position using value distribution
    const positionIndex =
      lowIndex +
      Math.floor(((targetValue - lowValue) * (highIndex - lowIndex)) / (highValue - lowValue));

    const positionValue = workingArray[positionIndex]!;
    const pointers = { low: lowIndex, mid: positionIndex, high: highIndex };

    tracker.compare(
      positionIndex,
      pointers,
      { lowIndex, highIndex, positionIndex, positionValue, targetValue },
      `Interpolated position ${positionIndex}: compare value ${positionValue} with target ${targetValue}`,
    );

    if (positionValue === targetValue) {
      foundIndex = positionIndex;
      tracker.found(positionIndex, {
        lowIndex,
        highIndex,
        positionIndex,
        resultIndex: positionIndex,
      });
      foundTarget = true;
      break;
    } else if (positionValue < targetValue) {
      const eliminatedStart = lowIndex;
      const eliminatedEnd = positionIndex;
      lowIndex = positionIndex + 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: highIndex },
        { lowIndex, highIndex, positionValue, targetValue },
        `${positionValue} < ${targetValue}, eliminate left (indices ${eliminatedStart}-${eliminatedEnd})`,
      );
    } else {
      const eliminatedStart = positionIndex;
      const eliminatedEnd = highIndex;
      highIndex = positionIndex - 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: highIndex },
        { lowIndex, highIndex, positionValue, targetValue },
        `${positionValue} > ${targetValue}, eliminate right (indices ${eliminatedStart}-${eliminatedEnd})`,
      );
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
