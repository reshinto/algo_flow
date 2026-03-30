/** Step generator for Happy Number — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HAPPY_NUMBER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HAPPY_NUMBER!);

export interface HappyNumberInput {
  number: number;
}

function digitSquareSum(num: number): number {
  let total = 0;
  while (num > 0) {
    const digit = num % 10;
    total += digit * digit;
    num = Math.floor(num / 10);
  }
  return total;
}

export function generateHappyNumberSteps(input: HappyNumberInput): ExecutionStep[] {
  const { number: startNumber } = input;
  const tracker = new HashMapTracker([startNumber], HAPPY_NUMBER_LINE_MAP);

  tracker.initialize({ startNumber });
  tracker.setPhase("cycling");

  const seen = new Set<number>();
  let current = startNumber;
  let iterationCount = 0;

  while (current !== 1) {
    tracker.appendInputElement(current);
    tracker.processElement(iterationCount, { current, iterationCount });
    seen.add(current);
    tracker.insertKey(String(current), "seen", { value: current });

    const nextValue = digitSquareSum(current);
    current = nextValue;
    iterationCount++;

    tracker.checkDuplicate(String(current), { nextValue: current });
    if (seen.has(current)) {
      tracker.keyFound(String(current), iterationCount, iterationCount, {
        current,
        note: "cycle detected — not happy",
      });
      tracker.setResult(false);
      tracker.complete({ result: false });
      return tracker.getSteps();
    }
  }

  tracker.setResult(true);
  tracker.complete({ result: true });
  return tracker.getSteps();
}
