// Kth Smallest Element — find the kth smallest element using a max-heap of size k
function kthSmallestElement(array: number[], kValue: number): number {
  const maxHeap: number[] = []; // @step:initialize

  function siftUp(heap: number[], idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2); // @step:sift-up
      if (heap[parentIdx]! >= heap[idx]!) break; // @step:compare
      const temp = heap[parentIdx]!; // @step:heap-swap
      heap[parentIdx] = heap[idx]!; // @step:heap-swap
      heap[idx] = temp; // @step:heap-swap
      idx = parentIdx; // @step:sift-up
    }
  }

  function siftDown(heap: number[], startIdx: number, size: number): void {
    let parentIdx = startIdx; // @step:sift-down
    while (true) {
      let largestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < size && heap[leftIdx]! > heap[largestIdx]!) {
        // @step:compare
        largestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < size && heap[rightIdx]! > heap[largestIdx]!) {
        // @step:compare
        largestIdx = rightIdx; // @step:sift-down
      }
      if (largestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = heap[parentIdx]!; // @step:heap-swap
      heap[parentIdx] = heap[largestIdx]!; // @step:heap-swap
      heap[largestIdx] = swapTemp; // @step:heap-swap
      parentIdx = largestIdx; // @step:sift-down
    }
  }

  for (const element of array) {
    if (maxHeap.length < kValue) {
      maxHeap.push(element); // @step:heap-insert
      siftUp(maxHeap, maxHeap.length - 1); // @step:sift-up
    } else if (element < maxHeap[0]!) {
      // @step:compare
      maxHeap[0] = element; // @step:heap-extract
      siftDown(maxHeap, 0, maxHeap.length); // @step:sift-down
    }
  }

  return maxHeap[0]!; // @step:complete
}
