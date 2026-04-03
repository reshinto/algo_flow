/** Step generator for Quick Sort (Lomuto) — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const QUICK_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.QUICK_SORT!);

export function generateQuickSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], QUICK_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  function partition(lowIndex: number, highIndex: number): number {
    const pivotValue = workingArray[highIndex]!;
    let partitionIndex = lowIndex - 1;

    for (let scanIndex = lowIndex; scanIndex < highIndex; scanIndex++) {
      tracker.compare(scanIndex, highIndex, {
        lowIndex,
        highIndex,
        scanIndex,
        partitionIndex,
        pivotValue,
      });

      if (workingArray[scanIndex]! <= pivotValue) {
        partitionIndex++;
        const temporaryValue = workingArray[partitionIndex]!;
        workingArray[partitionIndex] = workingArray[scanIndex]!;
        workingArray[scanIndex] = temporaryValue;

        if (partitionIndex !== scanIndex) {
          tracker.swap(partitionIndex, scanIndex, {
            lowIndex,
            highIndex,
            partitionIndex,
            scanIndex,
            sortedArray: [...workingArray],
          });
        }
      }
    }

    // Place pivot in its final position
    const pivotFinalIndex = partitionIndex + 1;
    const temporaryValue = workingArray[pivotFinalIndex]!;
    workingArray[pivotFinalIndex] = workingArray[highIndex]!;
    workingArray[highIndex] = temporaryValue;
    tracker.setElementValue(pivotFinalIndex, workingArray[pivotFinalIndex]!);
    tracker.setElementValue(highIndex, workingArray[highIndex]!);

    tracker.markSorted(pivotFinalIndex, {
      pivotFinalIndex,
      pivotValue,
      sortedArray: [...workingArray],
    });

    return pivotFinalIndex;
  }

  function quickSortRecursive(lowIndex: number, highIndex: number): void {
    if (lowIndex >= highIndex) {
      if (lowIndex === highIndex) {
        tracker.markSorted(lowIndex, { sortedPosition: lowIndex });
      }
      return;
    }

    const pivotFinalIndex = partition(lowIndex, highIndex);
    quickSortRecursive(lowIndex, pivotFinalIndex - 1);
    quickSortRecursive(pivotFinalIndex + 1, highIndex);
  }

  if (arrayLength > 0) {
    quickSortRecursive(0, arrayLength - 1);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
