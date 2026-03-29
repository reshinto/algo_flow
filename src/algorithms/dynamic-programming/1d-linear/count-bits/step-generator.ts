/** Step generator for Count Bits (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const COUNT_BITS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COUNT_BITS!);

interface CountBitsInput {
  targetNumber: number;
}

export function generateCountBitsSteps(input: CountBitsInput): ExecutionStep[] {
  const { targetNumber } = input;
  const tableSize = targetNumber + 1;
  const tracker = new DPTracker(tableSize, COUNT_BITS_LINE_MAP, (index) => `B(${index})`);

  tracker.initialize({ targetNumber, tableSize });

  tracker.fillTable(0, 0, {
    currentIndex: 0,
    value: 0,
    description: "Base case: B(0) = 0",
  });

  const dpTable = new Array<number>(tableSize).fill(0);

  for (let bitIndex = 1; bitIndex <= targetNumber; bitIndex++) {
    const halfIndex = bitIndex >> 1;
    const lsb = bitIndex & 1;

    tracker.readCache(halfIndex, {
      currentIndex: bitIndex,
      readingIndex: halfIndex,
      formula: `dp[${bitIndex} >> 1] = dp[${halfIndex}]`,
    });

    const computedValue = dpTable[halfIndex]! + lsb;
    dpTable[bitIndex] = computedValue;

    tracker.computeCell(
      bitIndex,
      computedValue,
      {
        currentIndex: bitIndex,
        halfIndex,
        lsb,
        formula: `B(${bitIndex}) = B(${halfIndex}) + (${bitIndex} & 1) = ${dpTable[halfIndex]!} + ${lsb}`,
        value: computedValue,
      },
      `Compute B(${bitIndex}) = B(${halfIndex}) + ${lsb} = ${computedValue}`,
    );
  }

  const resultArray = dpTable.slice();
  tracker.complete({ result: resultArray, targetNumber });

  return tracker.getSteps();
}
