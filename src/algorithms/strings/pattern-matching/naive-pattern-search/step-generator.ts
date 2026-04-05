/** Step generator for Naive Pattern Search — produces ExecutionStep[] using StringTracker. */

import type { ExecutionStep } from "@/types";
import { StringTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const NAIVE_PATTERN_SEARCH_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.NAIVE_PATTERN_SEARCH!);

export interface NaivePatternSearchInput {
  text: string;
  pattern: string;
}

export function generateNaivePatternSearchSteps(input: NaivePatternSearchInput): ExecutionStep[] {
  const { text, pattern } = input;
  const tracker = new StringTracker(text, pattern, NAIVE_PATTERN_SEARCH_LINE_MAP);

  tracker.initialize({ text, pattern });

  if (pattern.length === 0) {
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  // Slide pattern across text one position at a time
  for (let textIdx = 0; textIdx <= text.length - pattern.length; textIdx++) {
    let patternIdx = 0;

    // Compare characters at current offset
    while (patternIdx < pattern.length) {
      const absoluteTextIdx = textIdx + patternIdx;
      tracker.compareChars(absoluteTextIdx, patternIdx, textIdx, {
        textIdx,
        patternIdx,
        absoluteTextIdx,
      });

      if (text[absoluteTextIdx] === pattern[patternIdx]) {
        tracker.charMatch(absoluteTextIdx, patternIdx, { textIdx, patternIdx });
        patternIdx++;
      } else {
        // Mismatch — slide pattern right by one
        tracker.charMismatch(absoluteTextIdx, patternIdx, { textIdx, patternIdx });
        tracker.shiftPattern(textIdx + 1, 0, { patternOffset: textIdx + 1, patternIdx: 0 });
        break;
      }
    }

    if (patternIdx === pattern.length) {
      tracker.recordMatch(textIdx, { matchStart: textIdx });
      tracker.complete({ result: textIdx });
      return tracker.getSteps();
    }
  }

  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
