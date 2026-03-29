/** Step generator for Catalan Numbers (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CATALAN_NUMBERS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CATALAN_NUMBERS!);

interface CatalanInput {
  targetIndex: number;
}

export function generateCatalanNumbersSteps(input: CatalanInput): ExecutionStep[] {
  const { targetIndex } = input;
  const tableSize = targetIndex + 1;
  const tracker = new DPTracker(tableSize, CATALAN_NUMBERS_LINE_MAP, (index) => `Cat(${index})`);

  tracker.initialize({ targetIndex, tableSize });

  tracker.fillTable(0, 1, { currentIndex: 0, value: 1, description: "Base case: C(0) = 1" });

  for (let outerIndex = 1; outerIndex <= targetIndex; outerIndex++) {
    let runningSum = 0;

    for (let splitIndex = 0; splitIndex < outerIndex; splitIndex++) {
      const complementIndex = outerIndex - 1 - splitIndex;
      tracker.readCache(splitIndex, { outerIndex, readingIndex: splitIndex });
      tracker.readCache(complementIndex, { outerIndex, readingIndex: complementIndex });
      runningSum += catalanNumber(splitIndex) * catalanNumber(complementIndex);

      tracker.computeCell(outerIndex, runningSum, {
        outerIndex,
        splitIndex,
        complementIndex,
        formula: `C(${outerIndex}) += C(${splitIndex}) * C(${complementIndex})`,
        value: runningSum,
      });
    }
  }

  const finalResult = catalanNumber(targetIndex);
  tracker.complete({ result: finalResult, targetIndex });

  return tracker.getSteps();
}

function catalanNumber(targetIndex: number): number {
  if (targetIndex === 0) return 1;
  const dpTable = new Array<number>(targetIndex + 1).fill(0);
  dpTable[0] = 1;
  for (let outerIndex = 1; outerIndex <= targetIndex; outerIndex++) {
    let runningSum = 0;
    for (let splitIndex = 0; splitIndex < outerIndex; splitIndex++) {
      runningSum += (dpTable[splitIndex] ?? 0) * (dpTable[outerIndex - 1 - splitIndex] ?? 0);
    }
    dpTable[outerIndex] = runningSum;
  }
  return dpTable[targetIndex] ?? 1;
}
