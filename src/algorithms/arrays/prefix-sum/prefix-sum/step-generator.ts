/** Step generator for Prefix Sum (Range Query) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PREFIX_SUM!);

interface PrefixSumInput {
  inputArray: number[];
  queries: number[][];
}

export function generatePrefixSumSteps(input: PrefixSumInput): ExecutionStep[] {
  const { inputArray, queries } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    queryCount: queries.length,
    phase: "build",
  });

  if (inputArray.length === 0) {
    tracker.complete({
      prefixArray: [],
      queryResults: [],
    });
    return tracker.getSteps();
  }

  /* Phase 1: Build prefix sum array */
  tracker.setSecondaryArray(new Array(inputArray.length).fill(0), "Prefix Sum");

  let runningSum = 0;

  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    runningSum += inputArray[scanIndex]!;

    tracker.updateSecondaryElement(scanIndex, runningSum, "current");

    tracker.visit(
      scanIndex,
      {
        scanIndex,
        runningSum,
        phase: "build",
        currentElement: inputArray[scanIndex],
        prefixSoFar: runningSum,
      },
      `Build prefix[${scanIndex}] = ${runningSum} (cumulative sum through index ${scanIndex})`,
    );

    tracker.updateSecondaryElement(scanIndex, runningSum, "sorted");
  }

  /* Phase 2: Answer range queries */
  const prefixArray: number[] = [];
  let tempSum = 0;
  for (let buildIndex = 0; buildIndex < inputArray.length; buildIndex++) {
    tempSum += inputArray[buildIndex]!;
    prefixArray.push(tempSum);
  }

  const queryResults: number[] = [];

  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    const currentQuery = queries[queryIndex]!;
    const leftBound = currentQuery[0]!;
    const rightBound = currentQuery[1]!;

    /* Highlight the query range on the primary array */
    for (let rangeIndex = leftBound; rangeIndex <= rightBound; rangeIndex++) {
      tracker.markElement(
        rangeIndex,
        "comparing",
        {
          queryIndex,
          leftBound,
          rightBound,
          phase: "query",
        },
        `Query [${leftBound}, ${rightBound}]: highlight range element at index ${rangeIndex}`,
        "compare",
      );
    }

    const prefixLeft = leftBound === 0 ? 0 : prefixArray[leftBound - 1]!;
    const prefixRight = prefixArray[rightBound]!;
    const rangeSum = prefixRight - prefixLeft;
    queryResults.push(rangeSum);

    tracker.markElement(
      rightBound,
      "found",
      {
        queryIndex,
        leftBound,
        rightBound,
        rangeSum,
        lookupLeft: prefixLeft,
        lookupRight: prefixRight,
        phase: "query",
      },
      `Query [${leftBound}, ${rightBound}] = prefix[${rightBound}] - prefix[${leftBound - 1}] = ${prefixRight} - ${prefixLeft} = ${rangeSum}`,
      "compare",
    );

    /* Reset compared elements */
    for (let rangeIndex = leftBound; rangeIndex <= rightBound; rangeIndex++) {
      tracker.markElement(
        rangeIndex,
        "default",
        { phase: "reset" },
        `Reset element at index ${rangeIndex}`,
        "visit",
      );
    }
  }

  tracker.complete({
    prefixArray,
    queryResults,
  });

  return tracker.getSteps();
}
