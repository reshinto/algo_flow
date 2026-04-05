/** Step generator for Min Remove to Make Valid — produces ExecutionStep[] using StackQueueTracker. */

import type { ExecutionStep } from "@/types";
import { StackQueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MR_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MIN_REMOVE_TO_MAKE_VALID!);

export interface MinRemoveToMakeValidInput {
  inputString: string;
}

export function generateMinRemoveToMakeValidSteps(
  input: MinRemoveToMakeValidInput,
): ExecutionStep[] {
  const { inputString } = input;
  const tracker = new StackQueueTracker(inputString, MR_LINE_MAP);

  /** Stack of character indices for unmatched '(' characters. */
  const unmatchedOpenIndices: number[] = [];
  /** Set of character indices for unmatched ')' characters. */
  const unmatchedCloseIndices: Set<number> = new Set();

  tracker.initialize({ inputString });

  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!;

    tracker.processChar(charIdx, { charIdx, char });

    if (char === "(") {
      unmatchedOpenIndices.push(charIdx);
      tracker.push(char, charIdx, { char, stackSize: unmatchedOpenIndices.length });
    } else if (char === ")") {
      if (unmatchedOpenIndices.length > 0) {
        const matchedOpenIdx = unmatchedOpenIndices.pop()!;
        tracker.popMatched(char, charIdx, {
          char,
          matchedOpenIdx,
          stackSize: unmatchedOpenIndices.length,
        });
      } else {
        unmatchedCloseIndices.add(charIdx);
        tracker.mismatch(char, charIdx, {
          char,
          expected: "matching '(' on stack",
          got: "empty stack",
        });
      }
    }
  }

  // Mark each remaining unmatched '(' index as a mismatch (no closing bracket was found)
  for (const unmatchedIdx of unmatchedOpenIndices) {
    tracker.mismatch("(", unmatchedIdx, {
      char: "(",
      unmatchedIdx,
      reason: "no matching closing bracket",
    });
  }

  // Build the result string by excluding all unmatched indices
  const unmatchedIndices = new Set([...unmatchedOpenIndices, ...unmatchedCloseIndices]);
  let resultString = "";
  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    if (!unmatchedIndices.has(charIdx)) {
      resultString += inputString[charIdx];
    }
  }

  tracker.complete(true, { resultString, removedCount: unmatchedIndices.size });

  return tracker.getSteps();
}
