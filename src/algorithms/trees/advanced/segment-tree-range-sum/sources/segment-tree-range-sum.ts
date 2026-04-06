// Segment Tree — build from array then query range sums

function segmentTreeRangeSum(array: number[], queries: [number, number][]): number[] {
  const arrayLength = array.length; // @step:initialize
  const segTree: number[] = new Array(4 * arrayLength).fill(0); // @step:initialize

  function buildNode(nodeIndex: number, low: number, high: number): void {
    if (low === high) {
      segTree[nodeIndex] = array[low] ?? 0; // @step:build-node
      return;
    }
    const mid = Math.floor((low + high) / 2);
    buildNode(2 * nodeIndex, low, mid); // @step:traverse-left
    buildNode(2 * nodeIndex + 1, mid + 1, high); // @step:traverse-right
    segTree[nodeIndex] = (segTree[2 * nodeIndex] ?? 0) + (segTree[2 * nodeIndex + 1] ?? 0); // @step:update-segment
  }

  function queryRange(
    nodeIndex: number,
    low: number,
    high: number,
    qLow: number,
    qHigh: number,
  ): number {
    if (qLow > high || qHigh < low) return 0; // @step:query-range
    if (qLow <= low && high <= qHigh) return segTree[nodeIndex] ?? 0; // @step:query-range
    const mid = Math.floor((low + high) / 2);
    const leftSum = queryRange(2 * nodeIndex, low, mid, qLow, qHigh); // @step:traverse-left
    const rightSum = queryRange(2 * nodeIndex + 1, mid + 1, high, qLow, qHigh); // @step:traverse-right
    return leftSum + rightSum; // @step:query-range
  }

  buildNode(1, 0, arrayLength - 1); // @step:build-node

  const results: number[] = [];
  for (const [qLow, qHigh] of queries) {
    results.push(queryRange(1, 0, arrayLength - 1, qLow, qHigh)); // @step:query-range
  }
  return results; // @step:complete
}
