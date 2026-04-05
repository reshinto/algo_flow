/** Step generator for Boyer-Moore Search — produces ExecutionStep[] using StringTracker. */

import type { ExecutionStep } from "@/types";
import { StringTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BOYER_MOORE_SEARCH_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BOYER_MOORE_SEARCH!);

export interface BoyerMooreSearchInput {
  text: string;
  pattern: string;
}

export function generateBoyerMooreSearchSteps(input: BoyerMooreSearchInput): ExecutionStep[] {
  const { text, pattern } = input;
  const tracker = new StringTracker(text, pattern, BOYER_MOORE_SEARCH_LINE_MAP);

  tracker.initialize({ text, pattern });

  if (pattern.length === 0) {
    tracker.recordMatch(0, { matchStart: 0 });
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  if (pattern.length > text.length) {
    tracker.complete({ result: -1 });
    return tracker.getSteps();
  }

  // Phase 1: Build bad character table — repurpose failure table visualizer.
  // Each entry stores the rightmost position of that character in the pattern.
  const badCharPositions = new Map<string, number>();

  for (let charIdx = 0; charIdx < pattern.length; charIdx++) {
    const currentChar = pattern[charIdx]!;
    tracker.computingFailureEntry(charIdx, {
      charIdx,
      currentChar,
      phase: "building-bad-char-table",
    });
    badCharPositions.set(currentChar, charIdx);
    tracker.setFailureEntry(charIdx, charIdx, {
      charIdx,
      currentChar,
      rightmostPosition: charIdx,
    });
  }

  // Phase 2: Search — align pattern at offset, compare right-to-left
  tracker.startSearch({ text, pattern });

  const patternLen = pattern.length;
  const textLen = text.length;
  let alignmentOffset = 0;

  while (alignmentOffset <= textLen - patternLen) {
    let patternIdx = patternLen - 1;

    // Compare right-to-left: emit a compareChars step for each position
    while (patternIdx >= 0) {
      const textIdx = alignmentOffset + patternIdx;

      tracker.compareChars(textIdx, patternIdx, alignmentOffset, {
        textIdx,
        patternIdx,
        alignmentOffset,
      });

      if (text[textIdx] === pattern[patternIdx]) {
        tracker.charMatch(textIdx, patternIdx, { textIdx, patternIdx });
        patternIdx--;
      } else {
        // Mismatch — compute bad character shift
        const mismatchChar = text[textIdx]!;
        const badCharShift = badCharPositions.get(mismatchChar) ?? -1;
        const shiftAmount = Math.max(1, patternIdx - badCharShift);

        tracker.charMismatch(textIdx, patternIdx, {
          textIdx,
          patternIdx,
          mismatchChar,
          badCharShift,
          shiftAmount,
        });

        alignmentOffset += shiftAmount;
        tracker.shiftPattern(alignmentOffset, patternLen - 1, {
          alignmentOffset,
          shiftAmount,
        });
        break;
      }

      if (patternIdx < 0) {
        // Full pattern matched
        tracker.recordMatch(alignmentOffset, { matchStart: alignmentOffset });
        tracker.complete({ result: alignmentOffset });
        return tracker.getSteps();
      }
    }
  }

  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
