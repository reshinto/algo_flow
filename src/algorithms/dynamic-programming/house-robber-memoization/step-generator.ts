/** Step generator for House Robber (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HOUSE_ROBBER_MEMO_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HOUSE_ROBBER_MEMOIZATION!);

interface HouseRobberInput {
  houses: number[];
}

export function generateHouseRobberMemoizationSteps(input: HouseRobberInput): ExecutionStep[] {
  const { houses } = input;
  const tableSize = Math.max(houses.length, 1);
  const tracker = new DPTracker(tableSize, HOUSE_ROBBER_MEMO_LINE_MAP, (index) => `H(${index})`);
  const memo = new Map<number, number>();

  tracker.initialize({ houses });

  if (houses.length === 0) {
    tracker.complete({ result: 0, houses });
    return tracker.getSteps();
  }

  if (houses.length === 1) {
    tracker.fillTable(0, houses[0]!, {
      houseIndex: 0,
      description: `Base case: H(0) = ${houses[0]!}`,
    });
    tracker.complete({ result: houses[0]!, houses });
    return tracker.getSteps();
  }

  function computeMemo(houseIndex: number): number {
    if (houseIndex === 0) {
      const baseValue = houses[0]!;
      if (!memo.has(0)) {
        memo.set(0, baseValue);
        tracker.fillTable(0, baseValue, {
          houseIndex: 0,
          description: `Base case: H(0) = ${baseValue}`,
        });
      }
      return baseValue;
    }

    if (houseIndex === 1) {
      const baseValue = Math.max(houses[0]!, houses[1]!);
      if (!memo.has(1)) {
        memo.set(1, baseValue);
        tracker.fillTable(1, baseValue, {
          houseIndex: 1,
          description: `Base case: H(1) = max(${houses[0]!}, ${houses[1]!}) = ${baseValue}`,
        });
      }
      return baseValue;
    }

    if (memo.has(houseIndex)) {
      tracker.readCache(houseIndex, {
        houseIndex,
        cachedValue: memo.get(houseIndex),
      });
      return memo.get(houseIndex)!;
    }

    tracker.pushCallStack(`H(${houseIndex})`, { houseIndex });

    const skipCurrent = computeMemo(houseIndex - 1);
    const robCurrent = computeMemo(houseIndex - 2) + houses[houseIndex]!;
    const maxProfit = Math.max(skipCurrent, robCurrent);

    memo.set(houseIndex, maxProfit);

    tracker.computeCell(houseIndex, maxProfit, {
      houseIndex,
      formula: `H(${houseIndex}) = max(H(${houseIndex - 1}), H(${houseIndex - 2}) + ${houses[houseIndex]!})`,
      skipCurrent,
      robCurrent,
      maxProfit,
    });

    tracker.popCallStack({ houseIndex, result: maxProfit });

    return maxProfit;
  }

  const result = computeMemo(houses.length - 1);

  tracker.complete({ result, houses });

  return tracker.getSteps();
}
