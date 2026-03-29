// Rod Cutting (Tabulation) — find maximum revenue from cutting a rod of length n
function rodCutting(prices: number[]): number {
  // @step:initialize
  const rodLength = prices.length; // @step:initialize
  const dpTable = new Array(rodLength + 1).fill(0); // @step:initialize,fill-table
  // dp[0] = 0 (base case: zero revenue for zero-length rod)
  for (let currentLength = 1; currentLength <= rodLength; currentLength++) {
    // @step:compute-cell
    for (let cutLength = 1; cutLength <= currentLength; cutLength++) {
      // @step:read-cache
      const remainder = currentLength - cutLength; // @step:read-cache
      const candidate = (prices[cutLength - 1] ?? 0) + (dpTable[remainder] ?? 0); // @step:read-cache
      if (candidate > dpTable[currentLength]) {
        dpTable[currentLength] = candidate; // @step:compute-cell
      }
    }
  }
  return dpTable[rodLength] ?? 0; // @step:complete
}
