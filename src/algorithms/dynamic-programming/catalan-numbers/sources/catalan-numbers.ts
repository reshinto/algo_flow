// Catalan numbers tabulation — build DP table iteratively from the base case
function catalanNumber(targetIndex: number): number {
  // @step:initialize
  if (targetIndex === 0) return 1; // @step:initialize
  const dpTable = new Array(targetIndex + 1).fill(0); // @step:initialize,fill-table
  dpTable[0] = 1; // @step:fill-table
  // Each entry is the sum C(i) = sum over k from 0 to i-1 of C(k) * C(i-1-k)
  for (let outerIndex = 1; outerIndex <= targetIndex; outerIndex++) {
    // @step:compute-cell
    let runningSum = 0; // @step:compute-cell
    for (let splitIndex = 0; splitIndex < outerIndex; splitIndex++) {
      // @step:read-cache
      runningSum += (dpTable[splitIndex] ?? 0) * (dpTable[outerIndex - 1 - splitIndex] ?? 0); // @step:read-cache,compute-cell
    }
    dpTable[outerIndex] = runningSum; // @step:compute-cell
  }
  return dpTable[targetIndex] ?? 1; // @step:complete
}
