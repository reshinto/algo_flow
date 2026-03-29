/** Step generator for KMP Search — produces ExecutionStep[] using StringTracker. */

import type { ExecutionStep } from "@/types";
import { StringTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const KMP_SEARCH_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KMP_SEARCH!);

export interface KmpSearchInput {
  text: string;
  pattern: string;
}

export function generateKmpSearchSteps(input: KmpSearchInput): ExecutionStep[] {
  const { text, pattern } = input;
  const tracker = new StringTracker(text, pattern, KMP_SEARCH_LINE_MAP);

  tracker.initialize({ text, pattern });

  // Phase 1: Build failure table
  const failure = new Array<number>(pattern.length).fill(0);
  let prefixLen = 0;
  let tableIdx = 1;

  while (tableIdx < pattern.length) {
    tracker.computingFailureEntry(tableIdx, { tableIdx, prefixLen });
    if (pattern[tableIdx] === pattern[prefixLen]) {
      prefixLen++;
      failure[tableIdx] = prefixLen;
      tracker.setFailureEntry(tableIdx, prefixLen, { tableIdx, prefixLen });
      tableIdx++;
    } else if (prefixLen > 0) {
      prefixLen = failure[prefixLen - 1]!;
      tracker.setFailureEntry(tableIdx, failure[tableIdx]!, { tableIdx, prefixLen });
    } else {
      failure[tableIdx] = 0;
      tracker.setFailureEntry(tableIdx, 0, { tableIdx, prefixLen });
      tableIdx++;
    }
  }

  // Phase 2: Search
  tracker.startSearch({ text, pattern });

  let textIdx = 0;
  let patternIdx = 0;
  let patternOffset = 0;

  while (textIdx < text.length) {
    tracker.compareChars(textIdx, patternIdx, patternOffset, {
      textIdx,
      patternIdx,
      patternOffset,
    });

    if (text[textIdx] === pattern[patternIdx]) {
      tracker.charMatch(textIdx, patternIdx, { textIdx, patternIdx });
      textIdx++;
      patternIdx++;

      if (patternIdx === pattern.length) {
        const matchStart = textIdx - patternIdx;
        tracker.recordMatch(matchStart, { matchStart });
        tracker.complete({ result: matchStart });
        return tracker.getSteps();
      }
    } else if (patternIdx > 0) {
      tracker.charMismatch(textIdx, patternIdx, { textIdx, patternIdx });
      patternIdx = failure[patternIdx - 1]!;
      patternOffset = textIdx - patternIdx;
      tracker.shiftPattern(patternOffset, patternIdx, { patternOffset, patternIdx });
    } else {
      tracker.charMismatch(textIdx, patternIdx, { textIdx, patternIdx });
      textIdx++;
      patternOffset = textIdx - patternIdx;
      tracker.shiftPattern(patternOffset, patternIdx, { patternOffset, patternIdx });
    }
  }

  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
