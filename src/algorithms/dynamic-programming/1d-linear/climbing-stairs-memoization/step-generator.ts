/** Step generator for Climbing Stairs (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CLIMBING_STAIRS_MEMO_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.CLIMBING_STAIRS_MEMOIZATION!,
);

export interface ClimbingStairsInput {
  numberOfStairs: number;
}

export function generateClimbingStairsMemoizationSteps(
  input: ClimbingStairsInput,
): ExecutionStep[] {
  const { numberOfStairs } = input;
  const tableSize = numberOfStairs + 1;
  const tracker = new DPTracker(tableSize, CLIMBING_STAIRS_MEMO_LINE_MAP, (index) => `S(${index})`);
  const memo = new Map<number, number>();

  tracker.initialize({ numberOfStairs });

  function computeMemo(step: number): number {
    if (step <= 1) {
      if (!memo.has(step)) {
        memo.set(step, 1);
        tracker.fillTable(step, 1, {
          currentStep: step,
          description: `Base case: S(${step}) = 1`,
        });
      }
      return 1;
    }

    if (memo.has(step)) {
      tracker.readCache(step, { currentStep: step, cachedValue: memo.get(step) });
      return memo.get(step)!;
    }

    tracker.pushCallStack(`S(${step})`, { currentStep: step });
    const waysFromPrev = computeMemo(step - 1);
    const waysFromTwoPrev = computeMemo(step - 2);
    const totalWays = waysFromPrev + waysFromTwoPrev;
    memo.set(step, totalWays);

    tracker.computeCell(step, totalWays, {
      currentStep: step,
      formula: `S(${step}) = S(${step - 1}) + S(${step - 2})`,
      value: totalWays,
    });
    tracker.popCallStack({ currentStep: step, result: totalWays });

    return totalWays;
  }

  computeMemo(numberOfStairs);

  tracker.complete({ result: memo.get(numberOfStairs) ?? 1, numberOfStairs });

  return tracker.getSteps();
}
