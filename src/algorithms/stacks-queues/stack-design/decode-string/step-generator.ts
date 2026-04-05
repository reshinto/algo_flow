/** Step generator for Decode String — produces ExecutionStep[] using StackQueueTracker. */

import type { ExecutionStep } from "@/types";
import { StackQueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DECODE_STRING!);

export interface DecodeStringInput {
  inputString: string;
}

export function generateDecodeStringSteps(input: DecodeStringInput): ExecutionStep[] {
  const { inputString } = input;
  const tracker = new StackQueueTracker(inputString, DS_LINE_MAP);

  const countStack: number[] = [];
  const stringStack: string[] = [];
  let currentString = "";
  let currentCount = 0;

  tracker.initialize({ inputString, currentString, currentCount });

  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const currentChar = inputString[charIdx]!;

    tracker.processChar(charIdx, { charIdx, currentChar, currentCount, currentString });

    if (currentChar >= "0" && currentChar <= "9") {
      currentCount = currentCount * 10 + parseInt(currentChar, 10);
      // No extra step needed — processChar already captured the digit visit
    } else if (currentChar === "[") {
      countStack.push(currentCount);
      stringStack.push(currentString);
      currentCount = 0;
      currentString = "";
      tracker.push(currentChar, charIdx, {
        charIdx,
        currentChar,
        countStackDepth: countStack.length,
        stringStackDepth: stringStack.length,
        currentCount,
        currentString,
      });
    } else if (currentChar === "]") {
      const repeatCount = countStack.pop()!;
      const prevString = stringStack.pop()!;
      currentString = prevString + currentString.repeat(repeatCount);
      tracker.popMatched(currentChar, charIdx, {
        charIdx,
        currentChar,
        repeatCount,
        prevString,
        currentString,
        countStackDepth: countStack.length,
        stringStackDepth: stringStack.length,
      });
    } else {
      currentString += currentChar;
      // Regular character appended to accumulator — already captured by processChar
    }
  }

  tracker.complete(true, { decodedResult: currentString });

  return tracker.getSteps();
}
