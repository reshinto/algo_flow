/** Step generator for Max Subarray Kadane (DP) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MAX_SUBARRAY_KADANE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MAX_SUBARRAY_KADANE!);

interface MaxSubarrayInput {
  array: number[];
}

export function generateMaxSubarrayKadaneSteps(input: MaxSubarrayInput): ExecutionStep[] {
  const { array } = input;
  const tableSize = array.length === 0 ? 1 : array.length;
  const tracker = new DPTracker(tableSize, MAX_SUBARRAY_KADANE_LINE_MAP, (index) => `M(${index})`);

  if (array.length === 0) {
    tracker.initialize({ arrayLength: 0 });
    tracker.complete({ maxSum: 0 });
    return tracker.getSteps();
  }

  const firstValue = array[0]!;

  tracker.initialize({ array: [...array], arrayLength: array.length });

  tracker.fillTable(0, firstValue, {
    elementIndex: 0,
    value: firstValue,
    description: `Base case: M(0) = array[0] = ${firstValue}`,
  });

  let maxSum = firstValue;

  for (let elementIndex = 1; elementIndex < array.length; elementIndex++) {
    const currentElement = array[elementIndex]!;
    const dpPrev = computeDpAt(array, elementIndex - 1);
    const extendValue = dpPrev + currentElement;
    const computedValue = Math.max(currentElement, extendValue);

    tracker.readCache(elementIndex - 1, {
      elementIndex,
      readingIndex: elementIndex - 1,
      dpPrev,
    });

    tracker.computeCell(
      elementIndex,
      computedValue,
      {
        elementIndex,
        currentElement,
        dpPrev,
        extendValue,
        decision: computedValue === currentElement ? "restart" : "extend",
        formula: `M(${elementIndex}) = max(${currentElement}, ${dpPrev} + ${currentElement}) = ${computedValue}`,
        value: computedValue,
      },
      `M(${elementIndex}) = max(${currentElement}, ${dpPrev} + ${currentElement}) = ${computedValue}`,
    );

    if (computedValue > maxSum) {
      maxSum = computedValue;
    }
  }

  tracker.complete({ maxSum });

  return tracker.getSteps();
}

/** Compute dp[targetIndex] = max subarray sum ending at targetIndex. */
function computeDpAt(array: number[], targetIndex: number): number {
  let dpValue = array[0]!;
  for (let idx = 1; idx <= targetIndex; idx++) {
    const element = array[idx]!;
    dpValue = Math.max(element, dpValue + element);
  }
  return dpValue;
}
