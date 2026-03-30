/** Step generator for Sort Characters by Frequency — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SORT_CHARACTERS_BY_FREQUENCY_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.SORT_CHARACTERS_BY_FREQUENCY!,
);

export interface SortCharactersByFrequencyInput {
  text: string;
}

export function generateSortCharactersByFrequencySteps(
  input: SortCharactersByFrequencyInput,
): ExecutionStep[] {
  const { text } = input;
  const chars = text.split("");
  const tracker = new HashMapTracker(chars, SORT_CHARACTERS_BY_FREQUENCY_LINE_MAP);
  const freqMap = new Map<string, number>();

  tracker.initialize({ text });
  tracker.setPhase("building");

  for (let charIndex = 0; charIndex < chars.length; charIndex++) {
    const currentChar = chars[charIndex]!;
    tracker.processElement(charIndex, { charIndex, currentChar });
    freqMap.set(currentChar, (freqMap.get(currentChar) ?? 0) + 1);
    tracker.incrementCount(currentChar, { currentChar, count: freqMap.get(currentChar) });
  }

  tracker.setPhase("sorting");

  // Bucket sort pass — highlight each entry in descending frequency order
  const buckets: string[][] = Array.from({ length: chars.length + 1 }, () => []);
  for (const [char, freq] of freqMap.entries()) {
    buckets[freq]!.push(char);
  }

  let result = "";
  for (let bucketIdx = buckets.length - 1; bucketIdx >= 0; bucketIdx--) {
    for (const char of buckets[bucketIdx]!) {
      tracker.highlightEntry(char, { char, freq: bucketIdx });
      result += char.repeat(bucketIdx);
    }
  }

  tracker.setResult(result);
  tracker.complete({ result });
  return tracker.getSteps();
}
