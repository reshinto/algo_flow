/** Step generator for Fibonacci (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FIBONACCI_TAB_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIBONACCI_TABULATION!);

interface FibonacciInput {
  targetIndex: number;
}

export function generateFibonacciTabulationSteps(input: FibonacciInput): ExecutionStep[] {
  const { targetIndex } = input;
  const tableSize = targetIndex + 1;
  const tracker = new DPTracker(tableSize, FIBONACCI_TAB_LINE_MAP);

  tracker.initialize({ targetIndex, tableSize });

  tracker.fillTable(0, 0, { currentIndex: 0, value: 0, description: "Base case: F(0) = 0" });
  if (targetIndex >= 1) {
    tracker.fillTable(1, 1, { currentIndex: 1, value: 1, description: "Base case: F(1) = 1" });
  }

  for (let currentIndex = 2; currentIndex <= targetIndex; currentIndex++) {
    const prevOne = currentIndex - 1;
    const prevTwo = currentIndex - 2;

    tracker.readCache(prevOne, { currentIndex, readingIndex: prevOne });
    tracker.readCache(prevTwo, { currentIndex, readingIndex: prevTwo });

    const computedValue = computeFib(currentIndex);
    tracker.computeCell(currentIndex, computedValue, {
      currentIndex,
      formula: `F(${currentIndex}) = F(${prevOne}) + F(${prevTwo})`,
      value: computedValue,
    });
  }

  const finalResult = computeFib(targetIndex);
  tracker.complete({ result: finalResult, targetIndex });

  return tracker.getSteps();
}

function computeFib(targetIndex: number): number {
  if (targetIndex <= 1) return targetIndex;
  const dpTable = new Array(targetIndex + 1).fill(0);
  dpTable[1] = 1;
  for (let currentIndex = 2; currentIndex <= targetIndex; currentIndex++) {
    dpTable[currentIndex] = dpTable[currentIndex - 1]! + dpTable[currentIndex - 2]!;
  }
  return dpTable[targetIndex]!;
}
