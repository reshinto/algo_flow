/** Step generator for Difference Array (Range Update) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DIFFERENCE_ARRAY!);

interface DifferenceArrayInput {
  arrayLength: number;
  updates: number[][];
}

export function generateDifferenceArraySteps(input: DifferenceArrayInput): ExecutionStep[] {
  const { arrayLength, updates } = input;

  /* Primary array tracks the final result being built */
  const resultArray = new Array<number>(arrayLength).fill(0);
  const tracker = new ArrayTracker([...resultArray], LINE_MAP);

  /* Secondary array shows the difference array state */
  const diffArray = new Array<number>(arrayLength + 1).fill(0);
  tracker.setSecondaryArray([...diffArray], "Difference Array");

  tracker.initialize({
    arrayLength,
    updateCount: updates.length,
    diffArray: [...diffArray],
    result: [...resultArray],
  });

  /* Phase 1: Apply all range updates to the difference array */
  for (let updateIndex = 0; updateIndex < updates.length; updateIndex++) {
    const update = updates[updateIndex]!;
    const leftBound = update[0]!;
    const rightBound = update[1]!;
    const delta = update[2]!;

    diffArray[leftBound]! += delta;
    tracker.updateSecondaryElement(leftBound, diffArray[leftBound]!, "comparing");

    if (rightBound + 1 < diffArray.length) {
      diffArray[rightBound + 1]! -= delta;
      tracker.updateSecondaryElement(rightBound + 1, diffArray[rightBound + 1]!, "comparing");
    }

    tracker.visit(
      leftBound,
      {
        updateIndex,
        leftBound,
        rightBound,
        delta,
        phase: "update",
        diffArray: [...diffArray],
      },
      `Update ${updateIndex + 1}: diff[${leftBound}] += ${delta}, diff[${rightBound + 1}] -= ${delta}`,
    );

    /* Reset comparing states in secondary after each update */
    for (let resetIndex = 0; resetIndex <= arrayLength; resetIndex++) {
      tracker.updateSecondaryElement(resetIndex, diffArray[resetIndex]!, "default");
    }
  }

  /* Phase 2: Reconstruct result via prefix sum of the difference array */
  let runningSum = 0;
  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    runningSum += diffArray[scanIndex]!;
    resultArray[scanIndex] = runningSum;

    tracker.updateSecondaryElement(scanIndex, diffArray[scanIndex]!, "sorted");

    tracker.markElement(
      scanIndex,
      "sorted",
      {
        scanIndex,
        runningSum,
        diffValue: diffArray[scanIndex],
        finalValue: runningSum,
        phase: "reconstruct",
        result: [...resultArray],
      },
      `Reconstruct: result[${scanIndex}] = ${runningSum}`,
      "visit",
    );
  }

  tracker.complete({
    result: [...resultArray],
    arrayLength,
  });

  return tracker.getSteps();
}
