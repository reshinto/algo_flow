/** Step generator for Decode Ways (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DECODE_WAYS_MEMO_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DECODE_WAYS_MEMOIZATION!);

interface DecodeWaysInput {
  digits: string;
}

export function generateDecodeWaysMemoizationSteps(input: DecodeWaysInput): ExecutionStep[] {
  const { digits } = input;
  const digitCount = digits.length;
  const tableSize = digitCount + 1;
  const tracker = new DPTracker(tableSize, DECODE_WAYS_MEMO_LINE_MAP, (index) => `D(${index})`);
  const memo = new Map<number, number>();

  tracker.initialize({ digits, digitCount });

  if (digitCount === 0) {
    tracker.complete({ result: 0, digits });
    return tracker.getSteps();
  }

  function decode(position: number): number {
    if (position === 0) {
      if (!memo.has(0)) {
        memo.set(0, 1);
        tracker.fillTable(0, 1, {
          position: 0,
          description: "Base case: D(0) = 1 (empty prefix has one way to decode)",
        });
      }
      return 1;
    }

    if (memo.has(position)) {
      tracker.readCache(position, {
        position,
        cachedValue: memo.get(position),
      });
      return memo.get(position)!;
    }

    tracker.pushCallStack(`D(${position})`, { position });

    let ways = 0;

    const singleDigit = Number(digits[position - 1]);
    if (singleDigit >= 1 && singleDigit <= 9) {
      ways += decode(position - 1);
    }

    if (position >= 2) {
      const twoDigitValue = Number(digits.slice(position - 2, position));
      if (twoDigitValue >= 10 && twoDigitValue <= 26) {
        ways += decode(position - 2);
      }
    }

    memo.set(position, ways);

    tracker.computeCell(position, ways, {
      position,
      formula: `D(${position}) = ways to decode first ${position} digit${position === 1 ? "" : "s"}`,
      singleDigit,
      ways,
    });

    tracker.popCallStack({ position, result: ways });

    return ways;
  }

  const result = decode(digitCount);

  tracker.complete({ result, digits });

  return tracker.getSteps();
}
