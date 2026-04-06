// Binary Indexed Tree (Fenwick Tree) — prefix sum queries and point updates

function binaryIndexedTree(array: number[], queries: [number, number][]): number[] {
  const arrayLength = array.length; // @step:initialize
  const bit: number[] = new Array(arrayLength + 1).fill(0); // @step:initialize

  // Build the BIT by inserting each element
  function update(bitIndex: number, delta: number): void {
    while (bitIndex <= arrayLength) {
      bit[bitIndex] = (bit[bitIndex] ?? 0) + delta; // @step:update-segment
      bitIndex += bitIndex & -bitIndex; // move to parent
    }
  }

  function prefixSum(bitIndex: number): number {
    let totalSum = 0;
    while (bitIndex > 0) {
      totalSum += bit[bitIndex] ?? 0; // @step:compute-prefix
      bitIndex -= bitIndex & -bitIndex; // move to responsible ancestor
    }
    return totalSum; // @step:compute-prefix
  }

  // Build BIT from array (1-indexed)
  for (let pos = 0; pos < arrayLength; pos++) {
    update(pos + 1, array[pos] ?? 0); // @step:update-segment
  }

  const results: number[] = [];
  for (const [queryLow, queryHigh] of queries) {
    // Range sum [queryLow, queryHigh] = prefix[queryHigh+1] - prefix[queryLow]
    const rangeSumResult = prefixSum(queryHigh + 1) - prefixSum(queryLow); // @step:query-range
    results.push(rangeSumResult);
  }
  return results; // @step:complete
}
