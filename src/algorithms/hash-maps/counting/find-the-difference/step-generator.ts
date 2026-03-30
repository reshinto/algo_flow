import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FIND_THE_DIFFERENCE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIND_THE_DIFFERENCE!);

export interface FindTheDifferenceInput {
  original: string;
  modified: string;
}

export function generateFindTheDifferenceSteps(input: FindTheDifferenceInput): ExecutionStep[] {
  const { original, modified } = input;
  const originalChars = original.split("");
  const modifiedChars = modified.split("");
  const tracker = new HashMapTracker(originalChars, FIND_THE_DIFFERENCE_LINE_MAP, {
    secondaryInput: modifiedChars,
  });
  const charCounts = new Map<string, number>();

  tracker.initialize({ original, modified });
  tracker.setPhase("building");

  for (let charIndex = 0; charIndex < original.length; charIndex++) {
    const currentChar = original[charIndex]!;
    tracker.processElement(charIndex, { charIndex, currentChar });
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
    tracker.incrementCount(currentChar, {
      charIndex,
      currentChar,
      count: charCounts.get(currentChar),
    });
  }

  tracker.setPhase("checking");

  for (let charIndex = 0; charIndex < modified.length; charIndex++) {
    const currentChar = modified[charIndex]!;
    tracker.processSecondaryElement(charIndex, { charIndex, currentChar });
    const count = (charCounts.get(currentChar) ?? 0) - 1;
    charCounts.set(currentChar, count);
    tracker.decrementCount(currentChar, { charIndex, currentChar, count });

    if (count < 0) {
      tracker.setResult(currentChar);
      tracker.complete({ result: currentChar });
      return tracker.getSteps();
    }
  }

  tracker.setResult("");
  tracker.complete({ result: "" });
  return tracker.getSteps();
}
