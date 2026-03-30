/** Step generator for First Unique Character — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FIRST_UNIQUE_CHARACTER_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.FIRST_UNIQUE_CHARACTER!,
);

export interface FirstUniqueCharacterInput {
  text: string;
}

export function generateFirstUniqueCharacterSteps(
  input: FirstUniqueCharacterInput,
): ExecutionStep[] {
  const { text } = input;
  const textChars = text.split("");
  const tracker = new HashMapTracker(textChars, FIRST_UNIQUE_CHARACTER_LINE_MAP);
  const charCounts = new Map<string, number>();

  tracker.initialize({ text, charCounts: {} });
  tracker.setPhase("building");

  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    const currentChar = text[charIndex]!;
    tracker.processElement(charIndex, { charIndex, currentChar });
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
    tracker.incrementCount(currentChar, {
      charIndex,
      currentChar,
      count: charCounts.get(currentChar),
    });
  }

  tracker.setPhase("checking");

  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    const currentChar = text[charIndex]!;
    const count = charCounts.get(currentChar) ?? 0;
    tracker.processElement(charIndex, { charIndex, currentChar, count });
    tracker.lookupKey(currentChar, { charIndex, currentChar, count });

    if (count === 1) {
      tracker.keyFound(currentChar, charIndex, charIndex, {
        charIndex,
        currentChar,
        result: charIndex,
      });
      tracker.setResult(charIndex);
      tracker.complete({ result: charIndex });
      return tracker.getSteps();
    }
  }

  tracker.setResult(-1);
  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
