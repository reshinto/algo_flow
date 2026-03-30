/** Step generator for Longest Consecutive Sequence — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LONGEST_CONSECUTIVE_SEQUENCE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.LONGEST_CONSECUTIVE_SEQUENCE!,
);

export interface LongestConsecutiveSequenceInput {
  numbers: number[];
}

export function generateLongestConsecutiveSequenceSteps(
  input: LongestConsecutiveSequenceInput,
): ExecutionStep[] {
  const { numbers } = input;
  const tracker = new HashMapTracker(numbers, LONGEST_CONSECUTIVE_SEQUENCE_LINE_MAP);
  const numSet = new Set<number>();

  tracker.initialize({ numbers });
  tracker.setPhase("building");

  for (let buildIdx = 0; buildIdx < numbers.length; buildIdx++) {
    const currentNumber = numbers[buildIdx]!;
    tracker.processElement(buildIdx, { buildIdx, value: currentNumber });
    numSet.add(currentNumber);
    tracker.insertKey(String(currentNumber), "✓", { key: currentNumber });
  }

  tracker.setPhase("scanning");
  let maxLength = 0;

  for (let scanIdx = 0; scanIdx < numbers.length; scanIdx++) {
    const currentNumber = numbers[scanIdx]!;
    tracker.processElement(scanIdx, { scanIdx, value: currentNumber });
    tracker.lookupKey(String(currentNumber - 1), {
      currentNumber,
      predecessor: currentNumber - 1,
    });

    if (!numSet.has(currentNumber - 1)) {
      tracker.keyNotFound(String(currentNumber - 1), {
        currentNumber,
        note: "sequence start found",
      });

      let sequenceLength = 1;
      let nextNumber = currentNumber + 1;

      while (numSet.has(nextNumber)) {
        tracker.lookupKey(String(nextNumber), { nextNumber, sequenceLength });
        tracker.keyFound(String(nextNumber), scanIdx, scanIdx, {
          nextNumber,
          sequenceLength: sequenceLength + 1,
        });
        sequenceLength++;
        nextNumber++;
      }

      if (numSet.has(nextNumber - 1) && nextNumber - 1 !== currentNumber) {
        // already emitted key-found steps above
      }

      // emit key-not-found to close the while loop
      tracker.lookupKey(String(nextNumber), { nextNumber, note: "end of sequence" });
      tracker.keyNotFound(String(nextNumber), { sequenceLength, note: "sequence ended" });

      maxLength = Math.max(maxLength, sequenceLength);
      tracker.setResult(maxLength);
    }
  }

  tracker.complete({ result: maxLength });
  return tracker.getSteps();
}
