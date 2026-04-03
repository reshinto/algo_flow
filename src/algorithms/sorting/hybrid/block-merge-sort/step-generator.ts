/** Step generator for Block Merge Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BLOCK_MERGE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BLOCK_MERGE_SORT!);

export function generateBlockMergeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BLOCK_MERGE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    if (arrayLength === 1) tracker.markSorted(0, { sortedPosition: 0 });
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  // Find natural runs
  const runBoundaries: number[] = [0];
  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    tracker.compare(scanIndex, scanIndex - 1, {
      scanIndex,
      phase: "find-runs",
    });

    if (workingArray[scanIndex]! < workingArray[scanIndex - 1]!) {
      runBoundaries.push(scanIndex);
    }
  }
  runBoundaries.push(arrayLength);

  // Merge runs pairwise
  while (runBoundaries.length > 2) {
    const nextBoundaries: number[] = [0];

    for (let boundaryIndex = 0; boundaryIndex + 2 <= runBoundaries.length - 1; boundaryIndex += 2) {
      const leftStart = runBoundaries[boundaryIndex]!;
      const rightStart = runBoundaries[boundaryIndex + 1]!;
      const mergeEnd = runBoundaries[boundaryIndex + 2]!;

      let leftPointer = leftStart;
      let rightPointer = rightStart;

      while (leftPointer < rightPointer && rightPointer < mergeEnd) {
        tracker.compare(leftPointer, rightPointer, {
          leftStart,
          rightStart,
          mergeEnd,
          leftPointer,
          rightPointer,
          phase: "merge",
        });

        if (workingArray[leftPointer]! <= workingArray[rightPointer]!) {
          leftPointer++;
        } else {
          // Rotation-based in-place merge step
          const displacedValue = workingArray[rightPointer]!;

          for (let shiftIndex = rightPointer; shiftIndex > leftPointer; shiftIndex--) {
            workingArray[shiftIndex] = workingArray[shiftIndex - 1]!;

            tracker.swap(shiftIndex, shiftIndex - 1, {
              leftPointer,
              rightPointer,
              shiftIndex,
              phase: "rotate",
              sortedArray: [...workingArray],
            });
          }

          workingArray[leftPointer] = displacedValue;
          leftPointer++;
          rightPointer++;
        }
      }

      if (boundaryIndex + 3 <= runBoundaries.length - 1) {
        nextBoundaries.push(mergeEnd);
      }
    }

    // Handle odd run
    if ((runBoundaries.length - 1) % 2 === 1) {
      const lastRunStart = runBoundaries[runBoundaries.length - 2]!;
      nextBoundaries.push(lastRunStart);
    }
    nextBoundaries.push(arrayLength);

    runBoundaries.length = 0;
    for (const boundary of nextBoundaries) runBoundaries.push(boundary);

    // Mark the merged region as sorted after each merge pass
    const passEnd = nextBoundaries.length > 1 ? nextBoundaries[1]! : arrayLength;
    for (let markIdx = 0; markIdx < passEnd && markIdx < arrayLength; markIdx++) {
      tracker.markSorted(markIdx, { sortedPosition: markIdx, phase: "merge-pass-complete" });
    }
  }

  // Mark all elements as sorted at the end
  for (let finalIndex = 0; finalIndex < arrayLength; finalIndex++) {
    tracker.markSorted(finalIndex, { sortedPosition: finalIndex, phase: "final" });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
