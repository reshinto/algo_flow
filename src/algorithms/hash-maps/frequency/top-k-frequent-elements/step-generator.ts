/** Step generator for Top K Frequent Elements — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TOP_K_FREQUENT_ELEMENTS_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.TOP_K_FREQUENT_ELEMENTS!,
);

export interface TopKFrequentElementsInput {
  numbers: number[];
  topK: number;
}

export function generateTopKFrequentElementsSteps(
  input: TopKFrequentElementsInput,
): ExecutionStep[] {
  const { numbers, topK } = input;
  const tracker = new HashMapTracker(numbers, TOP_K_FREQUENT_ELEMENTS_LINE_MAP);
  const freqMap = new Map<number, number>();

  tracker.initialize({ numbers, topK });
  tracker.setPhase("building");

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const current = numbers[elementIndex]!;
    tracker.processElement(elementIndex, { elementIndex, current });
    freqMap.set(current, (freqMap.get(current) ?? 0) + 1);
    tracker.incrementCount(String(current), { current, count: freqMap.get(current) });
  }

  tracker.setPhase("extracting");

  // Bucket sort pass — highlight each entry as we collect top K
  const buckets: number[][] = Array.from({ length: numbers.length + 1 }, () => []);
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq]!.push(num);
  }

  const result: number[] = [];
  for (let bucketIdx = buckets.length - 1; bucketIdx >= 0 && result.length < topK; bucketIdx--) {
    for (const num of buckets[bucketIdx]!) {
      tracker.highlightEntry(String(num), { num, freq: bucketIdx, collected: result.length + 1 });
      result.push(num);
      if (result.length === topK) break;
    }
  }

  tracker.setResult(result);
  tracker.complete({ result });
  return tracker.getSteps();
}
