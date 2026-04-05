/** Step generator for First Non-Repeating Character — produces ExecutionStep[] using FrequencyTracker. */

import type { ExecutionStep } from "@/types";
import { FrequencyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FIRST_NON_REPEATING_CHARACTER_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.FIRST_NON_REPEATING_CHARACTER!,
);

export interface FirstNonRepeatingCharacterInput {
  text: string;
}

export function generateFirstNonRepeatingCharacterSteps(
  input: FirstNonRepeatingCharacterInput,
): ExecutionStep[] {
  const { text } = input;
  const tracker = new FrequencyTracker(text, "", FIRST_NON_REPEATING_CHARACTER_LINE_MAP);

  // Initialize — capture starting state
  tracker.initialize({ text, result: -1 });

  // Track local counts to detect first non-repeating character in phase 2
  const localFrequencyMap = new Map<string, number>();

  // Phase 1: Build frequency map — count occurrences of each character
  for (let charIdx = 0; charIdx < text.length; charIdx++) {
    const char = text[charIdx]!;
    localFrequencyMap.set(char, (localFrequencyMap.get(char) ?? 0) + 1);
    tracker.addToFrequency(char, { charIdx, char, phase: "build" });
  }

  // Phase 2: Scan for first character with frequency count of exactly 1
  let resultIndex = -1;
  for (let charIdx = 0; charIdx < text.length; charIdx++) {
    const char = text[charIdx]!;
    const charCount = localFrequencyMap.get(char) ?? 0;
    tracker.checkAnagram(charCount === 1, { charIdx, char, count: charCount, phase: "scan" });

    if (charCount === 1 && resultIndex === -1) {
      resultIndex = charIdx;
      tracker.markNonRepeating(charIdx, { charIdx, char, result: charIdx });
      break;
    }
  }

  tracker.complete({ result: resultIndex });
  return tracker.getSteps();
}
