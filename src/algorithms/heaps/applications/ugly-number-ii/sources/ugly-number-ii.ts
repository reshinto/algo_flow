// Ugly Number II — find the nth ugly number (only prime factors 2, 3, 5) using a min-heap
function uglyNumberIi(nthPosition: number): number {
  const heap: number[] = [1]; // @step:initialize
  const seen = new Set<number>([1]); // @step:initialize
  const primeFactors = [2, 3, 5]; // @step:initialize
  let currentUgly = 1; // @step:initialize

  function siftUp(heapArr: number[], idx: number): void {
    let currentIdx = idx; // @step:sift-up
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
      if (heapArr[currentIdx]! < heapArr[parentIdx]!) {
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

  function siftDown(heapArr: number[], heapSize: number, startIdx: number): void {
    let parentIdx = startIdx; // @step:sift-down
    while (true) {
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      let smallestIdx = parentIdx; // @step:sift-down
      if (leftIdx < heapSize && heapArr[leftIdx]! < heapArr[smallestIdx]!) {
        // @step:compare
        smallestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < heapSize && heapArr[rightIdx]! < heapArr[smallestIdx]!) {
        // @step:compare
        smallestIdx = rightIdx; // @step:sift-down
      }
      if (smallestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = heapArr[parentIdx]!; // @step:heap-swap
      heapArr[parentIdx] = heapArr[smallestIdx]!; // @step:heap-swap
      heapArr[smallestIdx] = swapTemp; // @step:heap-swap
      parentIdx = smallestIdx; // @step:sift-down
    }
  }

  for (let iteration = 0; iteration < nthPosition; iteration++) {
    // Extract minimum (root)
    currentUgly = heap[0]!; // @step:heap-extract
    heap[0] = heap[heap.length - 1]!; // @step:heap-extract
    heap.pop(); // @step:heap-extract
    siftDown(heap, heap.length, 0); // @step:sift-down
    // Generate next candidates by multiplying by 2, 3, 5
    for (const factor of primeFactors) {
      const candidate = currentUgly * factor; // @step:heap-insert
      if (!seen.has(candidate)) {
        seen.add(candidate); // @step:heap-insert
        heap.push(candidate); // @step:heap-insert
        siftUp(heap, heap.length - 1); // @step:sift-up
      }
    }
  }

  return currentUgly; // @step:complete
}
