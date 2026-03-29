// Coin Change (Min Coins) tabulation — find minimum coins needed to make amount
function coinChangeMinTabulation(amount: number, coins: number[]): number {
  // @step:initialize
  const tableSize = amount + 1; // @step:initialize
  const dpTable = new Array(tableSize).fill(Infinity); // @step:initialize,fill-table
  dpTable[0] = 0; // @step:fill-table
  // For each amount, try every coin and take the minimum
  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
    // @step:compute-cell
    for (const coin of coins) {
      if (currentAmount >= coin && dpTable[currentAmount - coin] !== undefined) {
        // @step:read-cache
        const candidate = dpTable[currentAmount - coin] + 1; // @step:read-cache
        if (candidate < dpTable[currentAmount]) {
          dpTable[currentAmount] = candidate; // @step:compute-cell
        }
      }
    }
  }
  return dpTable[amount] === Infinity ? -1 : dpTable[amount]; // @step:complete
}
