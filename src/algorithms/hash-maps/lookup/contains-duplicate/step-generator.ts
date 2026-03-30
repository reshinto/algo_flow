/** Step generator for Contains Duplicate — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CONTAINS_DUPLICATE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CONTAINS_DUPLICATE!);

export interface ContainsDuplicateInput {
  numbers: number[];
}

export function generateContainsDuplicateSteps(input: ContainsDuplicateInput): ExecutionStep[] {
  const { numbers } = input;
  const tracker = new HashMapTracker(numbers, CONTAINS_DUPLICATE_LINE_MAP);
  const seen = new Set<number>();

  tracker.initialize({ numbers });

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const current = numbers[elementIndex]!;

    tracker.processElement(elementIndex, { elementIndex, current });
    tracker.checkDuplicate(String(current), { current });

    if (seen.has(current)) {
      tracker.keyFound(String(current), elementIndex, elementIndex, {
        current,
        elementIndex,
        result: true,
      });
      tracker.setResult(true);
      tracker.complete({ result: true });
      return tracker.getSteps();
    }

    seen.add(current);
    tracker.insertKey(String(current), String(elementIndex), { key: current, elementIndex });
  }

  tracker.setResult(false);
  tracker.complete({ result: false });
  return tracker.getSteps();
}
