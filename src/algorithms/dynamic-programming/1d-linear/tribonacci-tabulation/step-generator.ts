/** Step generator for Tribonacci (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TRIBONACCI_TAB_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TRIBONACCI_TABULATION!);

interface TribonacciInput {
  targetIndex: number;
}

export function generateTribonacciTabulationSteps(input: TribonacciInput): ExecutionStep[] {
  const { targetIndex } = input;
  const tableSize = targetIndex + 1;
  const tracker = new DPTracker(tableSize, TRIBONACCI_TAB_LINE_MAP, (index) => `T(${index})`);

  tracker.initialize({ targetIndex, tableSize });

  tracker.fillTable(0, 0, { currentIndex: 0, value: 0, description: "Base case: T(0) = 0" });
  if (targetIndex >= 1) {
    tracker.fillTable(1, 1, { currentIndex: 1, value: 1, description: "Base case: T(1) = 1" });
  }
  if (targetIndex >= 2) {
    tracker.fillTable(2, 1, { currentIndex: 2, value: 1, description: "Base case: T(2) = 1" });
  }

  for (let currentIndex = 3; currentIndex <= targetIndex; currentIndex++) {
    const prevOne = currentIndex - 1;
    const prevTwo = currentIndex - 2;
    const prevThree = currentIndex - 3;

    tracker.readCache(prevOne, { currentIndex, readingIndex: prevOne });
    tracker.readCache(prevTwo, { currentIndex, readingIndex: prevTwo });
    tracker.readCache(prevThree, { currentIndex, readingIndex: prevThree });

    const computedValue = computeTribonacci(currentIndex);
    tracker.computeCell(currentIndex, computedValue, {
      currentIndex,
      formula: `T(${currentIndex}) = T(${prevOne}) + T(${prevTwo}) + T(${prevThree})`,
      value: computedValue,
    });
  }

  const finalResult = computeTribonacci(targetIndex);
  tracker.complete({ result: finalResult, targetIndex });

  return tracker.getSteps();
}

function computeTribonacci(targetIndex: number): number {
  if (targetIndex === 0) return 0;
  if (targetIndex <= 2) return 1;
  const dpTable = new Array(targetIndex + 1).fill(0);
  dpTable[1] = 1;
  dpTable[2] = 1;
  for (let currentIndex = 3; currentIndex <= targetIndex; currentIndex++) {
    dpTable[currentIndex] =
      (dpTable[currentIndex - 1] ?? 0) +
      (dpTable[currentIndex - 2] ?? 0) +
      (dpTable[currentIndex - 3] ?? 0);
  }
  return dpTable[targetIndex] ?? 0;
}
