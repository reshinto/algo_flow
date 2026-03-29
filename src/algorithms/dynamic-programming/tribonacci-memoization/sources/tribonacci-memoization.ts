// Tribonacci memoization — top-down recursion with cached subproblems

function tribonacciMemoization(targetIndex: number, memo: Map<number, number> = new Map()): number {
  // @step:initialize
  if (targetIndex === 0) return 0; // @step:initialize
  if (targetIndex <= 2) return 1; // @step:initialize
  const cached = memo.get(targetIndex); // @step:read-cache
  if (cached !== undefined) return cached; // @step:read-cache
  // Recursively compute the three preceding subproblems and cache the result
  const result =
    tribonacciMemoization(targetIndex - 1, memo) + // @step:compute-cell
    tribonacciMemoization(targetIndex - 2, memo) + // @step:compute-cell
    tribonacciMemoization(targetIndex - 3, memo); // @step:compute-cell
  memo.set(targetIndex, result); // @step:compute-cell
  return result; // @step:complete
}
