/** Step generator for Find All Anagrams — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FIND_ALL_ANAGRAMS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIND_ALL_ANAGRAMS!);

export interface FindAllAnagramsInput {
  text: string;
  pattern: string;
}

export function generateFindAllAnagramsSteps(input: FindAllAnagramsInput): ExecutionStep[] {
  const { text, pattern } = input;
  const textChars = text.split("");
  const patternChars = pattern.split("");
  const tracker = new HashMapTracker(textChars, FIND_ALL_ANAGRAMS_LINE_MAP, {
    secondaryInput: patternChars,
  });
  const patternFreq = new Map<string, number>();
  const windowFreq = new Map<string, number>();
  const windowSize = pattern.length;
  const result: number[] = [];

  tracker.initialize({ text, pattern, windowSize });
  tracker.setPhase("building");

  // Phase 1: build pattern frequency map from secondary input
  for (let patternIdx = 0; patternIdx < patternChars.length; patternIdx++) {
    const patternChar = patternChars[patternIdx]!;
    tracker.processSecondaryElement(patternIdx, { patternIdx, patternChar });
    patternFreq.set(patternChar, (patternFreq.get(patternChar) ?? 0) + 1);
    tracker.incrementCount(patternChar, { patternChar, count: patternFreq.get(patternChar) });
  }

  tracker.setPhase("scanning");

  // Phase 2: slide window over text
  for (let rightIdx = 0; rightIdx < textChars.length; rightIdx++) {
    const incomingChar = textChars[rightIdx]!;
    tracker.processElement(rightIdx, { rightIdx, incomingChar });

    // Expand: add incoming character
    windowFreq.set(incomingChar, (windowFreq.get(incomingChar) ?? 0) + 1);
    tracker.insertKey(incomingChar, String(windowFreq.get(incomingChar)), {
      incomingChar,
      windowCount: windowFreq.get(incomingChar),
    });

    tracker.setWindowBounds(Math.max(0, rightIdx - windowSize + 1), rightIdx);

    // Shrink: remove outgoing character once full window is established
    if (rightIdx >= windowSize) {
      const outgoingChar = textChars[rightIdx - windowSize]!;
      const outgoingCount = (windowFreq.get(outgoingChar) ?? 0) - 1;
      if (outgoingCount === 0) {
        windowFreq.delete(outgoingChar);
      } else {
        windowFreq.set(outgoingChar, outgoingCount);
      }
      tracker.decrementCount(outgoingChar, { outgoingChar, windowCount: outgoingCount });
    }

    // Check anagram match
    if (rightIdx >= windowSize - 1) {
      const startIdx = rightIdx - windowSize + 1;
      const isMatch = mapsEqual(windowFreq, patternFreq);
      if (isMatch) {
        result.push(startIdx);
        tracker.keyFound(incomingChar, startIdx, rightIdx, { startIdx, result: [...result] });
      } else {
        tracker.keyNotFound(incomingChar, { startIdx, noMatch: true });
      }
    }
  }

  tracker.setResult(result);
  tracker.complete({ result });
  return tracker.getSteps();
}

function mapsEqual(mapA: Map<string, number>, mapB: Map<string, number>): boolean {
  if (mapA.size !== mapB.size) return false;
  for (const [key, value] of mapA.entries()) {
    if (mapB.get(key) !== value) return false;
  }
  return true;
}
