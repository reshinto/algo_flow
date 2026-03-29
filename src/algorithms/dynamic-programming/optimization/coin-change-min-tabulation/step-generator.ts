/** Step generator for Coin Change — Minimum (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const COIN_CHANGE_MIN_TAB_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.COIN_CHANGE_MIN_TABULATION!,
);

export interface CoinChangeInput {
  amount: number;
  coins: number[];
}

export function generateCoinChangeMinTabulationSteps(input: CoinChangeInput): ExecutionStep[] {
  const { amount, coins } = input;
  const tableSize = amount + 1;
  const tracker = new DPTracker(tableSize, COIN_CHANGE_MIN_TAB_LINE_MAP, (index) => `$${index}`);

  tracker.initialize({ amount, coins, tableSize });

  // Internal dp array to track real values for read-cache lookups
  const dpTable: number[] = new Array(tableSize).fill(Infinity);
  dpTable[0] = 0;

  tracker.fillTable(0, 0, {
    currentAmount: 0,
    value: 0,
    description: "Base case: dp[0] = 0 (zero coins needed for amount 0)",
  });

  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
    let bestCoins = Infinity;

    for (const coin of coins) {
      if (currentAmount >= coin) {
        const previousAmount = currentAmount - coin;
        const previousValue = dpTable[previousAmount] ?? Infinity;

        tracker.readCache(previousAmount, {
          currentAmount,
          coin,
          previousAmount,
          previousValue,
          description: `Check dp[${currentAmount} - ${coin}] = dp[${previousAmount}] = ${previousValue === Infinity ? "∞" : previousValue}`,
        });

        const candidate = previousValue === Infinity ? Infinity : previousValue + 1;
        if (candidate < bestCoins) {
          bestCoins = candidate;
        }
      }
    }

    const cellValue = bestCoins === Infinity ? Infinity : bestCoins;
    dpTable[currentAmount] = cellValue;

    tracker.computeCell(
      currentAmount,
      cellValue === Infinity ? -1 : cellValue,
      {
        currentAmount,
        coins,
        value: cellValue === Infinity ? "∞" : cellValue,
        formula:
          cellValue === Infinity
            ? `dp[${currentAmount}] = ∞ (impossible)`
            : `dp[${currentAmount}] = ${cellValue}`,
      },
      cellValue === Infinity
        ? `dp[${currentAmount}] = ∞ — impossible to make amount ${currentAmount}`
        : `dp[${currentAmount}] = ${cellValue} — minimum coins for amount ${currentAmount}`,
    );
  }

  const finalDpValue = dpTable[amount] ?? Infinity;
  const finalResult = finalDpValue === Infinity ? -1 : finalDpValue;
  tracker.complete({ result: finalResult, amount, coins });

  return tracker.getSteps();
}
