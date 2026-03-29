/** Step generator for Kadane's Algorithm — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const KADANES_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KADANES_ALGORITHM!);

interface KadanesInput {
  inputArray: number[];
}

export function generateKadanesSteps(input: KadanesInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], KADANES_LINE_MAP);

  if (inputArray.length === 0) {
    tracker.initialize({ arrayLength: 0 });
    tracker.complete({ maxSum: 0, startIndex: -1, endIndex: -1 });
    return tracker.getSteps();
  }

  let currentSum = inputArray[0]!;
  let globalMax = inputArray[0]!;
  let currentStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  tracker.setWindowActive(true);
  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    currentSum,
    globalMax,
  });

  /* Mark the first element as the initial window */
  tracker.moveWindow(
    0,
    0,
    {
      currentSum,
      globalMax,
      currentStart: 0,
      bestStart: 0,
      bestEnd: 0,
    },
    `Start with element ${inputArray[0]} at index 0`,
  );

  for (let scanIndex = 1; scanIndex < inputArray.length; scanIndex++) {
    const extendSum = currentSum + inputArray[scanIndex]!;
    const restartSum = inputArray[scanIndex]!;

    tracker.compareTwo(
      scanIndex - 1,
      scanIndex,
      {
        extendSum,
        restartSum,
        decision: restartSum > extendSum ? "restart" : "extend",
      },
      `Compare: extend (${extendSum}) vs restart (${restartSum})`,
    );

    if (restartSum > extendSum) {
      currentSum = restartSum;
      currentStart = scanIndex;

      tracker.moveWindow(
        scanIndex,
        scanIndex,
        {
          currentSum,
          currentStart: scanIndex,
          action: "restart",
        },
        `Restart subarray at index ${scanIndex}, sum = ${currentSum}`,
      );
    } else {
      currentSum = extendSum;

      tracker.moveWindow(
        currentStart,
        scanIndex,
        {
          currentSum,
          currentStart,
          action: "extend",
        },
        `Extend subarray to index ${scanIndex}, sum = ${currentSum}`,
      );
    }

    if (currentSum > globalMax) {
      globalMax = currentSum;
      bestStart = currentStart;
      bestEnd = scanIndex;
    }

    tracker.visit(
      scanIndex,
      {
        currentSum,
        globalMax,
        bestStart,
        bestEnd,
        comparison: `${currentSum} ${currentSum >= globalMax ? ">=" : "<"} ${globalMax}`,
      },
      `Global max: ${globalMax} (subarray [${bestStart}, ${bestEnd}])`,
    );
  }

  tracker.complete({
    maxSum: globalMax,
    startIndex: bestStart,
    endIndex: bestEnd,
  });

  return tracker.getSteps();
}
