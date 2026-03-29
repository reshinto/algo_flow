/** Step generator for Perfect Squares (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PERFECT_SQUARES_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PERFECT_SQUARES!);

interface PerfectSquaresInput {
  targetNumber: number;
}

export function generatePerfectSquaresSteps(input: PerfectSquaresInput): ExecutionStep[] {
  const { targetNumber } = input;
  const tableSize = targetNumber + 1;
  const tracker = new DPTracker(tableSize, PERFECT_SQUARES_LINE_MAP, (index) => `S(${index})`);

  tracker.initialize({ targetNumber, tableSize });

  tracker.fillTable(0, 0, {
    cellIndex: 0,
    value: 0,
    description: "Base case: S(0) = 0 (zero squares needed to sum to zero)",
  });

  for (let cellIndex = 1; cellIndex <= targetNumber; cellIndex++) {
    let minSquares = Infinity;

    for (let squareRoot = 1; squareRoot * squareRoot <= cellIndex; squareRoot++) {
      const prevIndex = cellIndex - squareRoot * squareRoot;
      const squareValue = squareRoot * squareRoot;

      tracker.readCache(prevIndex, {
        cellIndex,
        squareRoot,
        squareValue,
        prevIndex,
        readingLabel: `S(${prevIndex})`,
        formula: `S(${cellIndex}) via ${squareRoot}² = ${squareValue}`,
      });

      const candidate = computePerfectSquares(prevIndex);
      if (candidate + 1 < minSquares) {
        minSquares = candidate + 1;
      }
    }

    const computedValue = computePerfectSquares(cellIndex);
    tracker.computeCell(
      cellIndex,
      computedValue,
      {
        cellIndex,
        value: computedValue,
        formula: `S(${cellIndex}) = ${computedValue}`,
      },
      `Compute S(${cellIndex}) = ${computedValue}`,
    );
  }

  const finalResult = computePerfectSquares(targetNumber);
  tracker.complete({ result: finalResult, targetNumber });

  return tracker.getSteps();
}

function computePerfectSquares(targetNumber: number): number {
  if (targetNumber === 0) return 0;
  const dpTable = new Array<number>(targetNumber + 1).fill(Infinity);
  dpTable[0] = 0;
  for (let cellIndex = 1; cellIndex <= targetNumber; cellIndex++) {
    for (let squareRoot = 1; squareRoot * squareRoot <= cellIndex; squareRoot++) {
      const prevIndex = cellIndex - squareRoot * squareRoot;
      const prevValue = dpTable[prevIndex];
      if (prevValue !== undefined && prevValue + 1 < (dpTable[cellIndex] ?? Infinity)) {
        dpTable[cellIndex] = prevValue + 1;
      }
    }
  }
  return dpTable[targetNumber] ?? 0;
}
