/** Step generator for Ransom Note — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RANSOM_NOTE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RANSOM_NOTE!);

export interface RansomNoteInput {
  ransomNote: string;
  magazine: string;
}

export function generateRansomNoteSteps(input: RansomNoteInput): ExecutionStep[] {
  const { ransomNote: ransomNoteText, magazine } = input;
  const magazineChars = magazine.split("");
  const ransomChars = ransomNoteText.split("");
  const tracker = new HashMapTracker(magazineChars, RANSOM_NOTE_LINE_MAP, {
    secondaryInput: ransomChars,
  });
  const charCounts = new Map<string, number>();

  tracker.initialize({ ransomNote: ransomNoteText, magazine });
  tracker.setPhase("building");

  for (let charIndex = 0; charIndex < magazine.length; charIndex++) {
    const currentChar = magazine[charIndex]!;
    tracker.processElement(charIndex, { charIndex, currentChar });
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
    tracker.incrementCount(currentChar, {
      charIndex,
      currentChar,
      count: charCounts.get(currentChar),
    });
  }

  tracker.setPhase("checking");

  for (let charIndex = 0; charIndex < ransomNoteText.length; charIndex++) {
    const currentChar = ransomNoteText[charIndex]!;
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
