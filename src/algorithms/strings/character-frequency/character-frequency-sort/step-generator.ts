/** Step generator for Character Frequency Sort — produces ExecutionStep[] using FrequencyTracker. */

import type { ExecutionStep } from "@/types";
import { FrequencyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CHARACTER_FREQUENCY_SORT_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.CHARACTER_FREQUENCY_SORT!,
);

export interface CharacterFrequencySortInput {
  text: string;
}

export function generateCharacterFrequencySortSteps(
  input: CharacterFrequencySortInput,
): ExecutionStep[] {
  const { text } = input;
  const tracker = new FrequencyTracker(text, "", CHARACTER_FREQUENCY_SORT_LINE_MAP);

  // Initialize — capture starting state
  tracker.initialize({ text, length: text.length });

  if (text.length === 0) {
    tracker.complete({ result: "", outputLength: 0 });
    return tracker.getSteps();
  }

  // Phase 1: Build frequency map — count each character
  const localFrequencyMap = new Map<string, number>();
  for (let charIdx = 0; charIdx < text.length; charIdx++) {
    const char = text[charIdx]!;
    localFrequencyMap.set(char, (localFrequencyMap.get(char) ?? 0) + 1);
    tracker.addToFrequency(char, { charIdx, char, phase: "count" });
  }

  // Phase 2: Sort by frequency using bucket sort
  const maxFrequency = text.length;
  const buckets = new Map<number, string[]>();
  for (const [char, freq] of localFrequencyMap) {
    const bucket = buckets.get(freq) ?? [];
    bucket.push(char);
    buckets.set(freq, bucket);
  }

  // Emit a sort step to signal frequency ordering is complete
  tracker.checkAnagram(true, {
    phase: "sort",
    uniqueChars: localFrequencyMap.size,
    maxFrequency,
  });

  // Phase 3: Build output — emit addToResult for each char group, high freq first
  let outputLength = 0;
  for (let freqIdx = maxFrequency; freqIdx >= 1; freqIdx--) {
    const charsAtFreq = buckets.get(freqIdx);
    if (!charsAtFreq) continue;
    for (const char of charsAtFreq) {
      outputLength += freqIdx;
      tracker.addToResult(outputLength - 1, {
        phase: "build",
        char,
        frequency: freqIdx,
        charsAdded: freqIdx,
        outputSoFar: outputLength,
      });
    }
  }

  tracker.complete({ result: "sorted by frequency", outputLength });
  return tracker.getSteps();
}
