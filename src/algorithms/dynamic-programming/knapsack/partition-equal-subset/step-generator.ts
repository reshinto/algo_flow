/** Step generator for Partition Equal Subset Sum (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PARTITION_EQUAL_SUBSET_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.PARTITION_EQUAL_SUBSET!,
);

export interface PartitionSubsetInput {
  numbers: number[];
}

export function generatePartitionEqualSubsetSteps(input: PartitionSubsetInput): ExecutionStep[] {
  const { numbers } = input;
  const totalSum = numbers.reduce((accumulator, value) => accumulator + value, 0);

  if (totalSum % 2 !== 0) {
    // Odd total sum — return minimal steps showing the early-exit
    const tracker = new DPTracker(1, PARTITION_EQUAL_SUBSET_LINE_MAP, (index) => `$${index}`);
    tracker.initialize({ numbers, totalSum, target: null, canPartition: false });
    tracker.complete({
      result: false,
      numbers,
      totalSum,
      reason: "odd total sum — cannot partition",
    });
    return tracker.getSteps();
  }

  const target = totalSum / 2;
  const tableSize = target + 1;
  const tracker = new DPTracker(tableSize, PARTITION_EQUAL_SUBSET_LINE_MAP, (index) => `$${index}`);

  tracker.initialize({ numbers, totalSum, target, tableSize });

  // Internal dp array tracking real values for read-cache lookups
  const dpTable: number[] = new Array(tableSize).fill(0);
  dpTable[0] = 1;

  tracker.fillTable(0, 1, {
    sumIndex: 0,
    value: 1,
    description: "Base case: dp[0] = 1 (empty subset achieves sum 0)",
  });

  for (const currentNumber of numbers) {
    for (let sumIndex = target; sumIndex >= currentNumber; sumIndex--) {
      const previousIndex = sumIndex - currentNumber;
      const previousValue = dpTable[previousIndex] ?? 0;

      tracker.readCache(previousIndex, {
        currentNumber,
        sumIndex,
        previousIndex,
        previousValue,
        description: `Check dp[${sumIndex} - ${currentNumber}] = dp[${previousIndex}] = ${previousValue}`,
      });

      if (previousValue === 1) {
        dpTable[sumIndex] = 1;
        tracker.computeCell(
          sumIndex,
          1,
          {
            currentNumber,
            sumIndex,
            previousIndex,
            formula: `dp[${sumIndex}] = 1 (sum ${sumIndex} is achievable)`,
          },
          `dp[${sumIndex}] = 1 — sum ${sumIndex} is achievable`,
        );
      }
    }
  }

  const finalValue = dpTable[target] ?? 0;
  const canPartition = finalValue === 1;
  tracker.complete({ result: canPartition, numbers, target, totalSum });

  return tracker.getSteps();
}
