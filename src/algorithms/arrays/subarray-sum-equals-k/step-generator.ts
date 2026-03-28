/** Step generator for Subarray Sum Equals K — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUBARRAY_SUM_EQUALS_K!);

interface SubarraySumEqualsKInput {
  inputArray: number[];
  target: number;
}

export function generateSubarraySumEqualsKSteps(input: SubarraySumEqualsKInput): ExecutionStep[] {
  const { inputArray, target } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  const prefixSumMap: Map<number, number> = new Map();
  prefixSumMap.set(0, 1);

  tracker.initialize({
    inputArray: [...inputArray],
    target,
    arrayLength: inputArray.length,
    prefixSumMap: { 0: 1 },
    runningSum: 0,
    foundCount: 0,
  });

  if (inputArray.length === 0) {
    tracker.complete({
      count: 0,
      subarrays: [],
    });
    return tracker.getSteps();
  }

  /* Use secondary array to visualize running prefix sums at each position */
  tracker.setSecondaryArray(new Array(inputArray.length).fill(0), "Running Sum");

  let runningSum = 0;
  let foundCount = 0;

  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    runningSum += inputArray[scanIndex]!;

    tracker.updateSecondaryElement(scanIndex, runningSum, "current");

    tracker.visit(
      scanIndex,
      {
        scanIndex,
        runningSum,
        currentElement: inputArray[scanIndex],
        prefixSumMap: Object.fromEntries(prefixSumMap),
        foundCount,
      },
      `Visit index ${scanIndex}: element = ${inputArray[scanIndex]}, runningSum = ${runningSum}`,
    );

    const lookupKey = runningSum - target;
    const hasMatch = prefixSumMap.has(lookupKey);

    if (hasMatch) {
      const matchCount = prefixSumMap.get(lookupKey)!;
      foundCount += matchCount;

      tracker.markElement(
        scanIndex,
        "found",
        {
          scanIndex,
          runningSum,
          lookupKey,
          matchCount,
          foundCount,
          prefixSumMap: Object.fromEntries(prefixSumMap),
          explanation: `runningSum(${runningSum}) - target(${target}) = ${lookupKey} found in map → ${matchCount} subarray(s) end here`,
        },
        `Found: runningSum ${runningSum} - target ${target} = ${lookupKey} exists in map (${matchCount} time(s)) → total found = ${foundCount}`,
        "compare",
      );

      tracker.updateSecondaryElement(scanIndex, runningSum, "sorted");
    } else {
      tracker.markElement(
        scanIndex,
        "comparing",
        {
          scanIndex,
          runningSum,
          lookupKey,
          hasMatch: false,
          prefixSumMap: Object.fromEntries(prefixSumMap),
          explanation: `runningSum(${runningSum}) - target(${target}) = ${lookupKey} not found in map`,
        },
        `Check: runningSum ${runningSum} - target ${target} = ${lookupKey} — not in map, no subarray ends here`,
        "compare",
      );

      tracker.updateSecondaryElement(scanIndex, runningSum, "default");
    }

    prefixSumMap.set(runningSum, (prefixSumMap.get(runningSum) ?? 0) + 1);
  }

  tracker.complete({
    count: foundCount,
    prefixSumMap: Object.fromEntries(prefixSumMap),
  });

  return tracker.getSteps();
}
