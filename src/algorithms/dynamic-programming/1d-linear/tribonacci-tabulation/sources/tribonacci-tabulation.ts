// Tribonacci tabulation — build DP table iteratively from three base cases
function tribonacciTabulation(targetIndex: number): number {
  // @step:initialize
  if (targetIndex === 0) return 0; // @step:initialize
  if (targetIndex <= 2) return 1; // @step:initialize
  const dpTable = new Array(targetIndex + 1).fill(0); // @step:initialize,fill-table
  dpTable[1] = 1; // @step:fill-table
  dpTable[2] = 1; // @step:fill-table
  // Each entry is the sum of the three preceding entries
  for (let currentIndex = 3; currentIndex <= targetIndex; currentIndex++) {
    // @step:compute-cell
    dpTable[currentIndex] =
      dpTable[currentIndex - 1] + dpTable[currentIndex - 2] + dpTable[currentIndex - 3]; // @step:compute-cell,read-cache
  }
  return dpTable[targetIndex]; // @step:complete
}
