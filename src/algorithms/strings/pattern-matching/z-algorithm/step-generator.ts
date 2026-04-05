/** Step generator for Z-Algorithm — produces ExecutionStep[] using StringTracker. */

import type { ExecutionStep } from "@/types";
import { StringTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const Z_ALGORITHM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.Z_ALGORITHM!);

export interface ZAlgorithmInput {
  text: string;
  pattern: string;
}

export function generateZAlgorithmSteps(input: ZAlgorithmInput): ExecutionStep[] {
  const { text, pattern } = input;

  if (pattern.length === 0) {
    const tracker = new StringTracker(text, pattern, Z_ALGORITHM_LINE_MAP);
    tracker.initialize({ text, pattern });
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  const combined = pattern + "$" + text;
  const combinedLength = combined.length;
  const patternLength = pattern.length;

  // StringTracker "text" = the combined string (pattern + "$" + text).
  // StringTracker "pattern" = the original pattern.
  // The failure table (length = patternLength) is reused to display Z-values
  // for the first patternLength positions of the text region. Beyond that,
  // Z-array values are computed silently and only match detection emits steps.
  const tracker = new StringTracker(combined, pattern, Z_ALGORITHM_LINE_MAP);
  tracker.initialize({ text, pattern, combined });

  const zArray = new Array<number>(combinedLength).fill(0);
  let windowLeft = 0;
  let windowRight = 0;
  const textRegionOffset = patternLength + 1;

  for (let pos = 1; pos < combinedLength; pos++) {
    const textPos = pos - textRegionOffset;
    const isInTextRegion = textPos >= 0;
    // Only emit tracker steps for the first patternLength positions of the text region
    // because the StringTracker failure table has exactly patternLength slots.
    const emitZStep = isInTextRegion && textPos < patternLength;

    if (emitZStep) {
      tracker.computingFailureEntry(textPos, { pos, windowLeft, windowRight });
    }

    if (pos < windowRight) {
      zArray[pos] = Math.min(windowRight - pos, zArray[pos - windowLeft]!);
    }

    while (
      pos + (zArray[pos] ?? 0) < combinedLength &&
      combined[zArray[pos] ?? 0] === combined[pos + (zArray[pos] ?? 0)]
    ) {
      zArray[pos] = (zArray[pos] ?? 0) + 1;
    }

    if (pos + (zArray[pos] ?? 0) > windowRight) {
      windowLeft = pos;
      windowRight = pos + (zArray[pos] ?? 0);
    }

    if (emitZStep) {
      const zValue = zArray[pos] ?? 0;
      tracker.setFailureEntry(textPos, zValue, { pos, zValue, windowLeft, windowRight });
    }

    // Match found when Z[pos] equals pattern length — pattern starts at textPos in original text.
    if ((zArray[pos] ?? 0) === patternLength && isInTextRegion) {
      const matchStart = textPos;
      // Use the first and last character positions in the combined string to show the match.
      tracker.compareChars(pos, 0, matchStart, { pos, matchStart });
      tracker.charMatch(pos, 0, { pos, matchStart });
      tracker.recordMatch(pos, { matchStart });
      tracker.complete({ result: matchStart });
      return tracker.getSteps();
    }
  }

  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
