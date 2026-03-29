/** Step generator for Rod Cutting (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ROD_CUTTING_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ROD_CUTTING!);

export interface RodCuttingInput {
  prices: number[];
}

export function generateRodCuttingSteps(input: RodCuttingInput): ExecutionStep[] {
  const { prices } = input;
  const rodLength = prices.length;
  const tableSize = rodLength + 1;
  const tracker = new DPTracker(tableSize, ROD_CUTTING_LINE_MAP, (index) => `R(${index})`);

  tracker.initialize({ prices, rodLength, tableSize });

  // Internal dp array to track real values for read-cache lookups
  const dpTable: number[] = new Array(tableSize).fill(0);

  tracker.fillTable(0, 0, {
    currentLength: 0,
    value: 0,
    description: "Base case: dp[0] = 0 (zero revenue for a zero-length rod)",
  });

  for (let currentLength = 1; currentLength <= rodLength; currentLength++) {
    let bestRevenue = 0;

    for (let cutLength = 1; cutLength <= currentLength; cutLength++) {
      const remainder = currentLength - cutLength;
      const cutPrice = prices[cutLength - 1] ?? 0;
      const remainderValue = dpTable[remainder] ?? 0;

      tracker.readCache(remainder, {
        currentLength,
        cutLength,
        remainder,
        cutPrice,
        remainderValue,
        description: `Check dp[${currentLength} - ${cutLength}] = dp[${remainder}] = ${remainderValue}`,
      });

      const candidate = cutPrice + remainderValue;
      if (candidate > bestRevenue) {
        bestRevenue = candidate;
      }
    }

    dpTable[currentLength] = bestRevenue;

    tracker.computeCell(
      currentLength,
      bestRevenue,
      {
        currentLength,
        prices,
        value: bestRevenue,
        formula: `dp[${currentLength}] = ${bestRevenue}`,
      },
      `dp[${currentLength}] = ${bestRevenue} — max revenue for rod of length ${currentLength}`,
    );
  }

  const finalResult = dpTable[rodLength] ?? 0;
  tracker.complete({ result: finalResult, rodLength, prices });

  return tracker.getSteps();
}
