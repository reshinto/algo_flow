/** Step generator for Integer Break (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const INTEGER_BREAK_TAB_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INTEGER_BREAK_TABULATION!);

interface IntegerBreakInput {
  targetNumber: number;
}

export function generateIntegerBreakTabulationSteps(input: IntegerBreakInput): ExecutionStep[] {
  const { targetNumber } = input;
  const tableSize = targetNumber + 1;
  const tracker = new DPTracker(tableSize, INTEGER_BREAK_TAB_LINE_MAP, (index) => `P(${index})`);

  tracker.initialize({ targetNumber, tableSize });

  tracker.fillTable(1, 1, {
    splitIndex: 1,
    value: 1,
    description: "Base case: P(1) = 1",
  });

  // Build a local DP array to compute values for descriptions
  const dpValues: number[] = new Array(targetNumber + 1).fill(0);
  dpValues[1] = 1;

  for (let splitIndex = 2; splitIndex <= targetNumber; splitIndex++) {
    for (let partIndex = 1; partIndex < splitIndex; partIndex++) {
      const remainder = splitIndex - partIndex;

      tracker.readCache(remainder, {
        splitIndex,
        partIndex,
        readingIndex: remainder,
      });

      const keepSplit = partIndex * remainder;
      const useDp = partIndex * (dpValues[remainder] ?? 0);
      const candidateMax = Math.max(keepSplit, useDp);
      const currentBest = dpValues[splitIndex] ?? 0;

      if (candidateMax > currentBest) {
        dpValues[splitIndex] = candidateMax;
      }

      tracker.computeCell(
        splitIndex,
        dpValues[splitIndex]!,
        {
          splitIndex,
          partIndex,
          keepSplit,
          useDp,
          formula: `P(${splitIndex}) = max(P(${splitIndex}), ${partIndex}×${remainder}, ${partIndex}×P(${remainder}))`,
          value: dpValues[splitIndex]!,
        },
        `Try split ${partIndex}+${remainder}: keep=${keepSplit}, use dp=${useDp} → P(${splitIndex})=${dpValues[splitIndex]!}`,
      );
    }
  }

  const finalResult = dpValues[targetNumber] ?? 0;
  tracker.complete({ result: finalResult, targetNumber });

  return tracker.getSteps();
}
