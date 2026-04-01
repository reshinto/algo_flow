/** Step generator for Square Root via Binary Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SQRT_BINARY_SEARCH!);

export function generateSqrtBinarySearchSteps(input: { targetValue: number }): ExecutionStep[] {
  const { targetValue } = input;

  // Build a virtual array representing the answer space [0, 1, 2, ..., min(targetValue, 49)]
  // This keeps the visualization tractable while showing the search space concept
  const virtualArrayLength = Math.min(targetValue + 1, 50);
  const virtualArray = Array.from(
    { length: virtualArrayLength },
    (_, elementIndex) => elementIndex,
  );

  const tracker = new SearchingTracker(virtualArray, targetValue, LINE_MAP, "sqrt binary search");

  if (targetValue < 2) {
    tracker.initialize({
      targetValue,
      lowIndex: 0,
      highIndex: 0,
      resultIndex: targetValue,
      note: "targetValue < 2, result is targetValue itself",
    });
    tracker.found(targetValue, { resultIndex: targetValue, targetValue });
    tracker.complete({ resultIndex: targetValue, targetValue }, true);
    return tracker.getSteps();
  }

  let lowIndex = 1;
  let highIndex = Math.floor(targetValue / 2);
  let resultIndex = 0;

  tracker.initialize({
    targetValue,
    lowIndex,
    highIndex,
    resultIndex,
    searchSpace: `[0..${highIndex}]`,
  });

  let foundExact = false;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midSquared = midIndex * midIndex;
    // Map to virtualArray for visualization (clamp to visible range)
    const visMidIndex = Math.min(midIndex, virtualArrayLength - 1);
    const pointers = {
      low: Math.min(lowIndex, virtualArrayLength - 1),
      mid: visMidIndex,
      high: Math.min(highIndex, virtualArrayLength - 1),
    };

    tracker.compare(
      visMidIndex,
      pointers,
      { lowIndex, highIndex, midIndex, midSquared, targetValue, resultIndex },
      `Compare ${midIndex}² = ${midSquared} with target ${targetValue}`,
    );

    if (midSquared === targetValue) {
      resultIndex = midIndex;
      tracker.found(visMidIndex, {
        lowIndex,
        highIndex,
        midIndex,
        resultIndex: midIndex,
        note: `${midIndex}² = ${midSquared} is exact square root`,
      });
      foundExact = true;
      break;
    } else if (midSquared < targetValue) {
      // midIndex is a valid floor candidate — search for a larger integer root
      resultIndex = midIndex;
      const eliminatedStart = Math.min(lowIndex, virtualArrayLength - 1);
      const eliminatedEnd = visMidIndex;
      lowIndex = midIndex + 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        {
          low: Math.min(lowIndex, virtualArrayLength - 1),
          high: Math.min(highIndex, virtualArrayLength - 1),
        },
        { lowIndex, highIndex, midIndex, midSquared, targetValue, resultIndex },
        `${midIndex}² = ${midSquared} < ${targetValue}: record ${midIndex} as floor, search right`,
      );
    } else {
      // midSquared > targetValue — midIndex is too large, search left
      const eliminatedStart = visMidIndex;
      const eliminatedEnd = Math.min(highIndex, virtualArrayLength - 1);
      highIndex = midIndex - 1;

      tracker.eliminate(
        eliminatedStart,
        eliminatedEnd,
        {
          low: Math.min(lowIndex, virtualArrayLength - 1),
          high: Math.min(highIndex, virtualArrayLength - 1),
        },
        { lowIndex, highIndex, midIndex, midSquared, targetValue, resultIndex },
        `${midIndex}² = ${midSquared} > ${targetValue}: too large, search left`,
      );
    }
  }

  tracker.complete({ resultIndex, targetValue, isExact: foundExact }, true);
  return tracker.getSteps();
}
