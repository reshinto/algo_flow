/** Step generator for Reverse Words in a String — produces ExecutionStep[] using TransformTracker. */

import type { ExecutionStep } from "@/types";
import { TransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const REVERSE_WORDS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REVERSE_WORDS!);

export interface ReverseWordsInput {
  text: string;
}

export function generateReverseWordsSteps(input: ReverseWordsInput): ExecutionStep[] {
  const { text } = input;

  // Build the normalized word list the same way the source function does
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? [] : trimmed.split(/\s+/);

  // The tracker works on the full original input string character-by-character for visualization
  const tracker = new TransformTracker(text, REVERSE_WORDS_LINE_MAP);

  tracker.initialize({ text, wordCount: words.length });

  // Phase 1 — splitting: read each word boundary in the input string
  tracker.setPhase("splitting", { text, wordCount: words.length });

  let charIndex = 0;
  for (const word of words) {
    const wordStart = text.indexOf(word, charIndex);
    tracker.readChar(wordStart, { word, wordStart });
    charIndex = wordStart + word.length;
  }

  // Phase 2 — reversing: swap words from the outer ends inward
  tracker.setPhase("reversing", { wordCount: words.length });

  let leftIndex = 0;
  let rightIndex = words.length - 1;

  while (leftIndex < rightIndex) {
    const leftWord = words[leftIndex] ?? "";
    const rightWord = words[rightIndex] ?? "";

    // Swap in our local array
    words[leftIndex] = rightWord;
    words[rightIndex] = leftWord;

    // Append the swapped word to the output buffer to show progress
    tracker.appendOutput(rightWord + " ", {
      leftIndex,
      rightIndex,
      swapped: `${leftWord} ↔ ${rightWord}`,
    });
    tracker.appendOutput(leftWord + " ", { leftIndex, rightIndex });

    leftIndex++;
    rightIndex--;
    tracker.advancePointers(leftIndex, rightIndex, { leftIndex, rightIndex });
  }

  // If an odd number of words, emit the middle word
  if (leftIndex === rightIndex) {
    const middleWord = words[leftIndex] ?? "";
    tracker.appendOutput(middleWord, { middleWord });
  }

  const result = words.join(" ");
  tracker.complete({ result });
  return tracker.getSteps();
}
