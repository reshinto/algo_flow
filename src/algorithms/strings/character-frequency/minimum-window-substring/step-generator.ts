/** Step generator for Minimum Window Substring — produces ExecutionStep[] using FrequencyTracker. */

import type { ExecutionStep } from "@/types";
import { FrequencyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MINIMUM_WINDOW_SUBSTRING_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.MINIMUM_WINDOW_SUBSTRING!,
);

export interface MinimumWindowSubstringInput {
  text: string;
  pattern: string;
}

export function generateMinimumWindowSubstringSteps(
  input: MinimumWindowSubstringInput,
): ExecutionStep[] {
  const { text, pattern } = input;
  const tracker = new FrequencyTracker(text, pattern, MINIMUM_WINDOW_SUBSTRING_LINE_MAP);

  // Initialize — capture starting state with both strings
  tracker.initialize({ text, pattern, textLength: text.length, patternLength: pattern.length });

  // Early exit: empty pattern or text shorter than pattern
  if (pattern.length === 0 || text.length < pattern.length) {
    tracker.complete({ result: "", bestStart: -1 });
    return tracker.getSteps();
  }

  // Build target frequency map from pattern
  const targetFrequency = new Map<string, number>();
  for (const char of pattern) {
    targetFrequency.set(char, (targetFrequency.get(char) ?? 0) + 1);
  }

  const windowFrequency = new Map<string, number>();
  const required = targetFrequency.size;
  let satisfied = 0;
  let leftIndex = 0;
  let bestStart = -1;
  let bestLength = Infinity;

  for (let rightIndex = 0; rightIndex < text.length; rightIndex++) {
    const rightChar = text[rightIndex]!;

    // Expand right boundary and add character to window
    tracker.expandWindow(rightIndex, {
      rightIndex,
      rightChar,
      windowStart: leftIndex,
      windowEnd: rightIndex,
    });

    windowFrequency.set(rightChar, (windowFrequency.get(rightChar) ?? 0) + 1);
    tracker.addToFrequency(rightChar, {
      rightIndex,
      rightChar,
      count: windowFrequency.get(rightChar),
    });

    // Check whether this character's frequency requirement is now satisfied
    const targetCount = targetFrequency.get(rightChar);
    if (targetCount !== undefined && windowFrequency.get(rightChar) === targetCount) {
      satisfied += 1;
      tracker.markSatisfied(rightChar, {
        rightIndex,
        rightChar,
        satisfied,
        required,
      });
    }

    // Shrink from left while all required characters are satisfied
    while (satisfied === required) {
      const windowLength = rightIndex - leftIndex + 1;

      // Record a new best window whenever current window is smaller
      if (windowLength < bestLength) {
        bestLength = windowLength;
        bestStart = leftIndex;
        tracker.addToResult(leftIndex, {
          leftIndex,
          rightIndex,
          windowLength,
          bestStart: leftIndex,
          bestWindow: text.slice(leftIndex, rightIndex + 1),
        });
      }

      // Remove left character from window and advance left pointer
      const leftChar = text[leftIndex]!;
      tracker.shrinkWindow(leftIndex + 1, {
        leftIndex,
        leftChar,
        windowStart: leftIndex + 1,
        windowEnd: rightIndex,
      });

      windowFrequency.set(leftChar, (windowFrequency.get(leftChar) ?? 0) - 1);
      tracker.removeFromFrequency(leftChar, {
        leftIndex,
        leftChar,
        count: windowFrequency.get(leftChar),
      });

      // If removing left char drops below required count, we lose satisfaction
      const leftTarget = targetFrequency.get(leftChar);
      if (leftTarget !== undefined && (windowFrequency.get(leftChar) ?? 0) < leftTarget) {
        satisfied -= 1;
      }

      leftIndex += 1;
    }
  }

  const result = bestStart === -1 ? "" : text.slice(bestStart, bestStart + bestLength);
  tracker.complete({ result, bestStart, bestLength: bestLength === Infinity ? 0 : bestLength });
  return tracker.getSteps();
}
