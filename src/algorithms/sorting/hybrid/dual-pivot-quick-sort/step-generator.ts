/** Step generator for Dual-Pivot Quick Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DUAL_PIVOT_QUICK_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DUAL_PIVOT_QUICK_SORT!);

interface PartitionTask {
  low: number;
  high: number;
}

export function generateDualPivotQuickSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], DUAL_PIVOT_QUICK_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    if (arrayLength === 1) tracker.markSorted(0, { sortedPosition: 0 });
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  // Iterative dual-pivot quick sort using an explicit stack
  const taskStack: PartitionTask[] = [{ low: 0, high: arrayLength - 1 }];

  while (taskStack.length > 0) {
    const task = taskStack.pop()!;
    const { low, high } = task;

    if (low >= high) {
      if (low === high) {
        tracker.markSorted(low, { sortedPosition: low });
      }
      continue;
    }

    // Ensure pivot1 <= pivot2
    if (workingArray[low]! > workingArray[high]!) {
      const temporaryPivot = workingArray[low]!;
      workingArray[low] = workingArray[high]!;
      workingArray[high] = temporaryPivot;

      tracker.swap(low, high, {
        low,
        high,
        phase: "pivot-normalize",
        sortedArray: [...workingArray],
      });
    }

    const pivot1 = workingArray[low]!;
    const pivot2 = workingArray[high]!;
    let lessThanPointer = low + 1;
    let greaterThanPointer = high - 1;
    let currentPointer = low + 1;

    while (currentPointer <= greaterThanPointer) {
      tracker.compare(currentPointer, low, {
        low,
        high,
        pivot1,
        pivot2,
        lessThanPointer,
        greaterThanPointer,
        currentPointer,
      });

      if (workingArray[currentPointer]! < pivot1) {
        const temporaryLt = workingArray[lessThanPointer]!;
        workingArray[lessThanPointer] = workingArray[currentPointer]!;
        workingArray[currentPointer] = temporaryLt;

        tracker.swap(lessThanPointer, currentPointer, {
          low,
          high,
          pivot1,
          pivot2,
          lessThanPointer,
          currentPointer,
          sortedArray: [...workingArray],
        });

        lessThanPointer++;
        currentPointer++;
      } else if (workingArray[currentPointer]! > pivot2) {
        while (greaterThanPointer > currentPointer && workingArray[greaterThanPointer]! > pivot2) {
          tracker.compare(greaterThanPointer, high, {
            low,
            high,
            pivot1,
            pivot2,
            greaterThanPointer,
            currentPointer,
          });
          greaterThanPointer--;
        }

        if (greaterThanPointer > currentPointer) {
          const temporaryGt = workingArray[greaterThanPointer]!;
          workingArray[greaterThanPointer] = workingArray[currentPointer]!;
          workingArray[currentPointer] = temporaryGt;

          tracker.swap(currentPointer, greaterThanPointer, {
            low,
            high,
            pivot1,
            pivot2,
            currentPointer,
            greaterThanPointer,
            sortedArray: [...workingArray],
          });

          greaterThanPointer--;
        } else {
          greaterThanPointer--;
          currentPointer++;
        }
      } else {
        currentPointer++;
      }
    }

    // Place pivots in final positions
    lessThanPointer--;
    greaterThanPointer++;

    const temporaryP1 = workingArray[low]!;
    workingArray[low] = workingArray[lessThanPointer]!;
    workingArray[lessThanPointer] = temporaryP1;

    tracker.swap(low, lessThanPointer, {
      low,
      high,
      pivot1,
      pivot2,
      placingPivot: 1,
      sortedArray: [...workingArray],
    });

    const temporaryP2 = workingArray[high]!;
    workingArray[high] = workingArray[greaterThanPointer]!;
    workingArray[greaterThanPointer] = temporaryP2;

    tracker.swap(high, greaterThanPointer, {
      low,
      high,
      pivot1,
      pivot2,
      placingPivot: 2,
      sortedArray: [...workingArray],
    });

    // Mark both pivots as sorted
    tracker.markSorted(lessThanPointer, {
      sortedPosition: lessThanPointer,
      pivot: pivot1,
    });
    tracker.markSorted(greaterThanPointer, {
      sortedPosition: greaterThanPointer,
      pivot: pivot2,
    });

    // Push three sub-problems
    if (low < lessThanPointer - 1) {
      taskStack.push({ low, high: lessThanPointer - 1 });
    } else if (low <= lessThanPointer - 1) {
      tracker.markSorted(low, { sortedPosition: low });
    }

    if (lessThanPointer + 1 < greaterThanPointer - 1) {
      taskStack.push({ low: lessThanPointer + 1, high: greaterThanPointer - 1 });
    } else if (lessThanPointer + 1 === greaterThanPointer - 1) {
      tracker.markSorted(lessThanPointer + 1, { sortedPosition: lessThanPointer + 1 });
    }

    if (greaterThanPointer + 1 < high) {
      taskStack.push({ low: greaterThanPointer + 1, high });
    } else if (greaterThanPointer + 1 <= high) {
      for (let markIdx = greaterThanPointer + 1; markIdx <= high; markIdx++) {
        tracker.markSorted(markIdx, { sortedPosition: markIdx });
      }
    }
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
