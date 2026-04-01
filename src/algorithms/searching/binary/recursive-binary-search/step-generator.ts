/** Step generator for Recursive Binary Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RECURSIVE_BINARY_SEARCH!);

export function generateRecursiveBinarySearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(
    workingArray,
    targetValue,
    LINE_MAP,
    "recursive binary search",
  );

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    lowIndex: 0,
    highIndex: workingArray.length - 1,
  });

  let foundTarget = false;
  let foundIndex = -1;

  // Iterative simulation of recursion using an explicit stack
  interface SearchFrame {
    lowIndex: number;
    highIndex: number;
  }

  const callStack: SearchFrame[] = [{ lowIndex: 0, highIndex: workingArray.length - 1 }];

  while (callStack.length > 0) {
    const frame = callStack[callStack.length - 1]!;
    callStack.pop();

    const { lowIndex, highIndex } = frame;

    if (lowIndex > highIndex) {
      // Base case: range exhausted — no push needed, loop continues
      continue;
    }

    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midValue = workingArray[midIndex]!;
    const pointers = { low: lowIndex, mid: midIndex, high: highIndex };

    tracker.compare(
      midIndex,
      pointers,
      { lowIndex, highIndex, midIndex, midValue, targetValue },
      `Compare midValue ${midValue} with target ${targetValue}`,
    );

    if (midValue === targetValue) {
      foundIndex = midIndex;
      tracker.found(midIndex, { lowIndex, highIndex, midIndex, resultIndex: midIndex });
      foundTarget = true;
      break;
    } else if (midValue < targetValue) {
      const eliminatedStart = lowIndex;
      const eliminatedEnd = midIndex;
      const nextLow = midIndex + 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: nextLow, high: highIndex },
        { lowIndex: nextLow, highIndex, midValue, targetValue },
        `${midValue} < ${targetValue}, recurse right (indices ${nextLow}-${highIndex})`,
      );

      callStack.push({ lowIndex: nextLow, highIndex });
    } else {
      const eliminatedStart = midIndex;
      const eliminatedEnd = highIndex;
      const nextHigh = midIndex - 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        { low: lowIndex, high: nextHigh },
        { lowIndex, highIndex: nextHigh, midValue, targetValue },
        `${midValue} > ${targetValue}, recurse left (indices ${lowIndex}-${nextHigh})`,
      );

      callStack.push({ lowIndex, highIndex: nextHigh });
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
