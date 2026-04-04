/** Step generator for First Missing Positive — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIRST_MISSING_POSITIVE!);

interface FirstMissingPositiveInput {
  inputArray: number[];
}

export function generateFirstMissingPositiveSteps(
  input: FirstMissingPositiveInput,
): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);
  const arrayLength = inputArray.length;

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    phase: "placement",
  });

  if (arrayLength === 0) {
    tracker.complete({ missingPositive: 1 });
    return tracker.getSteps();
  }

  const workArray = [...inputArray];

  /* Phase 1: Place each value at its correct index via swapping */
  for (let placementIndex = 0; placementIndex < arrayLength; placementIndex++) {
    while (
      workArray[placementIndex]! >= 1 &&
      workArray[placementIndex]! <= arrayLength &&
      workArray[workArray[placementIndex]! - 1] !== workArray[placementIndex] &&
      workArray[placementIndex] !== placementIndex + 1
    ) {
      const correctIndex = workArray[placementIndex]! - 1;
      const currentValue = workArray[placementIndex]!;
      const displacedValue = workArray[correctIndex]!;

      tracker.compareTwo(
        placementIndex,
        correctIndex,
        {
          phase: "placement",
          placementIndex,
          currentValue,
          correctIndex,
          displacedValue,
        },
        `arr[${placementIndex}]=${currentValue} belongs at index ${correctIndex} — swap with arr[${correctIndex}]=${displacedValue}`,
      );

      const tempValue = workArray[correctIndex]!;
      workArray[correctIndex] = workArray[placementIndex]!;
      workArray[placementIndex] = tempValue;

      tracker.swap(
        placementIndex,
        correctIndex,
        {
          phase: "placement",
          placementIndex,
          correctIndex,
          afterSwap: [...workArray],
        },
        `Swapped: arr[${placementIndex}]=${workArray[placementIndex]}, arr[${correctIndex}]=${workArray[correctIndex]}`,
      );
    }

    tracker.markElement(
      placementIndex,
      workArray[placementIndex] === placementIndex + 1 ? "sorted" : "default",
      {
        phase: "placement",
        placementIndex,
        value: workArray[placementIndex],
        inCorrectPlace: workArray[placementIndex] === placementIndex + 1,
      },
      `Index ${placementIndex} settled: value=${workArray[placementIndex]}, correct=${workArray[placementIndex] === placementIndex + 1}`,
    );
  }

  /* Phase 2: Scan for first mismatch */
  let missingPositive = arrayLength + 1;

  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    const expectedValue = scanIndex + 1;

    tracker.visit(
      scanIndex,
      {
        phase: "scan",
        scanIndex,
        value: workArray[scanIndex],
        expected: expectedValue,
        match: workArray[scanIndex] === expectedValue,
      },
      `Scan index ${scanIndex}: value=${workArray[scanIndex]}, expected=${expectedValue} — ${workArray[scanIndex] === expectedValue ? "match" : "MISMATCH — missing positive is " + expectedValue}`,
    );

    if (workArray[scanIndex] !== expectedValue) {
      missingPositive = expectedValue;

      tracker.markElement(
        scanIndex,
        "found",
        {
          phase: "scan",
          scanIndex,
          missingPositive,
        },
        `First missing positive found: ${missingPositive}`,
        "compare",
      );

      break;
    }
  }

  tracker.complete({ missingPositive });

  return tracker.getSteps();
}
