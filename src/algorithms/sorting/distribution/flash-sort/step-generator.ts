/** Step generator for Flash Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FLASH_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FLASH_SORT!);

export function generateFlashSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], FLASH_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  // Handle negatives by offsetting so all values are non-negative
  const offsetValue = Math.min(...workingArray);
  const shiftedArray = workingArray.map((value) => value - offsetValue);

  let minValue = shiftedArray[0]!;
  let maxIndex = 0;
  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    if (shiftedArray[scanIndex]! < minValue) {
      minValue = shiftedArray[scanIndex]!;
    }
    if (shiftedArray[scanIndex]! > shiftedArray[maxIndex]!) {
      maxIndex = scanIndex;
    }
  }

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    minValue: minValue + offsetValue,
    maxValue: shiftedArray[maxIndex]! + offsetValue,
  });

  if (shiftedArray[maxIndex]! === minValue) {
    for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
      tracker.markSorted(sortedIndex, { sortedIndex, value: workingArray[sortedIndex] });
    }
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  const classCount = Math.max(1, Math.floor(0.45 * arrayLength));
  const classVector = new Array<number>(classCount).fill(0);
  const scaleFactor = (classCount - 1) / (shiftedArray[maxIndex]! - minValue);

  // Classify — count elements per class
  for (let classifyIndex = 0; classifyIndex < arrayLength; classifyIndex++) {
    const classIndex = Math.min(
      Math.floor(scaleFactor * (shiftedArray[classifyIndex]! - minValue)),
      classCount - 1,
    );
    classVector[classIndex]!++;
    tracker.compare(
      classifyIndex,
      classifyIndex,
      {
        classifyIndex,
        value: workingArray[classifyIndex],
        classIndex,
        classVector: [...classVector],
      },
      `Classifying value ${String(workingArray[classifyIndex]!)} into class ${String(classIndex)}`,
    );
  }

  // Prefix sums
  for (let prefixIndex = 1; prefixIndex < classCount; prefixIndex++) {
    classVector[prefixIndex]! += classVector[prefixIndex - 1]!;
  }

  // Swap max element to index 0
  const temporaryMax = shiftedArray[0]!;
  shiftedArray[0] = shiftedArray[maxIndex]!;
  shiftedArray[maxIndex] = temporaryMax;
  const workingTemp = workingArray[0]!;
  workingArray[0] = workingArray[maxIndex]!;
  workingArray[maxIndex] = workingTemp;

  tracker.swap(
    0,
    maxIndex,
    {
      swapType: "max-to-front",
      sortedArray: [...workingArray],
    },
    `Swapping maximum element to front for permutation phase`,
  );

  // Permutation cycle
  let cycleIndex = 0;
  let permutationsDone = 0;

  while (permutationsDone < arrayLength - 1) {
    let targetClass = Math.min(
      Math.floor(scaleFactor * (shiftedArray[cycleIndex]! - minValue)),
      classCount - 1,
    );
    while (cycleIndex >= classVector[targetClass]!) {
      cycleIndex++;
      targetClass = Math.min(
        Math.floor(scaleFactor * (shiftedArray[cycleIndex]! - minValue)),
        classCount - 1,
      );
      tracker.compare(
        cycleIndex,
        cycleIndex,
        { cycleIndex, targetClass, permutationsDone },
        `Advancing cycle pointer to index ${String(cycleIndex)}`,
      );
    }

    let holdShifted = shiftedArray[cycleIndex]!;
    let holdOriginal = workingArray[cycleIndex]!;
    targetClass = Math.min(Math.floor(scaleFactor * (holdShifted - minValue)), classCount - 1);

    while (cycleIndex !== classVector[targetClass]! - 1) {
      targetClass = Math.min(Math.floor(scaleFactor * (holdShifted - minValue)), classCount - 1);
      const targetPosition = classVector[targetClass]! - 1;

      const flashShifted = shiftedArray[targetPosition]!;
      const flashOriginal = workingArray[targetPosition]!;
      shiftedArray[targetPosition] = holdShifted;
      workingArray[targetPosition] = holdOriginal;
      holdShifted = flashShifted;
      holdOriginal = flashOriginal;
      classVector[targetClass]!--;
      permutationsDone++;

      tracker.swap(
        cycleIndex,
        targetPosition,
        {
          targetPosition,
          placedValue: workingArray[targetPosition],
          permutationsDone,
          sortedArray: [...workingArray],
        },
        `Permuting: placing value ${String(workingArray[targetPosition]!)} at position ${String(targetPosition)}`,
      );
    }
    // Place the final held value at cycleIndex to complete this cycle
    shiftedArray[cycleIndex] = holdShifted;
    workingArray[cycleIndex] = holdOriginal;
    tracker.setElementValue(cycleIndex, holdOriginal);
    permutationsDone++;
  }

  // Insertion sort pass
  for (let outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
    const currentValue = workingArray[outerIndex]!;
    const currentShifted = shiftedArray[outerIndex]!;
    let insertPosition = outerIndex - 1;

    while (insertPosition >= 0 && shiftedArray[insertPosition]! > currentShifted) {
      tracker.compare(
        insertPosition + 1,
        insertPosition,
        { outerIndex, insertPosition, comparing: workingArray[insertPosition] },
        `Insertion pass: ${String(workingArray[insertPosition]!)} > ${String(currentValue)}, shifting right`,
      );
      shiftedArray[insertPosition + 1] = shiftedArray[insertPosition]!;
      workingArray[insertPosition + 1] = workingArray[insertPosition]!;
      tracker.swap(
        insertPosition + 1,
        insertPosition,
        { insertPosition, currentValue, sortedArray: [...workingArray] },
        `Shifting ${String(workingArray[insertPosition + 1]!)} right`,
      );
      insertPosition--;
    }
    shiftedArray[insertPosition + 1] = currentShifted;
    workingArray[insertPosition + 1] = currentValue;

    tracker.markSorted(outerIndex, {
      outerIndex,
      insertPosition: insertPosition + 1,
      value: currentValue,
    });
  }

  tracker.markSorted(0, { sortedPosition: 0, value: workingArray[0] });

  // Sync tracker elements with final sorted workingArray before completing
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
