/** Step generator for Single Number (XOR) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SINGLE_NUMBER!);

interface SingleNumberInput {
  inputArray: number[];
}

export function generateSingleNumberSteps(input: SingleNumberInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    runningXor: 0,
  });

  if (inputArray.length === 0) {
    tracker.complete({ uniqueElement: 0 });
    return tracker.getSteps();
  }

  let runningXor = 0;

  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    const currentElement = inputArray[scanIndex]!;
    const previousXor = runningXor;
    runningXor ^= currentElement;

    const isLastElement = scanIndex === inputArray.length - 1;

    if (isLastElement) {
      tracker.markElement(
        scanIndex,
        "found",
        {
          scanIndex,
          currentElement,
          previousXor,
          runningXor,
        },
        `XOR array[${scanIndex}]=${currentElement} — runningXor is now ${runningXor} (unique element revealed)`,
        "found",
      );
    } else {
      tracker.visit(
        scanIndex,
        {
          scanIndex,
          currentElement,
          previousXor,
          runningXor,
        },
        `XOR array[${scanIndex}]=${currentElement} — runningXor is now ${runningXor}`,
      );
    }
  }

  tracker.complete({ uniqueElement: runningXor });

  return tracker.getSteps();
}
