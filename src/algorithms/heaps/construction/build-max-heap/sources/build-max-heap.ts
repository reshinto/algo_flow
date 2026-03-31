// Build Max Heap — convert an arbitrary array into a valid max-heap in-place using sift-down
function buildMaxHeap(inputArray: number[]): number[] {
  const array = [...inputArray]; // @step:initialize
  const size = array.length; // @step:initialize
  // Start from last non-leaf node and sift down each node toward root
  for (let startIdx = Math.floor(size / 2) - 1; startIdx >= 0; startIdx--) {
    // @step:sift-down
    siftDown(array, startIdx, size); // @step:sift-down
  }
  return array; // @step:complete
}

function siftDown(array: number[], startIdx: number, size: number): void {
  let parentIdx = startIdx; // @step:sift-down
  while (true) {
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
    // Swap parent with the largest child
    const temp = array[parentIdx]; // @step:heap-swap
    array[parentIdx] = array[largestIdx]; // @step:heap-swap
    array[largestIdx] = temp; // @step:heap-swap
    parentIdx = largestIdx; // @step:sift-down
  }
}
