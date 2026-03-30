import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MISSING_NUMBER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MISSING_NUMBER!);

export interface MissingNumberInput {
  numbers: number[];
}

export function generateMissingNumberSteps(input: MissingNumberInput): ExecutionStep[] {
  const { numbers } = input;
  const tracker = new HashMapTracker(numbers.map(String), MISSING_NUMBER_LINE_MAP);
  const numberSet = new Set<number>();

  tracker.initialize({ numbers });
  tracker.setPhase("building");

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    tracker.processElement(elementIndex, { elementIndex, currentNum });
    numberSet.add(currentNum);
    tracker.insertKey(String(currentNum), "present", { currentNum });
  }

  tracker.setPhase("checking");

  for (let checkValue = 0; checkValue <= numbers.length; checkValue++) {
    tracker.lookupKey(String(checkValue), { checkValue, found: numberSet.has(checkValue) });
    if (!numberSet.has(checkValue)) {
      tracker.keyNotFound(String(checkValue), { checkValue, missing: true });
      tracker.setResult(checkValue);
      tracker.complete({ result: checkValue });
      return tracker.getSteps();
    }
  }

  tracker.setResult(-1);
  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
