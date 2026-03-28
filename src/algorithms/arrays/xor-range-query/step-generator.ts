/** Step generator for XOR Range Query — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.XOR_RANGE_QUERY!);

interface XorRangeQueryInput {
  inputArray: number[];
  queries: number[][];
}

export function generateXorRangeQuerySteps(input: XorRangeQueryInput): ExecutionStep[] {
  const { inputArray, queries } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    queryCount: queries.length,
    phase: "build",
  });

  if (inputArray.length === 0) {
    tracker.complete({ prefixXor: [], queryResults: [] });
    return tracker.getSteps();
  }

  /* Phase 1: Build prefix XOR array */
  tracker.setSecondaryArray(new Array(inputArray.length).fill(0), "Prefix XOR");

  let runningXor = 0;

  for (let buildIndex = 0; buildIndex < inputArray.length; buildIndex++) {
    runningXor ^= inputArray[buildIndex]!;

    tracker.updateSecondaryElement(buildIndex, runningXor, "current");

    tracker.visit(
      buildIndex,
      {
        buildIndex,
        runningXor,
        phase: "build",
        currentElement: inputArray[buildIndex],
        prefixXorSoFar: runningXor,
      },
      `Build prefixXor[${buildIndex}] = ${runningXor} (XOR through index ${buildIndex})`,
    );

    tracker.updateSecondaryElement(buildIndex, runningXor, "sorted");
  }

  /* Reconstruct full prefix XOR array for query phase */
  const prefixXor: number[] = [];
  let accumulatedXor = 0;
  for (let rebuildIndex = 0; rebuildIndex < inputArray.length; rebuildIndex++) {
    accumulatedXor ^= inputArray[rebuildIndex]!;
    prefixXor.push(accumulatedXor);
  }

  const queryResults: number[] = [];

  /* Phase 2: Answer range XOR queries */
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
        `Query [${leftBound}, ${rightBound}]: highlight element at index ${rangeIndex}`,
        "compare",
      );
    }

    const prefixLeft = leftBound === 0 ? 0 : prefixXor[leftBound - 1]!;
    const prefixRight = prefixXor[rightBound]!;
    const rangeXor = prefixRight ^ prefixLeft;
    queryResults.push(rangeXor);

    tracker.markElement(
      rightBound,
      "found",
      {
        queryIndex,
        leftBound,
        rightBound,
        rangeXor,
        lookupLeft: prefixLeft,
        lookupRight: prefixRight,
        phase: "query",
      },
      `Query [${leftBound}, ${rightBound}] = prefixXor[${rightBound}] ^ prefixXor[${leftBound - 1}] = ${prefixRight} ^ ${prefixLeft} = ${rangeXor}`,
      "compare",
    );

    /* Reset highlighted elements */
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

  tracker.complete({ prefixXor, queryResults });

  return tracker.getSteps();
}
