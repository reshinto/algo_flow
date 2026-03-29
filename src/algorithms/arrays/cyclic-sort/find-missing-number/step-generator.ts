/** Step generator for Find Missing Number (XOR) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIND_MISSING_NUMBER!);

interface FindMissingNumberInput {
  inputArray: number[];
}

export function generateFindMissingNumberSteps(input: FindMissingNumberInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  const arrayLength = inputArray.length;

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    currentXor: 0,
  });

  let currentXor = 0;

  // XOR with expected range 0..n
  for (let expectedRange = 0; expectedRange <= arrayLength; expectedRange++) {
    currentXor ^= expectedRange;

    tracker.visit(
      Math.min(expectedRange, arrayLength - 1),
      {
        expectedRange,
        currentXor,
        phase: "xor-range",
      },
      `XOR expected value ${expectedRange} — currentXor is now ${currentXor}`,
    );
  }

  // XOR with all array elements
  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    const currentElement = inputArray[scanIndex]!;
    currentXor ^= currentElement;

    tracker.visit(
      scanIndex,
      {
        scanIndex,
        currentElement,
        currentXor,
        phase: "xor-array",
      },
      `XOR array[${scanIndex}]=${currentElement} — currentXor is now ${currentXor}`,
    );
  }

  // Mark the missing number's conceptual position (currentXor is missing number)
  if (arrayLength > 0) {
    tracker.markElement(
      Math.min(currentXor, arrayLength - 1),
      "found",
      {
        missingNumber: currentXor,
        currentXor,
      },
      `Missing number found: ${currentXor} (all pairs cancelled, remainder is the missing value)`,
      "found",
    );
  }

  tracker.complete({ missingNumber: currentXor });

  return tracker.getSteps();
}
