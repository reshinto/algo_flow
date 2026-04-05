/** Step generator for Palindrome Check — produces ExecutionStep[] using PalindromeTracker. */

import type { ExecutionStep } from "@/types";
import { PalindromeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PALINDROME_CHECK_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PALINDROME_CHECK!);

export interface PalindromeCheckInput {
  text: string;
}

export function generatePalindromeCheckSteps(input: PalindromeCheckInput): ExecutionStep[] {
  const { text } = input;
  const tracker = new PalindromeTracker(text, PALINDROME_CHECK_LINE_MAP);

  tracker.initialize({ text, leftIndex: 0, rightIndex: text.length - 1 });

  let leftIndex = 0;
  let rightIndex = text.length - 1;

  tracker.setPointers(leftIndex, rightIndex, { leftIndex, rightIndex });

  while (leftIndex < rightIndex) {
    tracker.compareChars(leftIndex, rightIndex, {
      leftIndex,
      rightIndex,
      leftChar: text[leftIndex],
      rightChar: text[rightIndex],
    });

    if (text[leftIndex] !== text[rightIndex]) {
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
