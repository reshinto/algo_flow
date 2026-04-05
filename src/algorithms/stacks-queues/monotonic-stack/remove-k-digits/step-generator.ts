/** Step generator for Remove K Digits — produces ExecutionStep[] using StackQueueTracker. */

import type { ExecutionStep } from "@/types";
import { StackQueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RKD_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REMOVE_K_DIGITS!);

export interface RemoveKDigitsInput {
  num: string;
  removalCount: number;
}

export function generateRemoveKDigitsSteps(input: RemoveKDigitsInput): ExecutionStep[] {
  const { num, removalCount } = input;
  const tracker = new StackQueueTracker(num, RKD_LINE_MAP);

  const digitStack: string[] = [];
  let removalsLeft = removalCount;

  tracker.initialize({ num, removalCount, removalsLeft });

  for (let digitIdx = 0; digitIdx < num.length; digitIdx++) {
    const currentDigit = num[digitIdx]!;

    tracker.processChar(digitIdx, { digitIdx, currentDigit, removalsLeft });

    // Pop larger digits from stack while removals remain — maintain monotonic increasing order
    while (
      removalsLeft > 0 &&
      digitStack.length > 0 &&
      digitStack[digitStack.length - 1]! > currentDigit
    ) {
      const removedDigit = digitStack[digitStack.length - 1]!;
      digitStack.pop();
      removalsLeft--;

      tracker.popMatched(removedDigit, digitIdx, {
        digitIdx,
        currentDigit,
        removedDigit,
        removalsLeft,
        reason: `Stack top '${removedDigit}' > '${currentDigit}' — remove it to keep number small`,
      });
    }

    digitStack.push(currentDigit);
    tracker.push(currentDigit, digitIdx, {
      digitIdx,
      currentDigit,
      removalsLeft,
      stackSize: digitStack.length,
    });
  }

  // Remove trailing digits from the end if removals remain
  while (removalsLeft > 0) {
    const removedDigit = digitStack[digitStack.length - 1]!;
    digitStack.pop();
    removalsLeft--;

    tracker.popMatched(removedDigit, num.length - 1, {
      removedDigit,
      removalsLeft,
      reason: `${removalsLeft + 1} removal(s) remain — trim '${removedDigit}' from the end`,
    });
  }

  const result = digitStack.join("").replace(/^0+/, "") || "0";
  tracker.complete(true, { result, finalStack: [...digitStack] });

  return tracker.getSteps();
}
