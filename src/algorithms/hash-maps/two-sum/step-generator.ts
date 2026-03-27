/** Step generator for Two Sum — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TWO_SUM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TWO_SUM!);

export interface TwoSumInput {
  numbers: number[];
  target: number;
}

export function generateTwoSumSteps(input: TwoSumInput): ExecutionStep[] {
  const { numbers, target } = input;
  const tracker = new HashMapTracker(numbers, TWO_SUM_LINE_MAP);
  const map = new Map<number, number>();

  tracker.initialize({ numbers, target });

  for (let idx = 0; idx < numbers.length; idx++) {
    const num = numbers[idx]!;
    const complement = target - num;

    tracker.processElement(idx, { idx, value: num, complement });
    tracker.lookupKey(String(complement), { complement, target, num });

    if (map.has(complement)) {
      const foundIdx = map.get(complement)!;
      tracker.keyFound(String(complement), foundIdx, idx, {
        foundIdx,
        currentIdx: idx,
        result: [foundIdx, idx],
      });
      tracker.complete({ result: [foundIdx, idx] });
      return tracker.getSteps();
    }

    tracker.keyNotFound(String(complement), { complement });
    map.set(num, idx);
    tracker.insertKey(String(num), String(idx), { key: num, value: idx });
  }

  tracker.complete({ result: null });
  return tracker.getSteps();
}
