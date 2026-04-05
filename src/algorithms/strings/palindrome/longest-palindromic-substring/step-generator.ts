/** Step generator for Longest Palindromic Substring — produces ExecutionStep[] using PalindromeTracker. */

import type { ExecutionStep } from "@/types";
import { PalindromeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LONGEST_PALINDROMIC_SUBSTRING_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.LONGEST_PALINDROMIC_SUBSTRING!,
);

export interface LongestPalindromicSubstringInput {
  text: string;
}

export function generateLongestPalindromicSubstringSteps(
  input: LongestPalindromicSubstringInput,
): ExecutionStep[] {
  const { text } = input;
  const tracker = new PalindromeTracker(text, LONGEST_PALINDROMIC_SUBSTRING_LINE_MAP);

  if (text.length === 0) {
    tracker.initialize({ text, longestStart: 0, longestLength: 0 });
    tracker.complete({ result: "" });
    return tracker.getSteps();
  }

  let longestStart = 0;
  let longestLength = 1;

  tracker.initialize({ text, longestStart, longestLength });

  for (let centerIndex = 0; centerIndex < text.length; centerIndex++) {
    // Odd-length: expand from single character center
    tracker.expandCenter(centerIndex, 0, {
      centerIndex,
      kind: "odd",
      longestStart,
      longestLength,
    });

    let oddRadius = 0;
    while (centerIndex - oddRadius - 1 >= 0 && centerIndex + oddRadius + 1 < text.length) {
      const leftIdx = centerIndex - oddRadius - 1;
      const rightIdx = centerIndex + oddRadius + 1;

      tracker.compareChars(leftIdx, rightIdx, {
        centerIndex,
        leftIdx,
        rightIdx,
        leftChar: text[leftIdx],
        rightChar: text[rightIdx],
      });

      if (text[leftIdx] !== text[rightIdx]) {
        tracker.charsMismatch(leftIdx, rightIdx, {
          centerIndex,
          leftIdx,
          rightIdx,
          leftChar: text[leftIdx],
          rightChar: text[rightIdx],
        });
        break;
      }

      tracker.charsMatch(leftIdx, rightIdx, {
        centerIndex,
        leftIdx,
        rightIdx,
        leftChar: text[leftIdx],
        rightChar: text[rightIdx],
      });

      oddRadius++;

      tracker.expandCenter(centerIndex, oddRadius, {
        centerIndex,
        kind: "odd",
        currentRadius: oddRadius,
        longestStart,
        longestLength,
      });
    }

    const oddLength = 2 * oddRadius + 1;
    if (oddLength > longestLength) {
      longestStart = centerIndex - oddRadius;
      longestLength = oddLength;
      tracker.updateLongest(longestStart, longestLength, {
        centerIndex,
        kind: "odd",
        longestStart,
        longestLength,
      });
    }

    // Even-length: expand from gap between centerIndex and centerIndex+1
    if (centerIndex + 1 < text.length) {
      const evenLeftIdx = centerIndex;
      const evenRightIdx = centerIndex + 1;

      tracker.compareChars(evenLeftIdx, evenRightIdx, {
        centerIndex,
        leftIdx: evenLeftIdx,
        rightIdx: evenRightIdx,
        leftChar: text[evenLeftIdx],
        rightChar: text[evenRightIdx],
        kind: "even",
      });

      if (text[evenLeftIdx] === text[evenRightIdx]) {
        tracker.charsMatch(evenLeftIdx, evenRightIdx, {
          centerIndex,
          leftIdx: evenLeftIdx,
          rightIdx: evenRightIdx,
          kind: "even",
        });

        let evenRadius = 1;

        tracker.expandCenter(centerIndex, evenRadius, {
          centerIndex,
          kind: "even",
          currentRadius: evenRadius,
          longestStart,
          longestLength,
        });

        while (centerIndex - evenRadius >= 0 && centerIndex + evenRadius + 1 < text.length) {
          const leftIdx = centerIndex - evenRadius;
          const rightIdx = centerIndex + evenRadius + 1;

          tracker.compareChars(leftIdx, rightIdx, {
            centerIndex,
            leftIdx,
            rightIdx,
            leftChar: text[leftIdx],
            rightChar: text[rightIdx],
            kind: "even",
          });

          if (text[leftIdx] !== text[rightIdx]) {
            tracker.charsMismatch(leftIdx, rightIdx, {
              centerIndex,
              leftIdx,
              rightIdx,
              leftChar: text[leftIdx],
              rightChar: text[rightIdx],
              kind: "even",
            });
            break;
          }

          tracker.charsMatch(leftIdx, rightIdx, {
            centerIndex,
            leftIdx,
            rightIdx,
            leftChar: text[leftIdx],
            rightChar: text[rightIdx],
            kind: "even",
          });

          evenRadius++;

          tracker.expandCenter(centerIndex, evenRadius, {
            centerIndex,
            kind: "even",
            currentRadius: evenRadius,
            longestStart,
            longestLength,
          });
        }

        const evenLength = 2 * evenRadius;
        if (evenLength > longestLength) {
          longestStart = centerIndex - evenRadius + 1;
          longestLength = evenLength;
          tracker.updateLongest(longestStart, longestLength, {
            centerIndex,
            kind: "even",
            longestStart,
            longestLength,
          });
        }
      } else {
        tracker.charsMismatch(evenLeftIdx, evenRightIdx, {
          centerIndex,
          leftIdx: evenLeftIdx,
          rightIdx: evenRightIdx,
          kind: "even",
        });
      }
    }
  }

  tracker.markPalindrome(longestStart, longestLength, {
    longestStart,
    longestLength,
    result: text.slice(longestStart, longestStart + longestLength),
  });

  tracker.complete({
    longestStart,
    longestLength,
    result: text.slice(longestStart, longestStart + longestLength),
  });

  return tracker.getSteps();
}
