/** Step generator for Valid Anagram — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const VALID_ANAGRAM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.VALID_ANAGRAM!);

export interface ValidAnagramInput {
  textA: string;
  textB: string;
}

export function generateValidAnagramSteps(input: ValidAnagramInput): ExecutionStep[] {
  const { textA, textB } = input;
  const textAChars = textA.split("");
  const textBChars = textB.split("");
  const tracker = new HashMapTracker(textAChars, VALID_ANAGRAM_LINE_MAP, {
    secondaryInput: textBChars,
  });
  const charCounts = new Map<string, number>();

  tracker.initialize({ textA, textB, sameLength: textA.length === textB.length });
  tracker.setPhase("building");

  if (textA.length !== textB.length) {
    tracker.setResult(false);
    tracker.complete({ result: false });
    return tracker.getSteps();
  }

  for (let charIndex = 0; charIndex < textA.length; charIndex++) {
    const currentChar = textA[charIndex]!;
    tracker.processElement(charIndex, { charIndex, currentChar });
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
    tracker.incrementCount(currentChar, {
      charIndex,
      currentChar,
      count: charCounts.get(currentChar),
    });
  }

  tracker.setPhase("checking");

  for (let charIndex = 0; charIndex < textB.length; charIndex++) {
    const currentChar = textB[charIndex]!;
    tracker.processSecondaryElement(charIndex, { charIndex, currentChar });
    const updatedCount = (charCounts.get(currentChar) ?? 0) - 1;
    charCounts.set(currentChar, updatedCount);
    tracker.decrementCount(currentChar, {
      charIndex,
      currentChar,
      count: updatedCount,
    });

    if (updatedCount < 0) {
      tracker.setResult(false);
      tracker.complete({ result: false });
      return tracker.getSteps();
    }
  }

  tracker.setResult(true);
  tracker.complete({ result: true });
  return tracker.getSteps();
}
