// Fibonacci tabulation — build DP table iteratively from base cases
function fibonacciTabulation(targetIndex: number): number {
  // @step:initialize
  if (targetIndex <= 1) return targetIndex; // @step:initialize
  const dpTable = new Array(targetIndex + 1).fill(0); // @step:initialize,fill-table
  dpTable[1] = 1; // @step:fill-table
  // Each entry is the sum of the two preceding entries
  for (let currentIndex = 2; currentIndex <= targetIndex; currentIndex++) {
    // @step:compute-cell
    dpTable[currentIndex] = dpTable[currentIndex - 1] + dpTable[currentIndex - 2]; // @step:compute-cell,read-cache
  }
  return dpTable[targetIndex]; // @step:complete
}
