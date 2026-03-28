/** Step generator for Lomuto Partition — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LOMUTO_PARTITION!);

interface LomutoPartitionInput {
  inputArray: number[];
}

export function generateLomutoPartitionSteps(input: LomutoPartitionInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  if (inputArray.length === 0) {
    tracker.initialize({ arrayLength: 0 });
    tracker.complete({ pivotIndex: -1, result: [] });
    return tracker.getSteps();
  }

  const workArray = [...inputArray];
  const pivotOriginalIndex = workArray.length - 1;
  const pivotValue = workArray[pivotOriginalIndex]!;
  let boundaryIndex = 0;

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    pivotValue,
    pivotOriginalIndex,
    boundaryIndex,
  });

  /* Highlight the pivot element before scanning begins */
  tracker.markElement(
    pivotOriginalIndex,
    "current",
    {
      pivotValue,
      pivotOriginalIndex,
      boundaryIndex,
    },
    `Pivot selected: value ${pivotValue} at index ${pivotOriginalIndex}`,
  );

  for (let scanIndex = 0; scanIndex < pivotOriginalIndex; scanIndex++) {
    const currentValue = workArray[scanIndex]!;
    const comparisonResult = currentValue <= pivotValue;

    tracker.compareTwo(
      scanIndex,
      pivotOriginalIndex,
      {
        scanIndex,
        currentValue,
        pivotValue,
        comparisonResult,
        boundaryIndex,
        decision: comparisonResult ? "swap" : "skip",
      },
      `Compare arr[${scanIndex}]=${currentValue} <= pivot ${pivotValue}: ${comparisonResult ? "yes, swap with boundary" : "no, skip"}`,
    );

    if (comparisonResult) {
      tracker.swap(
        boundaryIndex,
        scanIndex,
        {
          boundaryIndex,
          scanIndex,
          swappedValue: currentValue,
          pivotValue,
        },
        `Swap arr[${scanIndex}]=${currentValue} with boundary arr[${boundaryIndex}]=${workArray[boundaryIndex]!}`,
      );

      const tempValue = workArray[boundaryIndex]!;
      workArray[boundaryIndex] = workArray[scanIndex]!;
      workArray[scanIndex] = tempValue;
      boundaryIndex++;

      tracker.markElement(
        boundaryIndex - 1,
        "sorted",
        { boundaryIndex, scanIndex, region: "left-of-pivot" },
        `Element placed in left partition at index ${boundaryIndex - 1}`,
      );
    }
  }

  /* Place pivot into its final position */
  tracker.swap(
    boundaryIndex,
    pivotOriginalIndex,
    {
      boundaryIndex,
      pivotOriginalIndex,
      pivotValue,
    },
    `Place pivot ${pivotValue} into final position at index ${boundaryIndex}`,
  );

  const tempValue = workArray[boundaryIndex]!;
  workArray[boundaryIndex] = workArray[pivotOriginalIndex]!;
  workArray[pivotOriginalIndex] = tempValue;

  const finalPivotIndex = boundaryIndex;

  tracker.markElement(
    finalPivotIndex,
    "found",
    { finalPivotIndex, pivotValue },
    `Pivot ${pivotValue} is now in its sorted position at index ${finalPivotIndex}`,
  );

  /* Mark elements to the right of pivot as being on the correct side */
  for (let rightIndex = finalPivotIndex + 1; rightIndex < workArray.length; rightIndex++) {
    tracker.markElement(
      rightIndex,
      "sorted",
      { rightIndex, region: "right-of-pivot" },
      `Element ${workArray[rightIndex]!} confirmed in right partition`,
    );
  }

  tracker.complete({
    pivotIndex: finalPivotIndex,
    result: [...workArray],
  });

  return tracker.getSteps();
}
