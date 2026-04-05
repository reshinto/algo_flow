/** Step generator for Reverse String — produces ExecutionStep[] using TransformTracker. */

import type { ExecutionStep } from "@/types";
import { TransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const REVERSE_STRING_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REVERSE_STRING!);

export interface ReverseStringInput {
  text: string;
}

export function generateReverseStringSteps(input: ReverseStringInput): ExecutionStep[] {
  const { text } = input;
  const tracker = new TransformTracker(text, REVERSE_STRING_LINE_MAP);

  tracker.initialize({ text, leftIndex: 0, rightIndex: text.length - 1 });

  let leftIndex = 0;
  let rightIndex = text.length - 1;

  while (leftIndex < rightIndex) {
    // Read both characters before swapping
    tracker.readChar(leftIndex, { leftIndex, rightIndex });
    tracker.readChar(rightIndex, { leftIndex, rightIndex });

    // Swap the characters at the two pointers
    tracker.swapChars(leftIndex, rightIndex, { leftIndex, rightIndex });

    // Advance the pointers inward
    leftIndex++;
    rightIndex--;
    tracker.advancePointers(leftIndex, rightIndex, { leftIndex, rightIndex });
  }

  tracker.complete({ result: text.split("").reverse().join("") });
  return tracker.getSteps();
}
