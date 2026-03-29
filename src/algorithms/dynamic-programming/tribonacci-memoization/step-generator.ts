/** Step generator for Tribonacci (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TRIBONACCI_MEMO_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TRIBONACCI_MEMOIZATION!);

interface TribonacciInput {
  targetIndex: number;
}

export function generateTribonacciMemoizationSteps(input: TribonacciInput): ExecutionStep[] {
  const { targetIndex } = input;
  const tableSize = targetIndex + 1;
  const tracker = new DPTracker(tableSize, TRIBONACCI_MEMO_LINE_MAP, (index) => `T(${index})`);
  const memo = new Map<number, number>();

  tracker.initialize({ targetIndex });

  function computeMemo(index: number): number {
    if (index === 0) {
      if (!memo.has(0)) {
        memo.set(0, 0);
        tracker.fillTable(0, 0, {
          currentIndex: 0,
          description: "Base case: T(0) = 0",
        });
      }
      return 0;
    }

    if (index <= 2) {
      if (!memo.has(index)) {
        memo.set(index, 1);
        tracker.fillTable(index, 1, {
          currentIndex: index,
          description: `Base case: T(${index}) = 1`,
        });
      }
      return 1;
    }

    if (memo.has(index)) {
      tracker.readCache(index, { currentIndex: index, cachedValue: memo.get(index) });
      return memo.get(index)!;
    }

    tracker.pushCallStack(`T(${index})`, { currentIndex: index });
    const prevOne = computeMemo(index - 1);
    const prevTwo = computeMemo(index - 2);
    const prevThree = computeMemo(index - 3);
    const result = prevOne + prevTwo + prevThree;
    memo.set(index, result);

    tracker.computeCell(index, result, {
      currentIndex: index,
      formula: `T(${index}) = T(${index - 1}) + T(${index - 2}) + T(${index - 3})`,
      value: result,
    });
    tracker.popCallStack({ currentIndex: index, result });

    return result;
  }

  computeMemo(targetIndex);

  tracker.complete({
    result: memo.get(targetIndex) ?? 0,
    targetIndex,
  });

  return tracker.getSteps();
}
