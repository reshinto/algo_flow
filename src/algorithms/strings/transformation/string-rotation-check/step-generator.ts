/** Step generator for String Rotation Check — produces ExecutionStep[] using TransformTracker. */

import type { ExecutionStep } from "@/types";
import { TransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const STRING_ROTATION_CHECK_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.STRING_ROTATION_CHECK!);

export interface StringRotationCheckInput {
  text: string;
  pattern: string;
}

export function generateStringRotationCheckSteps(input: StringRotationCheckInput): ExecutionStep[] {
  const { text, pattern } = input;
  const tracker = new TransformTracker(text, STRING_ROTATION_CHECK_LINE_MAP);

  // Phase 1: initialize — validate lengths
  tracker.initialize({ text, pattern, lengthMatch: text.length === pattern.length });

  if (pattern.length !== text.length) {
    tracker.complete({ result: false, reason: "length mismatch" });
    return tracker.getSteps();
  }

  // Phase 2: concatenation — build text+text in the output buffer
  tracker.setPhase("concatenation", { text, pattern });
  const concatenated = text + text;
  tracker.appendOutput(concatenated, { concatenated, pattern });

  // Phase 3: search — scan through concatenated string looking for pattern
  tracker.setPhase("search", { concatenated, pattern });

  const patternLength = pattern.length;
  const searchLength = concatenated.length - patternLength;
  let foundAtIndex = -1;

  for (let searchIndex = 0; searchIndex <= searchLength; searchIndex++) {
    tracker.readChar(searchIndex, { searchIndex, pattern, concatenated });

    const window = concatenated.slice(searchIndex, searchIndex + patternLength);
    if (window === pattern) {
      foundAtIndex = searchIndex;
      break;
    }
  }

  // Phase 4: mark converted if pattern was found, then complete.
  // markConverted operates on inputChars (the original text), so we mark the full
  // input range [0, text.length - 1] to indicate a successful rotation match.
  if (foundAtIndex !== -1) {
    tracker.markConverted(0, text.length - 1, {
      foundAtIndex,
      pattern,
      result: true,
    });
  }

  tracker.complete({ result: foundAtIndex !== -1 });
  return tracker.getSteps();
}
