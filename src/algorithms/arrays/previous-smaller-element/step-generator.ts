/** Step generator for Previous Smaller Element — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PREVIOUS_SMALLER_ELEMENT!);

interface PreviousSmallerElementInput {
  inputArray: number[];
}

export function generatePreviousSmallerElementSteps(
  input: PreviousSmallerElementInput,
): ExecutionStep[] {
  const { inputArray } = input;
  const arrayLength = inputArray.length;
  const resultArray = new Array(arrayLength).fill(-1) as number[];

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    resultArray: [...resultArray],
    stackContents: [],
  });

  if (arrayLength === 0) {
    tracker.complete({ resultArray: [] });
    return tracker.getSteps();
  }

  const increasingStack: number[] = [];

  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    const currentElement = inputArray[scanIndex]!;

    tracker.visit(
      scanIndex,
      {
        scanIndex,
        currentElement,
        stackContents: [...increasingStack],
        resultArray: [...resultArray],
      },
      `Visiting array[${scanIndex}]=${currentElement} — checking stack for the nearest smaller element to the left`,
    );

    // Pop elements >= currentElement (they are no longer candidates)
    while (increasingStack.length > 0) {
      const stackTop = increasingStack[increasingStack.length - 1]!;
      const stackTopValue = inputArray[stackTop]!;

      if (stackTopValue >= currentElement) {
        increasingStack.pop();

        tracker.markElement(
          stackTop,
          "eliminated",
          {
            scanIndex,
            currentElement,
            stackTop,
            stackTopValue,
            stackContents: [...increasingStack],
            resultArray: [...resultArray],
          },
          `array[${stackTop}]=${stackTopValue} >= ${currentElement}, pop from stack — not a valid previous smaller`,
        );
      } else {
        break;
      }
    }

    // Stack top is the nearest smaller element to the left
    if (increasingStack.length > 0) {
      const nearestSmallerIndex = increasingStack[increasingStack.length - 1]!;
      const nearestSmallerValue = inputArray[nearestSmallerIndex]!;
      resultArray[scanIndex] = nearestSmallerValue;

      tracker.markElement(
        nearestSmallerIndex,
        "found",
        {
          scanIndex,
          currentElement,
          nearestSmallerIndex,
          nearestSmallerValue,
          stackContents: [...increasingStack],
          resultArray: [...resultArray],
        },
        `array[${nearestSmallerIndex}]=${nearestSmallerValue} is the previous smaller element for index ${scanIndex}`,
      );
    } else {
      tracker.markElement(
        scanIndex,
        "eliminated",
        {
          scanIndex,
          currentElement,
          stackContents: [],
          resultArray: [...resultArray],
        },
        `No smaller element to the left of index ${scanIndex} — result is -1`,
      );
    }

    increasingStack.push(scanIndex);
  }

  tracker.complete({ resultArray: [...resultArray] });

  return tracker.getSteps();
}
