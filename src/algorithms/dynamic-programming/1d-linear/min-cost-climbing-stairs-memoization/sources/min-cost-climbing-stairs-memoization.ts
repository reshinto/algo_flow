// Min Cost Climbing Stairs memoization — top-down recursion with cached subproblems

function minCostClimbingStairsMemoization(costs: number[]): number {
  // @step:initialize
  const memo: Map<number, number> = new Map(); // @step:initialize

  function computeMemo(step: number): number {
    if (step <= 1) return 0; // @step:initialize
    const cached = memo.get(step); // @step:read-cache
    if (cached !== undefined) return cached; // @step:read-cache
    // Recursively compute the minimum cost from each of the two preceding steps, cache to avoid recomputation
    // @step:push-call
    const costFromOne = computeMemo(step - 1) + (costs[step - 1] ?? 0); // @step:compute-cell
    const costFromTwo = computeMemo(step - 2) + (costs[step - 2] ?? 0); // @step:compute-cell
    const result = Math.min(costFromOne, costFromTwo); // @step:compute-cell
    memo.set(step, result); // @step:compute-cell
    // @step:pop-call
    return result; // @step:complete
  }

  return computeMemo(costs.length);
}
