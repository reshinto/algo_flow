/** Step generator for Hamming Distance — produces ExecutionStep[] using StringTracker. */

import type { ExecutionStep } from "@/types";
import { StringTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HAMMING_DISTANCE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HAMMING_DISTANCE!);

export interface HammingDistanceInput {
  text: string;
  pattern: string;
}

export function generateHammingDistanceSteps(input: HammingDistanceInput): ExecutionStep[] {
  const { text, pattern } = input;

  // Use empty strings for pattern when lengths differ so the tracker still renders
  const trackerPattern = text.length === pattern.length ? pattern : pattern.slice(0, text.length);
  const tracker = new StringTracker(text, trackerPattern, HAMMING_DISTANCE_LINE_MAP);

  if (text.length !== pattern.length) {
    tracker.initialize({ text, pattern, error: "Strings must be equal length" });
    tracker.complete({ result: -1 });
    return tracker.getSteps();
  }

  tracker.initialize({ text, pattern, distance: 0 });

  let distance = 0;

  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    tracker.compareChars(charIndex, charIndex, 0, { charIndex, distance });

    if (text[charIndex] !== pattern[charIndex]) {
      distance++;
      tracker.charMismatch(charIndex, charIndex, { charIndex, distance });
    } else {
      tracker.charMatch(charIndex, charIndex, { charIndex, distance });
    }
  }

  tracker.complete({ result: distance });
  return tracker.getSteps();
}
