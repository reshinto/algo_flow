/** Step generator for Coin Change — Minimum (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const COIN_CHANGE_MIN_MEMO_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.COIN_CHANGE_MIN_MEMOIZATION!,
);

interface CoinChangeInput {
  amount: number;
  coins: number[];
}

export function generateCoinChangeMinMemoizationSteps(input: CoinChangeInput): ExecutionStep[] {
  const { amount, coins } = input;
  const tableSize = amount + 1;
  const tracker = new DPTracker(tableSize, COIN_CHANGE_MIN_MEMO_LINE_MAP, (index) => `$${index}`);
  const memo = new Map<number, number>();

  tracker.initialize({ amount, coins });

  if (amount === 0) {
    tracker.complete({ result: 0, amount, coins });
    return tracker.getSteps();
  }

  function computeMemo(remaining: number): number {
    if (remaining === 0) {
      if (!memo.has(0)) {
        memo.set(0, 0);
        tracker.fillTable(0, 0, {
          remaining: 0,
          description: "Base case: $0 requires 0 coins",
        });
      }
      return 0;
    }

    if (remaining < 0) {
      return -1;
    }

    if (memo.has(remaining)) {
      tracker.readCache(remaining, {
        remaining,
        cachedValue: memo.get(remaining),
      });
      return memo.get(remaining)!;
    }

    tracker.pushCallStack(`$${remaining}`, { remaining });

    let bestResult = -1;

    for (const coin of coins) {
      const subResult = computeMemo(remaining - coin);
      if (subResult >= 0) {
        const candidate = subResult + 1;
        if (bestResult === -1 || candidate < bestResult) {
          bestResult = candidate;
        }
      }
    }

    memo.set(remaining, bestResult);

    tracker.computeCell(
      remaining,
      bestResult,
      {
        remaining,
        coins,
        bestResult,
        formula:
          bestResult === -1
            ? `$${remaining} = impossible`
            : `$${remaining} = min over coins + 1 = ${bestResult}`,
      },
      bestResult === -1
        ? `$${remaining} is impossible with available coins`
        : `$${remaining} = ${bestResult} coin(s)`,
    );

    tracker.popCallStack({ remaining, result: bestResult });

    return bestResult;
  }

  const result = computeMemo(amount);

  tracker.complete({ result, amount, coins });

  return tracker.getSteps();
}
