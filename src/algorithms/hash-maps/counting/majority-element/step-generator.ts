/** Step generator for Majority Element — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MAJORITY_ELEMENT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MAJORITY_ELEMENT!);

export interface MajorityElementInput {
  numbers: number[];
}

export function generateMajorityElementSteps(input: MajorityElementInput): ExecutionStep[] {
  const { numbers } = input;
  const numberStrings = numbers.map(String);
  const tracker = new HashMapTracker(numberStrings, MAJORITY_ELEMENT_LINE_MAP);
  const frequencyMap = new Map<number, number>();
  const threshold = Math.floor(numbers.length / 2);

  tracker.initialize({ numbers, threshold });
  tracker.setPhase("building");

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    tracker.processElement(elementIndex, { elementIndex, currentNum, threshold });
    const updatedCount = (frequencyMap.get(currentNum) ?? 0) + 1;
    frequencyMap.set(currentNum, updatedCount);
    tracker.incrementCount(String(currentNum), {
      elementIndex,
      currentNum,
      count: updatedCount,
      threshold,
    });

    if (updatedCount > threshold) {
      tracker.keyFound(String(currentNum), elementIndex, elementIndex, {
        elementIndex,
        currentNum,
        result: currentNum,
      });
      tracker.setResult(currentNum);
      tracker.complete({ result: currentNum });
      return tracker.getSteps();
    }
  }

  tracker.setResult(-1);
  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
