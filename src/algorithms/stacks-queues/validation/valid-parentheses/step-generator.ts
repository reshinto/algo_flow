/** Step generator for Valid Parentheses — produces ExecutionStep[] using StackQueueTracker. */

import type { ExecutionStep } from "@/types";
import { StackQueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const VP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.VALID_PARENTHESES!);

export interface ValidParenthesesInput {
  inputString: string;
}

const PAIRS: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
const OPENING = new Set(["(", "[", "{"]);

export function generateValidParenthesesSteps(input: ValidParenthesesInput): ExecutionStep[] {
  const { inputString } = input;
  const tracker = new StackQueueTracker(inputString, VP_LINE_MAP);
  const stack: string[] = [];

  tracker.initialize({ inputString });

  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!;

    tracker.processChar(charIdx, { charIdx, char });

    if (OPENING.has(char)) {
      stack.push(char);
      tracker.push(char, charIdx, { char, stackSize: stack.length });
    } else {
      const expectedOpen = PAIRS[char];
      const stackTop = stack[stack.length - 1];

      if (stack.length === 0 || stackTop !== expectedOpen) {
        tracker.mismatch(char, charIdx, {
          char,
          expected: expectedOpen,
          got: stackTop ?? "empty stack",
        });
        tracker.complete(false, { isValid: false });
        return tracker.getSteps();
      }

      stack.pop();
      tracker.popMatched(char, charIdx, { char, stackSize: stack.length });
    }
  }

  const isValid = stack.length === 0;
  tracker.complete(isValid, { isValid, remainingStack: [...stack] });

  return tracker.getSteps();
}
