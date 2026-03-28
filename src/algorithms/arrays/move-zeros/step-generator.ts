/** Step generator for Move Zeros to End — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MOVE_ZEROS!);

interface MoveZerosInput {
  inputArray: number[];
}

export function generateMoveZerosSteps(input: MoveZerosInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    writePointer: 0,
  });

  if (inputArray.length === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const workArray = [...inputArray];
  let writePointer = 0;
  let swapCount = 0;

  for (let readPointer = 0; readPointer < workArray.length; readPointer++) {
    const currentElement = workArray[readPointer]!;

    tracker.compareTwo(
      writePointer,
      readPointer,
      {
        writePointer,
        readPointer,
        currentElement,
        isNonZero: currentElement !== 0,
      },
      `Check element ${currentElement} at index ${readPointer} — ${currentElement !== 0 ? "non-zero, will swap" : "zero, skip"}`,
    );

    if (currentElement !== 0) {
      if (writePointer !== readPointer) {
        tracker.swap(
          writePointer,
          readPointer,
          {
            writePointer,
            readPointer,
            swappedValue: currentElement,
            swapCount: swapCount + 1,
          },
          `Swap non-zero ${currentElement} at index ${readPointer} with position ${writePointer}`,
        );

        const tempValue = workArray[writePointer]!;
        workArray[writePointer] = currentElement;
        workArray[readPointer] = tempValue;
        swapCount++;
      }

      tracker.markElement(
        writePointer,
        "sorted",
        {
          writePointer,
          readPointer,
          placedValue: workArray[writePointer],
          swapCount,
        },
        `Non-zero ${workArray[writePointer]} placed at position ${writePointer}`,
      );

      writePointer++;
    }
  }

  tracker.complete({
    result: [...workArray],
    swapCount,
    zerosCount: inputArray.filter((value) => value === 0).length,
  });

  return tracker.getSteps();
}
