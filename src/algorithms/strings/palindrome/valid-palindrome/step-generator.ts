/** Step generator for Valid Palindrome — produces ExecutionStep[] using PalindromeTracker. */

import type { ExecutionStep } from "@/types";
import { PalindromeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const VALID_PALINDROME_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.VALID_PALINDROME!);

export interface ValidPalindromeInput {
  text: string;
}

function isAlphanumeric(char: string): boolean {
  return /[a-zA-Z0-9]/.test(char);
}

export function generateValidPalindromeSteps(input: ValidPalindromeInput): ExecutionStep[] {
  const { text } = input;
  const tracker = new PalindromeTracker(text, VALID_PALINDROME_LINE_MAP);

  tracker.initialize({ text, leftIndex: 0, rightIndex: text.length - 1 });

  let leftIndex = 0;
  let rightIndex = text.length - 1;

  tracker.setPointers(leftIndex, rightIndex, { leftIndex, rightIndex });

  while (leftIndex < rightIndex) {
    // Skip non-alphanumeric from the left
    while (leftIndex < rightIndex && !isAlphanumeric(text[leftIndex] ?? "")) {
      tracker.skipNonAlphanumeric(leftIndex, "left", {
        leftIndex,
        rightIndex,
        skippedChar: text[leftIndex],
      });
      leftIndex++;
      tracker.setPointers(leftIndex, rightIndex, { leftIndex, rightIndex });
    }

    // Skip non-alphanumeric from the right
    while (leftIndex < rightIndex && !isAlphanumeric(text[rightIndex] ?? "")) {
      tracker.skipNonAlphanumeric(rightIndex, "right", {
        leftIndex,
        rightIndex,
        skippedChar: text[rightIndex],
      });
      rightIndex--;
      tracker.setPointers(leftIndex, rightIndex, { leftIndex, rightIndex });
    }

    if (leftIndex >= rightIndex) break;

    tracker.compareChars(leftIndex, rightIndex, {
      leftIndex,
      rightIndex,
      leftChar: text[leftIndex],
      rightChar: text[rightIndex],
    });

    const leftChar = (text[leftIndex] ?? "").toLowerCase();
    const rightChar = (text[rightIndex] ?? "").toLowerCase();

    if (leftChar !== rightChar) {
      tracker.charsMismatch(leftIndex, rightIndex, {
        leftIndex,
        rightIndex,
        leftChar: text[leftIndex],
        rightChar: text[rightIndex],
      });
      tracker.complete({ isPalindrome: false });
      return tracker.getSteps();
    }

    tracker.charsMatch(leftIndex, rightIndex, {
      leftIndex,
      rightIndex,
      leftChar: text[leftIndex],
      rightChar: text[rightIndex],
    });

    leftIndex++;
    rightIndex--;

    if (leftIndex < rightIndex) {
      tracker.setPointers(leftIndex, rightIndex, { leftIndex, rightIndex });
    }
  }

  tracker.markPalindrome(0, text.length, { isPalindrome: true });
  tracker.complete({ isPalindrome: true });
  return tracker.getSteps();
}
