/** Step generator for Subarray Sum Equals K — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SUBARRAY_SUM_EQUALS_K_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUBARRAY_SUM_EQUALS_K!);

export interface SubarraySumEqualsKInput {
  numbers: number[];
  target: number;
}

export function generateSubarraySumEqualsKSteps(input: SubarraySumEqualsKInput): ExecutionStep[] {
  const { numbers, target } = input;
  const tracker = new HashMapTracker(numbers, SUBARRAY_SUM_EQUALS_K_LINE_MAP);
  const prefixCounts = new Map<number, number>();
  prefixCounts.set(0, 1);
  let currentSum = 0;
  let totalCount = 0;

  tracker.initialize({ numbers, target, prefixCounts: { "0": 1 } });

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    currentSum += numbers[elementIndex]!;
    const needed = currentSum - target;

    tracker.processElement(elementIndex, {
      elementIndex,
      value: numbers[elementIndex],
      currentSum,
    });
    tracker.setPrefixSum(currentSum);
    tracker.checkPrefix(String(needed), { currentSum, needed, target });

    if (prefixCounts.has(needed)) {
      const foundCount = prefixCounts.get(needed)!;
      totalCount += foundCount;
      tracker.prefixFound(String(needed), { needed, foundCount, totalCount });
    }

    const existingCount = prefixCounts.get(currentSum) ?? 0;
    prefixCounts.set(currentSum, existingCount + 1);
    tracker.incrementCount(String(currentSum), { currentSum, newCount: existingCount + 1 });
    tracker.setResult(totalCount);
  }

  tracker.complete({ totalCount });
  return tracker.getSteps();
}
