/** Step generator for Block Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BLOCK_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BLOCK_SORT!);

export function generateBlockSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BLOCK_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  function reverseSegment(startIndex: number, endIndex: number): void {
    let low = startIndex;
    let high = endIndex;
    while (low < high) {
      const temporaryValue = workingArray[low]!;
      workingArray[low] = workingArray[high]!;
      workingArray[high] = temporaryValue;

      tracker.swap(low, high, {
        phase: "rotate",
        low,
        high,
        sortedArray: [...workingArray],
      });

      low++;
      high--;
    }
  }

  function rotateLeft(leftStart: number, midPoint: number, rightEnd: number): void {
    reverseSegment(leftStart, midPoint - 1);
    reverseSegment(midPoint, rightEnd);
    reverseSegment(leftStart, rightEnd);
  }

  function mergeInPlace(runStart: number, runMid: number, runEnd: number): void {
    if (runStart >= runMid || runMid > runEnd) return;

    let leftPointer = runStart;
    let rightPointer = runMid;

    while (leftPointer < rightPointer && rightPointer <= runEnd) {
      tracker.compare(leftPointer, rightPointer, {
        phase: "merge",
        leftPointer,
        rightPointer,
      });

      if (workingArray[leftPointer]! <= workingArray[rightPointer]!) {
        leftPointer++;
      } else {
        let insertionPoint = rightPointer;

        while (
          insertionPoint <= runEnd &&
          workingArray[insertionPoint]! < workingArray[leftPointer]!
        ) {
          tracker.compare(insertionPoint, leftPointer, {
            phase: "find-insertion",
            insertionPoint,
            leftPointer,
          });
          insertionPoint++;
        }

        const rightSegmentLength = insertionPoint - rightPointer;
        rotateLeft(leftPointer, rightPointer, insertionPoint - 1);

        leftPointer += rightSegmentLength;
        rightPointer = insertionPoint;
      }
    }
  }

  // Find natural sorted runs
  const runs: [number, number][] = [];
  let runStart = 0;

  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    tracker.compare(scanIndex, scanIndex - 1, {
      phase: "find-runs",
      scanIndex,
    });

    if (workingArray[scanIndex]! < workingArray[scanIndex - 1]!) {
      runs.push([runStart, scanIndex - 1]);
      runStart = scanIndex;
    }
  }
  runs.push([runStart, arrayLength - 1]);

  // Merge adjacent runs until one run remains
  while (runs.length > 1) {
    const mergedRuns: [number, number][] = [];

    for (let runIndex = 0; runIndex < runs.length; runIndex += 2) {
      if (runIndex + 1 < runs.length) {
        const leftRun = runs[runIndex]!;
        const rightRun = runs[runIndex + 1]!;

        mergeInPlace(leftRun[0], rightRun[0], rightRun[1]);

        mergedRuns.push([leftRun[0], rightRun[1]]);
      } else {
        mergedRuns.push(runs[runIndex]!);
      }
    }

    runs.length = 0;
    runs.push(...mergedRuns);
  }

  // Mark all elements as sorted
  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, {
      sortedIndex,
      sortedArray: [...workingArray],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
