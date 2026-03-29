/** Step generator for Fibonacci (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FIBONACCI_MEMO_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIBONACCI_MEMOIZATION!);

interface FibonacciInput {
  targetIndex: number;
}

export function generateFibonacciMemoizationSteps(input: FibonacciInput): ExecutionStep[] {
  const { targetIndex } = input;
  const tableSize = targetIndex + 1;
  const tracker = new DPTracker(tableSize, FIBONACCI_MEMO_LINE_MAP);
  const memo = new Map<number, number>();

  tracker.initialize({ targetIndex });

  function computeMemo(index: number): number {
    if (index <= 1) {
      if (!memo.has(index)) {
        memo.set(index, index);
        tracker.fillTable(index, index, {
          currentIndex: index,
          description: `Base case: F(${index}) = ${index}`,
        });
      }
      return index;
    }

    if (memo.has(index)) {
      tracker.readCache(index, { currentIndex: index, cachedValue: memo.get(index) });
      return memo.get(index)!;
    }

    tracker.pushCallStack(`F(${index})`, { currentIndex: index });
    const prevOne = computeMemo(index - 1);
    const prevTwo = computeMemo(index - 2);
    const result = prevOne + prevTwo;
    memo.set(index, result);

    tracker.computeCell(index, result, {
      currentIndex: index,
      formula: `F(${index}) = F(${index - 1}) + F(${index - 2})`,
      value: result,
    });
    tracker.popCallStack({ currentIndex: index, result });

    return result;
  }

  computeMemo(targetIndex);

  tracker.complete({
    result: memo.get(targetIndex) ?? targetIndex,
    targetIndex,
  });

  return tracker.getSteps();
}
