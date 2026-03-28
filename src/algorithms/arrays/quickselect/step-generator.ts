/** Step generator for Quickselect — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.QUICKSELECT!);

interface QuickselectInput {
  inputArray: number[];
  targetK: number;
}

export function generateQuickselectSteps(input: QuickselectInput): ExecutionStep[] {
  const { inputArray, targetK } = input;
  const arrayLength = inputArray.length;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  if (arrayLength === 0 || targetK < 1 || targetK > arrayLength) {
    tracker.initialize({ arrayLength, targetK });
    tracker.complete({ kthElement: -1, pivotIndex: -1 });
    return tracker.getSteps();
  }

  const workArray = [...inputArray];
  const targetIndex = targetK - 1;

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    targetK,
    targetIndex,
  });

  function lomutoPartition(rangeStart: number, rangeEnd: number): number {
    const pivotValue = workArray[rangeEnd]!;

    tracker.markElement(
      rangeEnd,
      "current",
      { pivotValue, rangeStart, rangeEnd },
      `Pivot selected: value ${pivotValue} at index ${rangeEnd}`,
    );

    let boundaryIndex = rangeStart;

    for (let scanIndex = rangeStart; scanIndex < rangeEnd; scanIndex++) {
      const currentValue = workArray[scanIndex]!;

      tracker.compareTwo(
        scanIndex,
        rangeEnd,
        {
          scanIndex,
          currentValue,
          pivotValue,
          boundaryIndex,
          decision: currentValue <= pivotValue ? "swap" : "skip",
        },
        `Compare ${currentValue} <= pivot ${pivotValue}: ${currentValue <= pivotValue ? "swap" : "skip"}`,
      );

      if (currentValue <= pivotValue) {
        tracker.swap(
          boundaryIndex,
          scanIndex,
          { boundaryIndex, scanIndex, pivotValue },
          `Swap index ${scanIndex} with boundary ${boundaryIndex}`,
        );

        const tempValue = workArray[boundaryIndex]!;
        workArray[boundaryIndex] = workArray[scanIndex]!;
        workArray[scanIndex] = tempValue;
        boundaryIndex++;
      }
    }

    // Place pivot in final position
    tracker.swap(
      boundaryIndex,
      rangeEnd,
      { boundaryIndex, rangeEnd, pivotValue },
      `Place pivot ${pivotValue} at final position ${boundaryIndex}`,
    );

    const tempValue = workArray[boundaryIndex]!;
    workArray[boundaryIndex] = workArray[rangeEnd]!;
    workArray[rangeEnd] = tempValue;

    tracker.markElement(
      boundaryIndex,
      "found",
      { finalPivotIndex: boundaryIndex, pivotValue },
      `Pivot ${pivotValue} is now at index ${boundaryIndex}`,
    );

    return boundaryIndex;
  }

  function selectKth(rangeStart: number, rangeEnd: number): void {
    if (rangeStart >= rangeEnd) {
      tracker.visit(
        rangeStart,
        { rangeStart, rangeEnd, value: workArray[rangeStart] },
        `Single element range — value is ${workArray[rangeStart]}`,
      );
      return;
    }

    const pivotFinalIndex = lomutoPartition(rangeStart, rangeEnd);

    if (pivotFinalIndex === targetIndex) {
      tracker.markElement(
        pivotFinalIndex,
        "sorted",
        { pivotFinalIndex, kthElement: workArray[pivotFinalIndex], targetK },
        `Found! ${targetK}-th smallest = ${workArray[pivotFinalIndex]} at index ${pivotFinalIndex}`,
      );
    } else if (targetIndex < pivotFinalIndex) {
      tracker.visit(
        pivotFinalIndex,
        { decision: "search-left", rangeStart, pivotFinalIndex, targetIndex },
        `Target ${targetIndex} < pivot ${pivotFinalIndex}, recurse left`,
      );
      selectKth(rangeStart, pivotFinalIndex - 1);
    } else {
      tracker.visit(
        pivotFinalIndex,
        { decision: "search-right", pivotFinalIndex, rangeEnd, targetIndex },
        `Target ${targetIndex} > pivot ${pivotFinalIndex}, recurse right`,
      );
      selectKth(pivotFinalIndex + 1, rangeEnd);
    }
  }

  selectKth(0, arrayLength - 1);

  const kthElement = workArray[targetIndex]!;
  const pivotIndex = workArray.indexOf(kthElement);

  tracker.complete({ kthElement, pivotIndex });

  return tracker.getSteps();
}
