/**
 * Fibonacci implementations used by the algorithm executor.
 * Both tabulation and memoization variants are exported so the step
 * generator and tests can exercise either approach.
 */

/**
 * Computes the Fibonacci number at targetIndex using bottom-up tabulation.
 * Builds the full DP table from base cases F(0)=0, F(1)=1 upward.
 */
export function fibonacciTabulation(targetIndex: number): number {
  if (targetIndex <= 1) return targetIndex;
  const dpTable = new Array(targetIndex + 1).fill(0);
  dpTable[1] = 1;
  // Each entry depends only on the two preceding entries.
  for (let currentIndex = 2; currentIndex <= targetIndex; currentIndex++) {
    dpTable[currentIndex] = dpTable[currentIndex - 1] + dpTable[currentIndex - 2];
  }
  return dpTable[targetIndex];
}

/**
 * Computes the Fibonacci number at targetIndex using top-down memoization.
 * Recursively solves subproblems and caches results to avoid redundant work.
 */
export function fibonacciMemoization(
  targetIndex: number,
  memo: Map<number, number> = new Map(),
): number {
  if (targetIndex <= 1) return targetIndex;
  if (memo.has(targetIndex)) return memo.get(targetIndex)!;

  const result =
    fibonacciMemoization(targetIndex - 1, memo) + fibonacciMemoization(targetIndex - 2, memo);
  memo.set(targetIndex, result);
  return result;
}
