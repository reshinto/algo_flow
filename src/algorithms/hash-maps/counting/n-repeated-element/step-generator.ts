import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const N_REPEATED_ELEMENT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.N_REPEATED_ELEMENT!);

export interface NRepeatedElementInput {
  numbers: number[];
}

export function generateNRepeatedElementSteps(input: NRepeatedElementInput): ExecutionStep[] {
  const { numbers } = input;
  const tracker = new HashMapTracker(numbers.map(String), N_REPEATED_ELEMENT_LINE_MAP);
  const frequencyMap = new Map<number, number>();
  const targetCount = numbers.length / 2;

  tracker.initialize({ numbers, targetCount });

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    tracker.processElement(elementIndex, { elementIndex, currentNum, targetCount });
    const updatedCount = (frequencyMap.get(currentNum) ?? 0) + 1;
    frequencyMap.set(currentNum, updatedCount);
    tracker.incrementCount(String(currentNum), { elementIndex, currentNum, count: updatedCount });

    if (updatedCount === targetCount) {
      tracker.keyFound(String(currentNum), elementIndex, elementIndex, { result: currentNum });
      tracker.setResult(currentNum);
      tracker.complete({ result: currentNum });
      return tracker.getSteps();
    }
  }

  tracker.setResult(-1);
  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
