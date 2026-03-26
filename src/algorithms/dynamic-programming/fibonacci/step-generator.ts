import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import type { LineMap } from "@/trackers";

/*
 * Line mapping: step type → source file line numbers per language.
 *
 * Fibonacci tabulation builds the DP table iteratively from base cases
 * (F(0)=0, F(1)=1) to the target index. Each cell is the sum of the
 * two preceding cells, giving O(n) time and O(n) space.
 */
const FIBONACCI_LINE_MAP: LineMap = {
  /* Declare function, handle base case, allocate table */
  initialize: {
    typescript: [1, 2, 3],
    python: [1, 2, 3],
    java: [2, 3],
  },
  /* Seed the table: dpTable[0]=0, dpTable[1]=1 */
  "fill-table": {
    typescript: [3, 4],
    python: [4, 5],
    java: [4, 5],
  },
  /* Read previously computed values from the table */
  "read-cache": {
    typescript: [6],
    python: [7],
    java: [7],
  },
  /* Compute current cell as sum of two predecessors */
  "compute-cell": {
    typescript: [5, 6],
    python: [6, 7],
    java: [6, 7],
  },
  /* Return the final Fibonacci number */
  complete: {
    typescript: [8],
    python: [8],
    java: [9],
  },
};

interface FibonacciInput {
  targetIndex: number;
}

export function generateFibonacciSteps(input: FibonacciInput): ExecutionStep[] {
  const { targetIndex } = input;
  const tableSize = targetIndex + 1;

  const tracker = new DPTracker(tableSize, FIBONACCI_LINE_MAP);

  tracker.initialize({
    targetIndex,
    tableSize,
  });

  /* Fill base cases */
  tracker.fillTable(0, 0, {
    currentIndex: 0,
    value: 0,
    description: "Base case: F(0) = 0",
  });

  if (targetIndex >= 1) {
    tracker.fillTable(1, 1, {
      currentIndex: 1,
      value: 1,
      description: "Base case: F(1) = 1",
    });
  }

  /* Fill remaining cells using tabulation */
  for (let currentIndex = 2; currentIndex <= targetIndex; currentIndex++) {
    const previousValue1 = currentIndex - 1;
    const previousValue2 = currentIndex - 2;

    tracker.readCache(previousValue1, {
      currentIndex,
      readingIndex: previousValue1,
    });

    tracker.readCache(previousValue2, {
      currentIndex,
      readingIndex: previousValue2,
    });

    /* Compute: since we track values in the DPTracker, we need to compute manually too */
    const valueMinus1 = currentIndex <= 1 ? currentIndex : computeFib(currentIndex - 1);
    const valueMinus2 = currentIndex <= 2 ? currentIndex - 2 : computeFib(currentIndex - 2);
    const computedValue = valueMinus1 + valueMinus2;

    tracker.computeCell(currentIndex, computedValue, {
      currentIndex,
      formula: `F(${currentIndex}) = F(${previousValue1}) + F(${previousValue2})`,
      value: computedValue,
    });
  }

  const finalResult = targetIndex <= 1 ? targetIndex : computeFib(targetIndex);
  tracker.complete({
    result: finalResult,
    targetIndex,
  });

  return tracker.getSteps();
}

function computeFib(targetIndex: number): number {
  if (targetIndex <= 1) return targetIndex;
  const dpTable = new Array(targetIndex + 1).fill(0);
  dpTable[1] = 1;
  for (let currentIndex = 2; currentIndex <= targetIndex; currentIndex++) {
    dpTable[currentIndex] = dpTable[currentIndex - 1] + dpTable[currentIndex - 2];
  }
  return dpTable[targetIndex];
}
