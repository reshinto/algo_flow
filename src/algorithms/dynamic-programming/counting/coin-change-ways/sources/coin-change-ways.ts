// Coin Change Ways (Tabulation) — count distinct ways to make each amount using given coins
function coinChangeWays(amount: number, coins: number[]): number {
  // @step:initialize
  const dpTable = new Array(amount + 1).fill(0); // @step:initialize,fill-table
  dpTable[0] = 1; // @step:fill-table
  // Outer loop over coins — ordering ensures we count combinations, not permutations
  for (const coin of coins) {
    // @step:compute-cell
    for (let currentAmount = coin; currentAmount <= amount; currentAmount++) {
      // @step:compute-cell
      dpTable[currentAmount] = dpTable[currentAmount] + dpTable[currentAmount - coin]; // @step:compute-cell,read-cache
    }
  }
  return dpTable[amount]; // @step:complete
}
