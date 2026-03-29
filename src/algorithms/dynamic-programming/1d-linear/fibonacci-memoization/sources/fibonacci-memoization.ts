// Fibonacci memoization — top-down recursion with cached subproblems

function fibonacciMemoization(targetIndex: number, memo: Map<number, number> = new Map()): number {
  // @step:initialize
  if (targetIndex <= 1) return targetIndex; // @step:initialize
  const cached = memo.get(targetIndex); // @step:read-cache
  if (cached !== undefined) return cached; // @step:read-cache
  // Recursively compute subproblems and cache the result to avoid recomputation
  const result =
    fibonacciMemoization(targetIndex - 1, memo) + // @step:compute-cell
    fibonacciMemoization(targetIndex - 2, memo); // @step:compute-cell
  memo.set(targetIndex, result); // @step:compute-cell
  return result; // @step:complete
}
