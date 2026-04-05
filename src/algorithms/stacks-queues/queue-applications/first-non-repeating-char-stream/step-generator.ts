/** Step generator for First Non-Repeating Char Stream — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FNRCS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIRST_NON_REPEATING_CHAR_STREAM!);

export interface FirstNonRepeatingCharStreamInput {
  inputString: string;
}

export function generateFirstNonRepeatingCharStreamSteps(
  input: FirstNonRepeatingCharStreamInput,
): ExecutionStep[] {
  const { inputString } = input;
  const chars = inputString.split("");
  const tracker = new QueueTracker(chars, FNRCS_LINE_MAP);

  const freqMap: Record<string, number> = {};
  const queue: string[] = [];
  const results: string[] = [];

  tracker.initialize({
    inputString,
    freqMap: {},
    queue: [],
    results: [],
  });

  for (let charIdx = 0; charIdx < chars.length; charIdx++) {
    const char = chars[charIdx]!;
    freqMap[char] = (freqMap[char] ?? 0) + 1;

    tracker.processElement(charIdx, {
      charIdx,
      char,
      freqMap: { ...freqMap },
      queue: [...queue],
      results: [...results],
    });

    queue.push(char);
    tracker.enqueue(char, {
      charIdx,
      char,
      freq: freqMap[char],
      freqMap: { ...freqMap },
      queue: [...queue],
      results: [...results],
    });

    // Drain repeated characters from the front
    while (queue.length > 0 && (freqMap[queue[0]!] ?? 0) > 1) {
      const frontChar = queue[0]!;
      queue.shift();
      tracker.dequeue(
        {
          charIdx,
          removedChar: frontChar,
          freq: freqMap[frontChar],
          freqMap: { ...freqMap },
          queue: [...queue],
          results: [...results],
        },
        `Dequeue '${frontChar}' — it has appeared ${String(freqMap[frontChar])} times and is no longer unique`,
      );
    }

    const answer = queue.length > 0 ? queue[0]! : "#";
    results.push(answer);

    tracker.peekFront(
      {
        charIdx,
        answer,
        freqMap: { ...freqMap },
        queue: [...queue],
        results: [...results],
      },
      answer === "#"
        ? "No non-repeating character — result is '#'"
        : `First non-repeating character is '${answer}'`,
    );
  }

  tracker.complete(
    {
      inputString,
      results: [...results],
    },
    `Processed ${String(inputString.length)} character${inputString.length === 1 ? "" : "s"} — results: [${results.join(", ")}]`,
  );

  return tracker.getSteps();
}
