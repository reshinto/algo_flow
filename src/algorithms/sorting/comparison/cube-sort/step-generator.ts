/** Step generator for Cube Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CUBE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CUBE_SORT!);

export function generateCubeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], CUBE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  const blockSize = Math.max(1, Math.ceil(Math.cbrt(arrayLength)));
  const blockCount = Math.ceil(arrayLength / blockSize);

  // Phase 1: Insertion sort each block
  for (let blockIndex = 0; blockIndex < blockCount; blockIndex++) {
    const blockStart = blockIndex * blockSize;
    const blockEnd = Math.min(blockStart + blockSize, arrayLength);

    for (let outerIndex = blockStart + 1; outerIndex < blockEnd; outerIndex++) {
      const currentValue = workingArray[outerIndex]!;
      let innerIndex = outerIndex - 1;

      tracker.compare(outerIndex, innerIndex, {
        phase: "block-insertion-sort",
        blockIndex,
        outerIndex,
        innerIndex,
        currentValue,
      });

      while (innerIndex >= blockStart && workingArray[innerIndex]! > currentValue) {
        workingArray[innerIndex + 1] = workingArray[innerIndex]!;
        workingArray[innerIndex] = currentValue;

        tracker.setElementValue(innerIndex + 1, workingArray[innerIndex + 1]!);
        tracker.setElementValue(innerIndex, workingArray[innerIndex]!);
        tracker.swap(innerIndex + 1, innerIndex, {
          phase: "block-insertion-sort",
          blockIndex,
          sortedArray: [...workingArray],
        });

        innerIndex--;

        if (innerIndex >= blockStart) {
          tracker.compare(innerIndex + 1, innerIndex, {
            phase: "block-insertion-sort",
            blockIndex,
            innerIndex,
            currentValue,
          });
        }
      }
      workingArray[innerIndex + 1] = currentValue;
      tracker.setElementValue(innerIndex + 1, currentValue);
    }
  }

  // Phase 2: K-way merge — track visually
  const resultArray: number[] = new Array(arrayLength) as number[];
  const blockPointers: number[] = [];
  for (let blockIndex = 0; blockIndex < blockCount; blockIndex++) {
    blockPointers.push(blockIndex * blockSize);
  }

  const mergeSnapshot = [...workingArray];

  for (let resultIndex = 0; resultIndex < arrayLength; resultIndex++) {
    let minimumValue = Infinity;
    let minimumBlock = -1;
    let minimumPointer = -1;

    for (let blockIndex = 0; blockIndex < blockCount; blockIndex++) {
      const pointer = blockPointers[blockIndex]!;
      const blockEnd = Math.min((blockIndex + 1) * blockSize, arrayLength);

      if (pointer < blockEnd) {
        const candidateIndex = pointer;
        const compareIndex = minimumPointer >= 0 ? minimumPointer : candidateIndex;

        tracker.compare(candidateIndex, compareIndex, {
          phase: "merge",
          resultIndex,
          blockIndex,
          candidate: mergeSnapshot[candidateIndex],
        });

        if (mergeSnapshot[pointer]! < minimumValue) {
          minimumValue = mergeSnapshot[pointer]!;
          minimumBlock = blockIndex;
          minimumPointer = pointer;
        }
      }
    }

    resultArray[resultIndex] = minimumValue;
    blockPointers[minimumBlock] = (blockPointers[minimumBlock] ?? 0) + 1;
  }

  // Write results back and mark sorted
  for (let copyIndex = 0; copyIndex < arrayLength; copyIndex++) {
    workingArray[copyIndex] = resultArray[copyIndex]!;
  }

  // Sync tracker elements with final sorted values before marking sorted
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, {
      sortedIndex,
      sortedArray: [...workingArray],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
