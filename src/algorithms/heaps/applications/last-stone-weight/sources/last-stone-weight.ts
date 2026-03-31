// Last Stone Weight — repeatedly smash the two heaviest stones, return the last remaining weight
function lastStoneWeight(stones: number[]): number {
  const heap = [...stones]; // @step:initialize
  const heapSize = heap.length;

  // Build max-heap using Floyd's algorithm
  for (let startIdx = Math.floor(heapSize / 2) - 1; startIdx >= 0; startIdx--) {
    // @step:sift-down
    let parentIdx = startIdx; // @step:sift-down
    while (true) {
      let largestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < heap.length && heap[leftIdx]! > heap[largestIdx]!) {
        // @step:compare
        largestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < heap.length && heap[rightIdx]! > heap[largestIdx]!) {
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

  function extractMax(arr: number[]): number {
    const maxValue = arr[0]!; // @step:heap-extract
    const lastIdx = arr.length - 1; // @step:heap-extract
    arr[0] = arr[lastIdx]!; // @step:heap-swap
    arr.pop(); // @step:heap-extract
    // Sift down the new root
    let parentIdx = 0; // @step:sift-down
    while (true) {
      let largestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < arr.length && arr[leftIdx]! > arr[largestIdx]!) {
        // @step:compare
        largestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < arr.length && arr[rightIdx]! > arr[largestIdx]!) {
        // @step:compare
        largestIdx = rightIdx; // @step:sift-down
      }
      if (largestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = arr[parentIdx]!; // @step:heap-swap
      arr[parentIdx] = arr[largestIdx]!; // @step:heap-swap
      arr[largestIdx] = swapTemp; // @step:heap-swap
      parentIdx = largestIdx; // @step:sift-down
    }
    return maxValue;
  }

  function insertValue(arr: number[], value: number): void {
    arr.push(value); // @step:heap-insert
    let currentIdx = arr.length - 1; // @step:sift-up
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
      if (arr[parentIdx]! >= arr[currentIdx]!) break; // @step:compare
      const swapTemp = arr[parentIdx]!; // @step:heap-swap
      arr[parentIdx] = arr[currentIdx]!; // @step:heap-swap
      arr[currentIdx] = swapTemp; // @step:heap-swap
      currentIdx = parentIdx; // @step:sift-up
    }
  }

  while (heap.length >= 2) {
    const heaviest = extractMax(heap); // @step:heap-extract
    const secondHeaviest = extractMax(heap); // @step:heap-extract
    if (heaviest !== secondHeaviest) {
      // @step:compare
      insertValue(heap, heaviest - secondHeaviest); // @step:heap-insert
    }
  }

  return heap.length === 0 ? 0 : heap[0]!; // @step:complete
}
