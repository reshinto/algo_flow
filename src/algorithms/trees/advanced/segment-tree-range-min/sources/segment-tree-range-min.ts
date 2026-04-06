// Segment Tree — build from array then query range minimums

function segmentTreeRangeMin(array: number[], queries: [number, number][]): number[] {
  const arrayLength = array.length; // @step:initialize
  const segTree: number[] = new Array(4 * arrayLength).fill(Infinity); // @step:initialize

  function buildNode(nodeIndex: number, low: number, high: number): void {
    if (low === high) {
      segTree[nodeIndex] = array[low] ?? Infinity; // @step:build-node
      return;
    }
    const mid = Math.floor((low + high) / 2);
    buildNode(2 * nodeIndex, low, mid); // @step:traverse-left
    buildNode(2 * nodeIndex + 1, mid + 1, high); // @step:traverse-right
    segTree[nodeIndex] = Math.min(
      segTree[2 * nodeIndex] ?? Infinity,
      segTree[2 * nodeIndex + 1] ?? Infinity,
    ); // @step:update-segment
  }

  function queryMin(
    nodeIndex: number,
    low: number,
    high: number,
    qLow: number,
    qHigh: number,
  ): number {
    if (qLow > high || qHigh < low) return Infinity; // @step:query-range
    if (qLow <= low && high <= qHigh) return segTree[nodeIndex] ?? Infinity; // @step:query-range
    const mid = Math.floor((low + high) / 2);
    const leftMin = queryMin(2 * nodeIndex, low, mid, qLow, qHigh); // @step:traverse-left
    const rightMin = queryMin(2 * nodeIndex + 1, mid + 1, high, qLow, qHigh); // @step:traverse-right
    return Math.min(leftMin, rightMin); // @step:query-range
  }

  buildNode(1, 0, arrayLength - 1); // @step:build-node

  const results: number[] = [];
  for (const [qLow, qHigh] of queries) {
    results.push(queryMin(1, 0, arrayLength - 1, qLow, qHigh)); // @step:query-range
  }
  return results; // @step:complete
}
