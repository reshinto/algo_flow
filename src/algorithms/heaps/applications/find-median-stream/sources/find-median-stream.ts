// Find Median from Data Stream — maintain running median using two heaps
// maxHeap stores the lower half (root = largest of lower half)
// minHeap stores the upper half (root = smallest of upper half)
function findMedianStream(stream: number[]): number[] {
  const maxHeap: number[] = []; // @step:initialize
  const minHeap: number[] = []; // @step:initialize
  const medians: number[] = []; // @step:initialize

  function siftUpMax(heap: number[], idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2); // @step:sift-up
      if (heap[parentIdx]! >= heap[idx]!) break; // @step:compare
      const temp = heap[parentIdx]!; // @step:heap-swap
      heap[parentIdx] = heap[idx]!; // @step:heap-swap
      heap[idx] = temp; // @step:heap-swap
      idx = parentIdx; // @step:sift-up
    }
  }

  function siftDownMax(heap: number[], startIdx: number): void {
    let parentIdx = startIdx; // @step:sift-down
    const heapSize = heap.length;
    while (true) {
      let largestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < heapSize && heap[leftIdx]! > heap[largestIdx]!) {
        // @step:compare
        largestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < heapSize && heap[rightIdx]! > heap[largestIdx]!) {
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

  function siftUpMin(heap: number[], idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2); // @step:sift-up
      if (heap[parentIdx]! <= heap[idx]!) break; // @step:compare
      const temp = heap[parentIdx]!; // @step:heap-swap
      heap[parentIdx] = heap[idx]!; // @step:heap-swap
      heap[idx] = temp; // @step:heap-swap
      idx = parentIdx; // @step:sift-up
    }
  }

  function siftDownMin(heap: number[], startIdx: number): void {
    let parentIdx = startIdx; // @step:sift-down
    const heapSize = heap.length;
    while (true) {
      let smallestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < heapSize && heap[leftIdx]! < heap[smallestIdx]!) {
        // @step:compare
        smallestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < heapSize && heap[rightIdx]! < heap[smallestIdx]!) {
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

  for (const num of stream) {
    // Insert into appropriate heap
    if (maxHeap.length === 0 || num <= maxHeap[0]!) {
      maxHeap.push(num); // @step:heap-insert
      siftUpMax(maxHeap, maxHeap.length - 1); // @step:sift-up
    } else {
      minHeap.push(num); // @step:heap-insert
      siftUpMin(minHeap, minHeap.length - 1); // @step:sift-up
    }

    // Rebalance: maxHeap can be at most 1 larger than minHeap
    if (maxHeap.length > minHeap.length + 1) {
      // Move root of maxHeap to minHeap
      const extracted = maxHeap[0]!; // @step:heap-extract
      maxHeap[0] = maxHeap[maxHeap.length - 1]!; // @step:heap-extract
      maxHeap.pop(); // @step:heap-extract
      siftDownMax(maxHeap, 0); // @step:sift-down
      minHeap.push(extracted); // @step:heap-insert
      siftUpMin(minHeap, minHeap.length - 1); // @step:sift-up
    } else if (minHeap.length > maxHeap.length) {
      // Move root of minHeap to maxHeap
      const extracted = minHeap[0]!; // @step:heap-extract
      minHeap[0] = minHeap[minHeap.length - 1]!; // @step:heap-extract
      minHeap.pop(); // @step:heap-extract
      siftDownMin(minHeap, 0); // @step:sift-down
      maxHeap.push(extracted); // @step:heap-insert
      siftUpMax(maxHeap, maxHeap.length - 1); // @step:sift-up
    }

    // Compute median
    let median: number;
    if (maxHeap.length === minHeap.length) {
      median = (maxHeap[0]! + minHeap[0]!) / 2; // @step:complete
    } else {
      median = maxHeap[0]!; // @step:complete
    }
    medians.push(median);
  }

  return medians; // @step:complete
}
