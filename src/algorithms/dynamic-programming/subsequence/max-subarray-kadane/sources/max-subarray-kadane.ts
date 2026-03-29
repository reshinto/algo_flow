// Maximum Subarray Kadane — build DP table where dp[i] = max subarray sum ending at index i
function maxSubarrayKadane(array: number[]): number {
  // @step:initialize
  if (array.length === 0) return 0; // @step:initialize
  const dpTable = new Array(array.length).fill(0); // @step:initialize,fill-table
  dpTable[0] = array[0]; // @step:fill-table
  let maxSum = dpTable[0]!; // @step:fill-table
  // Each entry: extend the previous subarray or start fresh at current element
  for (let elementIndex = 1; elementIndex < array.length; elementIndex++) {
    // @step:compute-cell
    dpTable[elementIndex] = Math.max(
      array[elementIndex]!,
      dpTable[elementIndex - 1]! + array[elementIndex]!,
    ); // @step:compute-cell,read-cache
    if (dpTable[elementIndex]! > maxSum) {
      // @step:compute-cell
      maxSum = dpTable[elementIndex]!; // @step:compute-cell
    }
  }
  return maxSum; // @step:complete
}
