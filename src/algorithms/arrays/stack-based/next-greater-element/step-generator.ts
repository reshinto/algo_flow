/** Step generator for Next Greater Element — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.NEXT_GREATER_ELEMENT!);

interface NextGreaterElementInput {
  inputArray: number[];
}

export function generateNextGreaterElementSteps(input: NextGreaterElementInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  const resultArray = new Array(inputArray.length).fill(-1) as number[];

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    resultArray: [...resultArray],
    stackContents: [],
  });

  if (inputArray.length === 0) {
    tracker.complete({ resultArray: [] });
    return tracker.getSteps();
  }

  const pendingStack: number[] = [];

  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    const currentElement = inputArray[scanIndex]!;

    tracker.visit(
      scanIndex,
      {
        scanIndex,
        currentElement,
        stackContents: [...pendingStack],
        resultArray: [...resultArray],
      },
      `Visiting array[${scanIndex}]=${currentElement} — checking stack for elements waiting for a greater value`,
    );

    while (pendingStack.length > 0) {
      const stackTop = pendingStack[pendingStack.length - 1]!;
      const stackTopValue = inputArray[stackTop]!;

      if (stackTopValue < currentElement) {
        const poppedIndex = pendingStack.pop()!;
        resultArray[poppedIndex] = currentElement;

        tracker.markElement(
          poppedIndex,
          "found",
          {
            scanIndex,
            currentElement,
            poppedIndex,
            stackTopValue,
            stackContents: [...pendingStack],
            resultArray: [...resultArray],
          },
          `array[${poppedIndex}]=${stackTopValue} resolved — next greater element is ${currentElement}`,
        );
      } else {
        break;
      }
    }

    pendingStack.push(scanIndex);
  }

  // Mark remaining stack elements (no greater element found)
  for (const remainingIndex of pendingStack) {
    tracker.markElement(
      remainingIndex,
      "eliminated",
      {
        remainingIndex,
        resultArray: [...resultArray],
        stackContents: [],
      },
      `array[${remainingIndex}]=${inputArray[remainingIndex]!} has no greater element to the right — result is -1`,
    );
  }

  tracker.complete({ resultArray: [...resultArray] });

  return tracker.getSteps();
}
