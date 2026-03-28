// Prefix Sum — O(n) build, O(1) per query via prefix difference
function prefixSum(
  inputArray: number[],
  queries: number[][],
): { prefixArray: number[]; queryResults: number[] } {
  const prefixArray: number[] = new Array(inputArray.length + 1).fill(0); // @step:initialize

  // Build prefix sum array where prefixArray[i] = sum of inputArray[0..i-1]
  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    // @step:visit
    prefixArray[scanIndex + 1] = prefixArray[scanIndex]! + inputArray[scanIndex]!; // @step:visit
  }

  const queryResults: number[] = []; // @step:compare

  // Answer range queries in O(1) each using prefix difference
  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    const currentQuery = queries[queryIndex]!;
    const leftBound = currentQuery[0]!;
    const rightBound = currentQuery[1]!;
    const rangeSum = prefixArray[rightBound + 1]! - prefixArray[leftBound]!; // @step:compare
    queryResults.push(rangeSum); // @step:compare
  }

  return { prefixArray: prefixArray.slice(1), queryResults }; // @step:complete
}
