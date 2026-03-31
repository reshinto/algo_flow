// K Closest Points to Origin — use a max-heap of size k (by distance²) to find the k nearest points
function kClosestPoints(points: [number, number][], kValue: number): [number, number][] {
  // Build a max-heap of [distance², point] pairs capped at size k
  const heap: [number, [number, number]][] = []; // @step:initialize

  function distanceSquared(point: [number, number]): number {
    return point[0] * point[0] + point[1] * point[1]; // @step:initialize
  }

  function siftUp(heapArr: [number, [number, number]][], idx: number): void {
    let currentIdx = idx; // @step:sift-up
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
      if (heapArr[currentIdx]![0] > heapArr[parentIdx]![0]) {
        // @step:compare
        const temp = heapArr[currentIdx]!; // @step:heap-swap
        heapArr[currentIdx] = heapArr[parentIdx]!; // @step:heap-swap
        heapArr[parentIdx] = temp; // @step:heap-swap
        currentIdx = parentIdx; // @step:sift-up
      } else {
        break; // @step:compare
      }
    }
  }

  function siftDown(
    heapArr: [number, [number, number]][],
    heapSize: number,
    startIdx: number,
  ): void {
    let parentIdx = startIdx; // @step:sift-down
    while (true) {
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      let largestIdx = parentIdx; // @step:sift-down
      if (leftIdx < heapSize && heapArr[leftIdx]![0] > heapArr[largestIdx]![0]) {
        // @step:compare
        largestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < heapSize && heapArr[rightIdx]![0] > heapArr[largestIdx]![0]) {
        // @step:compare
        largestIdx = rightIdx; // @step:sift-down
      }
      if (largestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = heapArr[parentIdx]!; // @step:heap-swap
      heapArr[parentIdx] = heapArr[largestIdx]!; // @step:heap-swap
      heapArr[largestIdx] = swapTemp; // @step:heap-swap
      parentIdx = largestIdx; // @step:sift-down
    }
  }

  for (const point of points) {
    const dist = distanceSquared(point); // @step:heap-insert
    if (heap.length < kValue) {
      heap.push([dist, point]); // @step:heap-insert
      siftUp(heap, heap.length - 1); // @step:sift-up
    } else if (heap[0] !== undefined && dist < heap[0][0]) {
      // Current point is closer than the farthest in heap — replace root
      heap[0] = [dist, point]; // @step:heap-extract
      siftDown(heap, heap.length, 0); // @step:sift-down
    }
  }

  return heap.map((entry) => entry[1]) as [number, number][]; // @step:complete
}
