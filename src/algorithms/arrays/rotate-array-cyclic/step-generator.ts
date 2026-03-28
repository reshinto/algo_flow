/** Step generator for Rotate Array (Cyclic Replacement) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ROTATE_ARRAY_CYCLIC!);

interface RotateArrayCyclicInput {
  inputArray: number[];
  rotateCount: number;
}

export function generateRotateArrayCyclicSteps(input: RotateArrayCyclicInput): ExecutionStep[] {
  const { inputArray, rotateCount } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);
  const arrayLength = inputArray.length;

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    rotateCount,
    effectiveRotation: arrayLength > 0 ? rotateCount % arrayLength : 0,
  });

  if (arrayLength === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const effectiveRotation = rotateCount % arrayLength;

  if (effectiveRotation === 0) {
    tracker.complete({ result: [...inputArray], effectiveRotation: 0, note: "no rotation needed" });
    return tracker.getSteps();
  }

  const workArray = [...inputArray];
  let cyclesCompleted = 0;
  let startIndex = 0;

  while (cyclesCompleted < arrayLength) {
    let currentIndex = startIndex;
    let carryValue = workArray[currentIndex]!;

    tracker.visit(
      currentIndex,
      {
        phase: "cycle-start",
        startIndex,
        currentIndex,
        carryValue,
        cyclesCompleted,
        effectiveRotation,
      },
      `Start cycle at index ${startIndex}: carry value = ${carryValue}`,
    );

    do {
      const destinationIndex = (currentIndex + effectiveRotation) % arrayLength;
      const nextCarry = workArray[destinationIndex]!;

      tracker.compareTwo(
        currentIndex,
        destinationIndex,
        {
          phase: "cycle-move",
          currentIndex,
          destinationIndex,
          carryValue,
          displaced: nextCarry,
          cyclesCompleted,
        },
        `Place ${carryValue} from index ${currentIndex} → index ${destinationIndex} (displacing ${nextCarry})`,
      );

      workArray[destinationIndex] = carryValue;
      carryValue = nextCarry;
      cyclesCompleted++;
      currentIndex = destinationIndex;

      tracker.markElement(
        destinationIndex,
        "sorted",
        {
          phase: "cycle-placed",
          destinationIndex,
          placedValue: workArray[destinationIndex],
          cyclesCompleted,
        },
        `Placed element at index ${destinationIndex} = ${workArray[destinationIndex]}`,
      );
    } while (currentIndex !== startIndex);

    startIndex++;
  }

  tracker.complete({
    result: [...workArray],
    effectiveRotation,
    rotateCount,
    cyclesCompleted,
  });

  return tracker.getSteps();
}
