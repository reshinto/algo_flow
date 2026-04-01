/** Step generator for Linear Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LINEAR_SEARCH!);

export function generateLinearSearchSteps(input: {
  array: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.array];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "linear search");

  tracker.initialize({
    array: workingArray,
    targetValue,
    arrayLength: workingArray.length,
  });

  let foundTarget = false;
  let foundIndex = -1;

  for (let currentIndex = 0; currentIndex < workingArray.length; currentIndex++) {
    const currentValue = workingArray[currentIndex]!;

    tracker.visit(
      currentIndex,
      { current: currentIndex },
      { currentIndex, currentValue, targetValue },
    );

    tracker.compare(
      currentIndex,
      { current: currentIndex },
      { currentIndex, currentValue, targetValue },
      `Compare element at index ${currentIndex} (value: ${currentValue}) with target ${targetValue}`,
    );

    if (currentValue === targetValue) {
      foundIndex = currentIndex;
      tracker.found(currentIndex, {
        currentIndex,
        resultIndex: currentIndex,
      });
      foundTarget = true;
      break;
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
