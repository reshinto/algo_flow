/** Step generator for Quick Sort 3-Way — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const QUICK_SORT_3_WAY_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.QUICK_SORT_3_WAY!);

interface PartitionTask {
  low: number;
  high: number;
}

export function generateQuickSort3WaySteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], QUICK_SORT_3_WAY_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    if (arrayLength === 1) tracker.markSorted(0, { sortedPosition: 0 });
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  // Iterative 3-way quick sort using an explicit stack
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

    const pivotValue = workingArray[low]!;
    let lessThanPointer = low;
    let greaterThanPointer = high;
    let currentPointer = low;

    // Dutch National Flag partition
    while (currentPointer <= greaterThanPointer) {
      tracker.compare(currentPointer, low, {
        low,
        high,
        pivotValue,
        lessThanPointer,
        greaterThanPointer,
        currentPointer,
      });

      if (workingArray[currentPointer]! < pivotValue) {
        const temporaryLt = workingArray[lessThanPointer]!;
        workingArray[lessThanPointer] = workingArray[currentPointer]!;
        workingArray[currentPointer] = temporaryLt;

        tracker.swap(lessThanPointer, currentPointer, {
          low,
          high,
          pivotValue,
          lessThanPointer,
          currentPointer,
          sortedArray: [...workingArray],
        });

        lessThanPointer++;
        currentPointer++;
      } else if (workingArray[currentPointer]! > pivotValue) {
        const temporaryGt = workingArray[greaterThanPointer]!;
        workingArray[greaterThanPointer] = workingArray[currentPointer]!;
        workingArray[currentPointer] = temporaryGt;

        tracker.swap(currentPointer, greaterThanPointer, {
          low,
          high,
          pivotValue,
          currentPointer,
          greaterThanPointer,
          sortedArray: [...workingArray],
        });

        greaterThanPointer--;
      } else {
        currentPointer++;
      }
    }

    // Mark the equal-to-pivot region as sorted
    for (let equalIndex = lessThanPointer; equalIndex <= greaterThanPointer; equalIndex++) {
      tracker.markSorted(equalIndex, {
        pivotValue,
        lessThanPointer,
        greaterThanPointer,
        sortedPosition: equalIndex,
      });
    }

    // Push sub-problems; process smaller partition first for stack efficiency
    if (lessThanPointer - 1 > low) {
      taskStack.push({ low, high: lessThanPointer - 1 });
    } else if (low < lessThanPointer - 1 || low === lessThanPointer - 1) {
      if (low <= lessThanPointer - 1) {
        for (let markIdx = low; markIdx < lessThanPointer; markIdx++) {
          if (markIdx < lessThanPointer) tracker.markSorted(markIdx, { sortedPosition: markIdx });
        }
      }
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
