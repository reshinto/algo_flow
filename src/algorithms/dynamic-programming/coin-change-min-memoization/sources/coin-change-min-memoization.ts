// Coin Change Minimum — top-down memoization: find the fewest coins summing to target amount

function coinChangeMinMemoization(amount: number, coins: number[]): number {
  // @step:initialize
  const memo = new Map<number, number>(); // @step:initialize

  function minCoins(remaining: number): number {
    if (remaining === 0) {
      // @step:fill-table
      memo.set(0, 0); // @step:fill-table
      return 0; // @step:fill-table
    }
    if (remaining < 0) return -1; // @step:fill-table
    if (memo.has(remaining)) return memo.get(remaining)!; // @step:read-cache
    // @step:push-call
    let bestResult = -1;
    for (const coin of coins) {
      // @step:compute-cell
      const subResult = minCoins(remaining - coin); // @step:compute-cell
      if (subResult >= 0) {
        // @step:compute-cell
        const candidate = subResult + 1; // @step:compute-cell
        if (bestResult === -1 || candidate < bestResult) {
          // @step:compute-cell
          bestResult = candidate; // @step:compute-cell
        }
      }
    }
    memo.set(remaining, bestResult); // @step:compute-cell
    return bestResult; // @step:pop-call
  }

  return minCoins(amount); // @step:complete
}
