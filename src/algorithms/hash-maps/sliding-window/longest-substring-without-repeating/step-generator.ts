import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LONGEST_SUBSTRING_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.LONGEST_SUBSTRING_WITHOUT_REPEATING!,
);

export interface LongestSubstringInput {
  text: string;
}

export function generateLongestSubstringWithoutRepeatingSteps(
  input: LongestSubstringInput,
): ExecutionStep[] {
  const { text } = input;
  const textChars = text.split("");
  const tracker = new HashMapTracker(textChars, LONGEST_SUBSTRING_LINE_MAP);
  const charIndexMap = new Map<string, number>();
  let windowStart = 0;
  let maxLength = 0;

  tracker.initialize({ text, windowStart, maxLength });

  for (let windowEnd = 0; windowEnd < text.length; windowEnd++) {
    const currentChar = text[windowEnd]!;
    tracker.processElement(windowEnd, { windowEnd, currentChar, windowStart, maxLength });

    const previousIndex = charIndexMap.get(currentChar);
    tracker.checkDuplicate(currentChar, { currentChar, previousIndex, windowStart });

    if (previousIndex !== undefined && previousIndex >= windowStart) {
      windowStart = previousIndex + 1;
      tracker.setWindowBounds(windowStart, windowEnd);
    }

    charIndexMap.set(currentChar, windowEnd);
    tracker.updateValue(currentChar, String(windowEnd), { currentChar, windowEnd });

    const currentLength = windowEnd - windowStart + 1;
    maxLength = Math.max(maxLength, currentLength);
    tracker.setWindowBounds(windowStart, windowEnd);
  }

  tracker.setResult(maxLength);
  tracker.complete({ result: maxLength });
  return tracker.getSteps();
}
