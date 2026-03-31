// Heap Extract Max — remove and return the maximum (root) from a max-heap, then restore heap property
function heapExtractMax(heapArray: number[]): { extractedValue: number; remainingHeap: number[] } {
  const array = [...heapArray]; // @step:initialize
  const extractedValue = array[0]; // @step:heap-extract
  const lastIdx = array.length - 1; // @step:heap-extract
  // Move last element to root and remove the last position
  const temp = array[0]; // @step:heap-swap
  array[0] = array[lastIdx]; // @step:heap-swap
  array[lastIdx] = temp; // @step:heap-swap
  array.pop(); // @step:heap-extract
  // Sift down the new root to restore max-heap property
  const size = array.length;
  let parentIdx = 0; // @step:sift-down
  while (true) {
    // @step:sift-down
    let largestIdx = parentIdx; // @step:sift-down
    const leftIdx = 2 * parentIdx + 1; // @step:sift-down
    const rightIdx = 2 * parentIdx + 2; // @step:sift-down
    // Find the largest among parent, left child, and right child
    if (leftIdx < size && array[leftIdx] > array[largestIdx]) {
      // @step:sift-down
      largestIdx = leftIdx; // @step:sift-down
    }
    if (rightIdx < size && array[rightIdx] > array[largestIdx]) {
      // @step:sift-down
      largestIdx = rightIdx; // @step:sift-down
    }
    if (largestIdx === parentIdx) break; // @step:sift-down
    // Swap parent with largest child
    const swapTemp = array[parentIdx]; // @step:heap-swap
    array[parentIdx] = array[largestIdx]; // @step:heap-swap
    array[largestIdx] = swapTemp; // @step:heap-swap
    parentIdx = largestIdx; // @step:sift-down
  }
  return { extractedValue: extractedValue as number, remainingHeap: array }; // @step:complete
}
