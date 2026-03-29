/** Step generator for LIS (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LIS_MEMO_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LIS_MEMOIZATION!);

interface LISInput {
  sequence: number[];
}

export function generateLisMemoizationSteps(input: LISInput): ExecutionStep[] {
  const { sequence } = input;
  const sequenceLength = sequence.length;
  const tableSize = Math.max(sequenceLength, 1);
  const tracker = new DPTracker(tableSize, LIS_MEMO_LINE_MAP, (index) => `L(${index})`);
  const memo = new Map<number, number>();

  tracker.initialize({ sequence });

  if (sequenceLength === 0) {
    tracker.complete({ result: 0, sequence });
    return tracker.getSteps();
  }

  function computeLis(startIndex: number): number {
    if (memo.has(startIndex)) {
      tracker.readCache(startIndex, {
        startIndex,
        cachedValue: memo.get(startIndex),
      });
      return memo.get(startIndex)!;
    }

    tracker.pushCallStack(`L(${startIndex})`, { startIndex });

    let maxLength = 1;
    for (let nextIndex = startIndex + 1; nextIndex < sequenceLength; nextIndex++) {
      if (sequence[nextIndex]! > sequence[startIndex]!) {
        const subLength = 1 + computeLis(nextIndex);
        if (subLength > maxLength) {
          maxLength = subLength;
        }
      }
    }

    memo.set(startIndex, maxLength);

    tracker.computeCell(
      startIndex,
      maxLength,
      {
        startIndex,
        value: sequence[startIndex],
        formula: `L(${startIndex}) = ${maxLength}`,
        maxLength,
      },
      `Compute L(${startIndex}) = ${maxLength} (seq[${startIndex}]=${sequence[startIndex]})`,
    );

    tracker.popCallStack({ startIndex, result: maxLength });

    return maxLength;
  }

  let result = 0;
  for (let startIndex = 0; startIndex < sequenceLength; startIndex++) {
    const lisLength = computeLis(startIndex);
    if (lisLength > result) {
      result = lisLength;
    }
  }

  tracker.complete({ result, sequence });

  return tracker.getSteps();
}
