/** Step generator for Integer Break (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const INTEGER_BREAK_MEMO_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.INTEGER_BREAK_MEMOIZATION!,
);

interface IntegerBreakInput {
  targetNumber: number;
}

export function generateIntegerBreakMemoizationSteps(input: IntegerBreakInput): ExecutionStep[] {
  const { targetNumber } = input;
  const tableSize = Math.max(targetNumber + 1, 2);
  const tracker = new DPTracker(tableSize, INTEGER_BREAK_MEMO_LINE_MAP, (index) => `P(${index})`);
  const memo = new Map<number, number>();

  tracker.initialize({ targetNumber });

  function computeMemo(currentNumber: number): number {
    if (currentNumber === 1) {
      if (!memo.has(1)) {
        memo.set(1, 1);
        tracker.fillTable(1, 1, {
          currentNumber: 1,
          description: "Base case: P(1) = 1",
        });
      }
      return 1;
    }

    if (memo.has(currentNumber)) {
      tracker.readCache(currentNumber, {
        currentNumber,
        cachedValue: memo.get(currentNumber),
      });
      return memo.get(currentNumber)!;
    }

    tracker.pushCallStack(`P(${currentNumber})`, { currentNumber });

    let bestProduct = 0;
    for (let partSize = 1; partSize < currentNumber; partSize++) {
      const remainder = currentNumber - partSize;
      const splitProduct = partSize * remainder;
      const recurseProduct = partSize * computeMemo(remainder);
      bestProduct = Math.max(bestProduct, splitProduct, recurseProduct);
    }

    memo.set(currentNumber, bestProduct);

    tracker.computeCell(currentNumber, bestProduct, {
      currentNumber,
      formula: `P(${currentNumber}) = max over j of max(j*(${currentNumber}-j), j*P(${currentNumber}-j))`,
      bestProduct,
    });

    tracker.popCallStack({ currentNumber, result: bestProduct });

    return bestProduct;
  }

  computeMemo(targetNumber);

  tracker.complete({ result: memo.get(targetNumber) ?? 0, targetNumber });

  return tracker.getSteps();
}
