// LIS tabulation — O(n^2) bottom-up DP for longest increasing subsequence length
function lisLength(sequence: number[]): number {
  // @step:initialize
  const sequenceLength = sequence.length; // @step:initialize
  if (sequenceLength === 0) return 0; // @step:initialize
  const dpTable = new Array(sequenceLength).fill(1); // @step:initialize,fill-table
  // Each element is a subsequence of length 1
  let maxLength = 1; // @step:fill-table
  // For each index, scan all previous indices
  for (let outerIndex = 1; outerIndex < sequenceLength; outerIndex++) {
    // @step:compute-cell
    for (let innerIndex = 0; innerIndex < outerIndex; innerIndex++) {
      // @step:read-cache
      if (sequence[innerIndex] < sequence[outerIndex]) {
        // @step:read-cache
        dpTable[outerIndex] = Math.max(dpTable[outerIndex], dpTable[innerIndex] + 1); // @step:compute-cell,read-cache
      }
    }
    if (dpTable[outerIndex] > maxLength) {
      // @step:compute-cell
      maxLength = dpTable[outerIndex]; // @step:compute-cell
    }
  }
  return maxLength; // @step:complete
}
