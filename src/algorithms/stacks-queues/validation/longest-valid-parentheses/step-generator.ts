/** Step generator for Longest Valid Parentheses — produces ExecutionStep[] using StackQueueTracker. */

import type { ExecutionStep } from "@/types";
import { StackQueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LVP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LONGEST_VALID_PARENTHESES!);

export interface LongestValidParenthesesInput {
  inputString: string;
}

export function generateLongestValidParenthesesSteps(
  input: LongestValidParenthesesInput,
): ExecutionStep[] {
  const { inputString } = input;
  const tracker = new StackQueueTracker(inputString, LVP_LINE_MAP);

  /**
   * Stack stores indices as strings so the StackQueueTracker can display them.
   * The first element (-1) acts as the base sentinel index.
   */
  const indexStack: number[] = [-1];
  let maxLength = 0;

  tracker.initialize({ inputString, indexStack: [-1], maxLength });

  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!;

    tracker.processChar(charIdx, { charIdx, char, maxLength });

    if (char === "(") {
      indexStack.push(charIdx);
      tracker.push(String(charIdx), charIdx, {
        charIdx,
        char,
        stackSize: indexStack.length,
        maxLength,
      });
    } else {
      // Pop the top of the stack
      indexStack.pop();

      if (indexStack.length === 0) {
        // Stack became empty — push current index as new base anchor
        indexStack.push(charIdx);
        tracker.mismatch(")", charIdx, {
          charIdx,
          char,
          reason: "stack empty after pop — pushing current index as new base",
          indexStack: [...indexStack],
          maxLength,
        });
        // Also record the push of the new base
        tracker.push(String(charIdx), charIdx, {
          charIdx,
          char,
          reason: "new base index pushed",
          stackSize: indexStack.length,
          maxLength,
        });
      } else {
        // Compute valid substring length from current index to new stack top
        const stackTop = indexStack[indexStack.length - 1]!;
        const currentLength = charIdx - stackTop;
        if (currentLength > maxLength) {
          maxLength = currentLength;
        }
        tracker.popMatched(")", charIdx, {
          charIdx,
          stackTop,
          currentLength,
          maxLength,
        });
      }
    }
  }

  tracker.complete(maxLength > 0 || inputString.length === 0, {
    maxLength,
    inputLength: inputString.length,
  });

  return tracker.getSteps();
}
