// Partition Equal Subset Sum (Tabulation) — determine if array can be split into two equal-sum subsets
function partitionEqualSubset(numbers: number[]): boolean {
  // @step:initialize
  const totalSum = numbers.reduce((accumulator, value) => accumulator + value, 0); // @step:initialize
  if (totalSum % 2 !== 0) return false; // @step:initialize
  const target = totalSum / 2; // @step:initialize
  const tableSize = target + 1; // @step:initialize
  const dpTable = new Array<number>(tableSize).fill(0); // @step:initialize,fill-table
  dpTable[0] = 1; // @step:fill-table
  // For each number, iterate right-to-left to prevent using it more than once
  for (const currentNumber of numbers) {
    // @step:compute-cell
    for (let sumIndex = target; sumIndex >= currentNumber; sumIndex--) {
      if (dpTable[sumIndex - currentNumber] === 1) {
        // @step:read-cache
        dpTable[sumIndex] = 1; // @step:compute-cell
      }
    }
  }
  return dpTable[target] === 1; // @step:complete
}
