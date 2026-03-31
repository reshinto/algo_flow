// Kth Largest Element — find the kth largest element using a min-heap of size k
function kthLargestElement(array: number[], kValue: number): number {
  const minHeap: number[] = []; // @step:initialize

  function siftUp(heap: number[], idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2); // @step:sift-up
      if (heap[parentIdx]! <= heap[idx]!) break; // @step:compare
      const temp = heap[parentIdx]!; // @step:heap-swap
      heap[parentIdx] = heap[idx]!; // @step:heap-swap
      heap[idx] = temp; // @step:heap-swap
      idx = parentIdx; // @step:sift-up
    }
  }

  function siftDown(heap: number[], startIdx: number, size: number): void {
    let parentIdx = startIdx; // @step:sift-down
    while (true) {
      let smallestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < size && heap[leftIdx]! < heap[smallestIdx]!) {
        // @step:compare
        smallestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < size && heap[rightIdx]! < heap[smallestIdx]!) {
        // @step:compare
        smallestIdx = rightIdx; // @step:sift-down
      }
      if (smallestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = heap[parentIdx]!; // @step:heap-swap
      heap[parentIdx] = heap[smallestIdx]!; // @step:heap-swap
      heap[smallestIdx] = swapTemp; // @step:heap-swap
      parentIdx = smallestIdx; // @step:sift-down
    }
  }

  for (const element of array) {
    if (minHeap.length < kValue) {
      minHeap.push(element); // @step:heap-insert
      siftUp(minHeap, minHeap.length - 1); // @step:sift-up
    } else if (element > minHeap[0]!) {
      // @step:compare
      minHeap[0] = element; // @step:heap-extract
      siftDown(minHeap, 0, minHeap.length); // @step:sift-down
    }
  }

  return minHeap[0]!; // @step:complete
}
