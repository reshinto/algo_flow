import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const INTERSECTION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INTERSECTION_OF_TWO_ARRAYS!);

export interface IntersectionOfTwoArraysInput {
  numbersA: number[];
  numbersB: number[];
}

export function generateIntersectionOfTwoArraysSteps(
  input: IntersectionOfTwoArraysInput,
): ExecutionStep[] {
  const { numbersA, numbersB } = input;
  const tracker = new HashMapTracker(numbersA.map(String), INTERSECTION_LINE_MAP, {
    secondaryInput: numbersB.map(String),
  });
  const setA = new Set<number>();
  const result: number[] = [];

  tracker.initialize({ numbersA, numbersB });
  tracker.setPhase("building");

  for (let elementIndex = 0; elementIndex < numbersA.length; elementIndex++) {
    const currentNum = numbersA[elementIndex]!;
    tracker.processElement(elementIndex, { elementIndex, currentNum });
    setA.add(currentNum);
    tracker.insertKey(String(currentNum), "present", { currentNum });
  }

  tracker.setPhase("checking");

  for (let elementIndex = 0; elementIndex < numbersB.length; elementIndex++) {
    const currentNum = numbersB[elementIndex]!;
    tracker.processSecondaryElement(elementIndex, { elementIndex, currentNum });
    tracker.lookupKey(String(currentNum), { currentNum, inSet: setA.has(currentNum) });

    if (setA.has(currentNum)) {
      result.push(currentNum);
      setA.delete(currentNum);
      tracker.markSecondaryMatched(elementIndex, { currentNum, result: [...result] });
      tracker.deleteKey(String(currentNum), { currentNum });
    } else {
      tracker.keyNotFound(String(currentNum), { currentNum });
    }
  }

  tracker.setResult(result);
  tracker.complete({ result });
  return tracker.getSteps();
}
