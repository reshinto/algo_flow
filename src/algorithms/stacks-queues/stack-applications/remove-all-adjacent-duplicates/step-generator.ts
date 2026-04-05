/** Step generator for Remove All Adjacent Duplicates — produces ExecutionStep[] using StackQueueTracker. */

import type { ExecutionStep } from "@/types";
import { StackQueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RAAD_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REMOVE_ALL_ADJACENT_DUPLICATES!);

export interface RemoveAllAdjacentDuplicatesInput {
  inputString: string;
}

export function generateRemoveAllAdjacentDuplicatesSteps(
  input: RemoveAllAdjacentDuplicatesInput,
): ExecutionStep[] {
  const { inputString } = input;
  const tracker = new StackQueueTracker(inputString, RAAD_LINE_MAP);
  const stack: string[] = [];

  tracker.initialize({ inputString });

  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!;
    const stackTop = stack[stack.length - 1];

    tracker.processChar(charIdx, { charIdx, char, stackTop: stackTop ?? "empty" });

    if (stack.length > 0 && stackTop === char) {
      stack.pop();
      tracker.popMatched(char, charIdx, { char, stackSize: stack.length });
    } else {
      stack.push(char);
      tracker.push(char, charIdx, { char, stackSize: stack.length });
    }
  }

  const result = stack.join("");
  tracker.complete(true, { result, remainingStack: [...stack] });

  return tracker.getSteps();
}
