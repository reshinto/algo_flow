// Minimum Jumps tabulation — build DP table iteratively from base case
function minimumJumps(jumps: number[]): number {
  // @step:initialize
  const arrayLength = jumps.length; // @step:initialize
  if (arrayLength === 0) return 0; // @step:initialize
  const dpTable = new Array(arrayLength).fill(Infinity); // @step:initialize,fill-table
  dpTable[0] = 0; // @step:fill-table
  // For each position, check all prior positions that can reach it
  for (let targetIndex = 1; targetIndex < arrayLength; targetIndex++) {
    // @step:compute-cell
    for (let sourceIndex = 0; sourceIndex < targetIndex; sourceIndex++) {
      // @step:read-cache
      if (dpTable[sourceIndex] !== Infinity && sourceIndex + jumps[sourceIndex]! >= targetIndex) {
        // @step:read-cache
        dpTable[targetIndex] = Math.min(dpTable[targetIndex]!, dpTable[sourceIndex]! + 1); // @step:compute-cell,read-cache
      }
    }
  }
  return dpTable[arrayLength - 1] === Infinity ? -1 : dpTable[arrayLength - 1]!; // @step:complete
}
