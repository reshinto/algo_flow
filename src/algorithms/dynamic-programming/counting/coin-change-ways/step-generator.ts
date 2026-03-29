/** Step generator for Coin Change Ways (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const COIN_CHANGE_WAYS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COIN_CHANGE_WAYS!);

export interface CoinChangeWaysInput {
  amount: number;
  coins: number[];
}

export function generateCoinChangeWaysSteps(input: CoinChangeWaysInput): ExecutionStep[] {
  const { amount, coins } = input;
  const tableSize = amount + 1;
  const tracker = new DPTracker(tableSize, COIN_CHANGE_WAYS_LINE_MAP, (index) => `W(${index})`);

  tracker.initialize({ amount, coins, tableSize });

  // Base case: one way to make amount 0 (pick nothing)
  tracker.fillTable(0, 1, {
    currentAmount: 0,
    value: 1,
    description: "Base case: W(0) = 1 (one way to make 0 — pick nothing)",
  });

  // Build the dp table with coin-outer, amount-inner ordering
  const dpTable = new Array<number>(tableSize).fill(0);
  dpTable[0] = 1;

  for (const coin of coins) {
    for (let currentAmount = coin; currentAmount <= amount; currentAmount++) {
      const previousWays = dpTable[currentAmount - coin]!;
      const currentWays = dpTable[currentAmount]!;

      tracker.readCache(currentAmount - coin, {
        coin,
        currentAmount,
        readingIndex: currentAmount - coin,
        previousWays,
      });

      const updatedWays = currentWays + previousWays;
      dpTable[currentAmount] = updatedWays;

      tracker.computeCell(
        currentAmount,
        updatedWays,
        {
          coin,
          currentAmount,
          previousWays,
          updatedWays,
          formula: `W(${currentAmount}) = W(${currentAmount}) + W(${currentAmount - coin}) = ${currentWays} + ${previousWays}`,
        },
        `W(${currentAmount}) = ${currentWays} + ${previousWays} = ${updatedWays} (using coin ${coin})`,
      );
    }
  }

  const finalResult = dpTable[amount]!;
  tracker.complete({ result: finalResult, amount, coins });

  return tracker.getSteps();
}
