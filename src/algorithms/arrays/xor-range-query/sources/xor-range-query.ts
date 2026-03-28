// XOR Range Query — O(n) build, O(1) per query via prefix XOR difference
function xorRangeQuery(
  inputArray: number[],
  queries: number[][],
): { prefixXor: number[]; queryResults: number[] } {
  const prefixXor: number[] = new Array(inputArray.length + 1).fill(0); // @step:initialize

  // Build prefix XOR array where prefixXor[i] = XOR of inputArray[0..i-1]
  for (let buildIndex = 0; buildIndex < inputArray.length; buildIndex++) {
    // @step:visit
    prefixXor[buildIndex + 1] = prefixXor[buildIndex]! ^ inputArray[buildIndex]!; // @step:visit
  }

  const queryResults: number[] = []; // @step:compare

  // Answer range XOR queries in O(1) each using prefix XOR difference
  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    const currentQuery = queries[queryIndex]!;
    const leftBound = currentQuery[0]!;
    const rightBound = currentQuery[1]!;
    const rangeXor = prefixXor[rightBound + 1]! ^ prefixXor[leftBound]!; // @step:compare
    queryResults.push(rangeXor); // @step:compare
  }

  return { prefixXor: prefixXor.slice(1), queryResults }; // @step:complete
}
