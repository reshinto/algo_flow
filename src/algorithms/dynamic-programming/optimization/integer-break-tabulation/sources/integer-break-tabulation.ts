// Integer Break tabulation — build DP table iteratively from base cases
function integerBreakTabulation(targetNumber: number): number {
  // @step:initialize
  const dpTable = new Array(targetNumber + 1).fill(0); // @step:initialize
  dpTable[1] = 1; // @step:fill-table
  // For each i, try every split j + (i - j) and track the best product
  for (let splitIndex = 2; splitIndex <= targetNumber; splitIndex++) {
    // @step:compute-cell
    for (let partIndex = 1; partIndex < splitIndex; partIndex++) {
      // @step:compute-cell,read-cache
      const keepSplit = partIndex * (splitIndex - partIndex); // @step:compute-cell
      const useDp = partIndex * dpTable[splitIndex - partIndex]!; // @step:read-cache,compute-cell
      dpTable[splitIndex] = Math.max(dpTable[splitIndex]!, keepSplit, useDp); // @step:compute-cell
    }
  }
  return dpTable[targetNumber]!; // @step:complete
}
