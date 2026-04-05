/** Step generator for Longest Common Prefix — produces ExecutionStep[] using TransformTracker. */

import type { ExecutionStep } from "@/types";
import { TransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LONGEST_COMMON_PREFIX_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LONGEST_COMMON_PREFIX!);

export interface LongestCommonPrefixInput {
  words: string[];
}

export function generateLongestCommonPrefixSteps(input: LongestCommonPrefixInput): ExecutionStep[] {
  const { words } = input;

  // Join words with separator for display as a single TransformTracker string
  const displayInput = words.join(" | ");
  const tracker = new TransformTracker(displayInput, LONGEST_COMMON_PREFIX_LINE_MAP);

  tracker.initialize({ words, wordCount: words.length });

  if (words.length === 0) {
    tracker.complete({ result: "" });
    return tracker.getSteps();
  }

  const firstWord = words[0] ?? "";
  let prefixLength = 0;

  for (let columnIndex = 0; columnIndex < firstWord.length; columnIndex++) {
    const currentChar = firstWord[columnIndex] ?? "";

    // Read the character from the first word at current column
    tracker.readChar(columnIndex, {
      columnIndex,
      currentChar,
      prefixSoFar: firstWord.slice(0, prefixLength),
    });

    let mismatchFound = false;

    for (let wordIndex = 1; wordIndex < words.length; wordIndex++) {
      const word = words[wordIndex] ?? "";
      const wordChar = word[columnIndex];

      // Read corresponding character from each subsequent word
      // Map position in display string: each word starts at its offset past separators
      const wordOffset = words.slice(0, wordIndex).join(" | ").length + 3; // " | " separator = 3 chars
      const charPosition = wordOffset + columnIndex;

      tracker.readChar(charPosition, {
        columnIndex,
        wordIndex,
        currentChar,
        wordChar: wordChar ?? "(end)",
        match: wordChar === currentChar,
      });

      if (wordChar !== currentChar) {
        mismatchFound = true;
        break;
      }
    }

    if (mismatchFound) {
      tracker.complete({ result: firstWord.slice(0, prefixLength) });
      return tracker.getSteps();
    }

    // All words matched this column — extend the prefix
    prefixLength++;
    tracker.writeChar(currentChar, {
      columnIndex,
      prefixLength,
      prefixSoFar: firstWord.slice(0, prefixLength),
    });
  }

  tracker.complete({ result: firstWord.slice(0, prefixLength) });
  return tracker.getSteps();
}
