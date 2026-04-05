/** Step generator for Backspace String Compare — produces ExecutionStep[] using StackQueueTracker. */

import type { ExecutionStep } from "@/types";
import { StackQueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BSC_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BACKSPACE_STRING_COMPARE!);

export interface BackspaceStringCompareInput {
  firstString: string;
  secondString: string;
}

function processStringSteps(
  inputStr: string,
  charOffset: number,
  tracker: StackQueueTracker,
  stack: string[],
  label: string,
): void {
  for (let charIdx = 0; charIdx < inputStr.length; charIdx++) {
    const char = inputStr[charIdx]!;
    const globalIdx = charOffset + charIdx;

    tracker.processChar(globalIdx, { char, charIdx, globalIdx, string: label });

    if (char === "#") {
      const stackTop = stack[stack.length - 1];
      if (stack.length > 0) {
        stack.pop();
        tracker.popMatched("#", globalIdx, {
          char,
          popped: stackTop,
          stackSize: stack.length,
          string: label,
        });
      }
    } else {
      stack.push(char);
      tracker.push(char, globalIdx, { char, stackSize: stack.length, string: label });
    }
  }
}

export function generateBackspaceStringCompareSteps(
  input: BackspaceStringCompareInput,
): ExecutionStep[] {
  const { firstString, secondString } = input;

  // Concatenate both strings with a "|" separator for visualization
  const combinedInput = firstString + "|" + secondString;
  const tracker = new StackQueueTracker(combinedInput, BSC_LINE_MAP);

  const firstStack: string[] = [];
  const secondStack: string[] = [];

  tracker.initialize({ firstString, secondString });

  // Process first string
  processStringSteps(firstString, 0, tracker, firstStack, "first");

  // Process second string (offset by firstString.length + 1 for the separator)
  processStringSteps(secondString, firstString.length + 1, tracker, secondStack, "second");

  // Compare the two resulting stacks
  const isEqual =
    firstStack.length === secondStack.length &&
    firstStack.every((char, stackIdx) => char === secondStack[stackIdx]);

  tracker.complete(isEqual, {
    firstResult: [...firstStack],
    secondResult: [...secondStack],
    isEqual,
  });

  return tracker.getSteps();
}
