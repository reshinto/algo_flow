/** Step generator for Min Cost Climbing Stairs (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MIN_COST_STAIRS_MEMO_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.MIN_COST_CLIMBING_STAIRS_MEMOIZATION!,
);

export interface MinCostStairsInput {
  costs: number[];
}

export function generateMinCostClimbingStairsMemoizationSteps(
  input: MinCostStairsInput,
): ExecutionStep[] {
  const { costs } = input;
  const tableSize = costs.length + 1;
  const tracker = new DPTracker(tableSize, MIN_COST_STAIRS_MEMO_LINE_MAP, (index) => `C(${index})`);
  const memo = new Map<number, number>();

  tracker.initialize({ costs });

  function computeMemo(step: number): number {
    if (step <= 1) {
      if (!memo.has(step)) {
        memo.set(step, 0);
        tracker.fillTable(step, 0, {
          currentStep: step,
          description: `Base case: C(${step}) = 0`,
        });
      }
      return 0;
    }

    if (memo.has(step)) {
      tracker.readCache(step, { currentStep: step, cachedValue: memo.get(step) });
      return memo.get(step)!;
    }

    tracker.pushCallStack(`C(${step})`, { currentStep: step });
    const costFromOne = computeMemo(step - 1) + (costs[step - 1] ?? 0);
    const costFromTwo = computeMemo(step - 2) + (costs[step - 2] ?? 0);
    const result = Math.min(costFromOne, costFromTwo);
    memo.set(step, result);

    tracker.computeCell(step, result, {
      currentStep: step,
      formula: `C(${step}) = min(C(${step - 1}) + cost[${step - 1}], C(${step - 2}) + cost[${step - 2}])`,
      value: result,
    });
    tracker.popCallStack({ currentStep: step, result });

    return result;
  }

  computeMemo(costs.length);

  tracker.complete({
    result: memo.get(costs.length) ?? 0,
    costs,
  });

  return tracker.getSteps();
}
