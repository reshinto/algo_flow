/** Step generator for Counting Sort — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COUNTING_SORT!);

interface CountingSortInput {
  inputArray: number[];
}

export function generateCountingSortSteps(input: CountingSortInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  if (inputArray.length === 0) {
    tracker.initialize({ inputArray: [], phase: "initialize" });
    tracker.complete({ sortedArray: [], phase: "complete" });
    return tracker.getSteps();
  }

  const maxValue = Math.max(...inputArray);
  const countArray = new Array<number>(maxValue + 1).fill(0);

  /* Initialize secondary array as the count array */
  tracker.setSecondaryArray([...countArray], "Count Array");

  tracker.initialize({
    inputArray: [...inputArray],
    maxValue,
    countArrayLength: maxValue + 1,
    phase: "initialize",
  });

  /* Phase 1: Count frequencies */
  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    const currentValue = inputArray[scanIndex]!;
    countArray[currentValue]!++;
    tracker.updateSecondaryElement(currentValue, countArray[currentValue]!, "comparing");

    tracker.visit(
      scanIndex,
      {
        scanIndex,
        currentValue,
        countArray: [...countArray],
        phase: "count",
      },
      `Count ${currentValue}: count[${currentValue}] = ${countArray[currentValue]}`,
    );

    tracker.updateSecondaryElement(currentValue, countArray[currentValue]!, "default");
  }

  /* Phase 2: Reconstruct sorted array */
  let outputIndex = 0;
  for (let currentValue = 0; currentValue <= maxValue; currentValue++) {
    const frequency = countArray[currentValue]!;

    if (frequency === 0) continue;

    tracker.updateSecondaryElement(currentValue, frequency, "sorted");

    for (let repeatIndex = 0; repeatIndex < frequency; repeatIndex++) {
      tracker.markElement(
        outputIndex,
        "sorted",
        {
          outputIndex,
          currentValue,
          repeatIndex,
          frequency,
          phase: "reconstruct",
        },
        `Place value ${currentValue} at output index ${outputIndex} (occurrence ${repeatIndex + 1} of ${frequency})`,
        "visit",
      );
      outputIndex++;
    }
  }

  tracker.complete({
    sortedArray: [...inputArray].sort((valueA, valueB) => valueA - valueB),
    phase: "complete",
  });

  return tracker.getSteps();
}
