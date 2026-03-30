/** Step generator for Word Pattern — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const WORD_PATTERN_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.WORD_PATTERN!);

export interface WordPatternInput {
  pattern: string;
  sentence: string;
}

export function generateWordPatternSteps(input: WordPatternInput): ExecutionStep[] {
  const { pattern, sentence } = input;
  const patternChars = pattern.split("");
  const words = sentence.split(" ");
  const tracker = new HashMapTracker(patternChars, WORD_PATTERN_LINE_MAP, {
    secondaryInput: words,
  });
  const charToWord = new Map<string, string>();
  const wordToChar = new Map<string, string>();

  tracker.initialize({ pattern, sentence, wordCount: words.length });

  if (pattern.length !== words.length) {
    tracker.setResult(false);
    tracker.complete({ result: false });
    return tracker.getSteps();
  }

  for (let charIndex = 0; charIndex < patternChars.length; charIndex++) {
    const patternChar = patternChars[charIndex]!;
    const currentWord = words[charIndex]!;

    tracker.processElement(charIndex, { charIndex, patternChar, currentWord });
    tracker.processSecondaryElement(charIndex, { charIndex, currentWord, patternChar });

    const mappedWord = charToWord.get(patternChar);
    const mappedChar = wordToChar.get(currentWord);

    tracker.lookupKey(patternChar, { patternChar, mappedWord });

    if (mappedWord === undefined && mappedChar === undefined) {
      charToWord.set(patternChar, currentWord);
      wordToChar.set(currentWord, patternChar);
      tracker.insertKey(patternChar, currentWord, { patternChar, currentWord });
      tracker.markMatched(charIndex, { patternChar, currentWord });
      tracker.markSecondaryMatched(charIndex, { currentWord, patternChar });
    } else if (mappedWord === currentWord && mappedChar === patternChar) {
      tracker.keyFound(patternChar, 0, charIndex, { patternChar, currentWord, mappedWord });
      tracker.markMatched(charIndex, { patternChar, currentWord });
    } else {
      tracker.keyNotFound(patternChar, { patternChar, currentWord, mappedWord, mappedChar });
      tracker.markMismatched(charIndex, { patternChar, currentWord });
      tracker.setResult(false);
      tracker.complete({ result: false });
      return tracker.getSteps();
    }
  }

  tracker.setResult(true);
  tracker.complete({ result: true });
  return tracker.getSteps();
}
