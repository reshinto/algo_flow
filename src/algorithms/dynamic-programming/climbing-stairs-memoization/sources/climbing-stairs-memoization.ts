// Climbing stairs memoization — top-down recursion with cached subproblems

function climbingStairsMemoization(
  numberOfStairs: number,
  memo: Map<number, number> = new Map(),
): number {
  // @step:initialize
  if (numberOfStairs <= 1) return 1; // @step:initialize
  const cached = memo.get(numberOfStairs); // @step:read-cache
  if (cached !== undefined) return cached; // @step:read-cache
  // Recursively count distinct ways from the previous two steps, cache to avoid recomputation
  // @step:push-call
  const result =
    climbingStairsMemoization(numberOfStairs - 1, memo) + // @step:compute-cell
    climbingStairsMemoization(numberOfStairs - 2, memo); // @step:compute-cell
  memo.set(numberOfStairs, result); // @step:compute-cell
  // @step:pop-call
  return result; // @step:complete
}
