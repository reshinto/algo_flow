/** Step generator for Rotate Array (Reversal Method) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ROTATE_ARRAY!);

interface RotateArrayInput {
  inputArray: number[];
  rotateCount: number;
}

function reverseSegment(
  workArray: number[],
  leftStart: number,
  rightStart: number,
  phase: string,
  tracker: ArrayTracker,
): void {
  let leftPointer = leftStart;
  let rightPointer = rightStart;

  tracker.moveWindow(
    leftPointer,
    rightPointer,
    { phase, leftPointer, rightPointer },
    `Begin ${phase}: reversing elements from index ${leftPointer} to ${rightPointer}`,
  );

  while (leftPointer < rightPointer) {
    tracker.swap(
      leftPointer,
      rightPointer,
      { phase, leftPointer, rightPointer },
      `Swap index ${leftPointer} (${workArray[leftPointer]}) with index ${rightPointer} (${workArray[rightPointer]})`,
    );

    const tempValue = workArray[leftPointer]!;
    workArray[leftPointer] = workArray[rightPointer]!;
    workArray[rightPointer] = tempValue;

    leftPointer++;
    rightPointer--;

    if (leftPointer <= rightPointer) {
      tracker.moveWindow(
        leftPointer,
        rightPointer,
        { phase, leftPointer, rightPointer },
        `Advance pointers: left=${leftPointer}, right=${rightPointer}`,
      );
    }
  }
}

export function generateRotateArraySteps(input: RotateArrayInput): ExecutionStep[] {
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

  tracker.setWindowActive(true);

  const workArray = [...inputArray];

  /* Phase 1: reverse entire array */
  reverseSegment(workArray, 0, arrayLength - 1, "full-reverse", tracker);

  /* Phase 2: reverse first effectiveRotation elements */
  reverseSegment(workArray, 0, effectiveRotation - 1, "left-reverse", tracker);

  /* Phase 3: reverse remaining elements */
  reverseSegment(workArray, effectiveRotation, arrayLength - 1, "right-reverse", tracker);

  tracker.complete({
    result: [...workArray],
    effectiveRotation,
    rotateCount,
  });

  return tracker.getSteps();
}
