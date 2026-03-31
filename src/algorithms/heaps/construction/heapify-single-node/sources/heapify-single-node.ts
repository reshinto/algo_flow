// Heapify Single Node — demonstrate sift-down on a single subtree root to its correct position
function heapifySingleNode(inputArray: number[], targetIndex: number): number[] {
  const array = [...inputArray]; // @step:initialize
  const size = array.length; // @step:initialize
  siftDown(array, targetIndex, size); // @step:sift-down
  return array; // @step:complete
}

function siftDown(array: number[], startIdx: number, size: number): void {
  let parentIdx = startIdx; // @step:sift-down
  while (true) {
    let smallestIdx = parentIdx; // @step:sift-down
    const leftIdx = 2 * parentIdx + 1; // @step:sift-down
    const rightIdx = 2 * parentIdx + 2; // @step:sift-down
    // Find the smallest among parent, left child, and right child
    if (leftIdx < size && array[leftIdx] < array[smallestIdx]) {
      // @step:sift-down
      smallestIdx = leftIdx; // @step:sift-down
    }
    if (rightIdx < size && array[rightIdx] < array[smallestIdx]) {
      // @step:sift-down
      smallestIdx = rightIdx; // @step:sift-down
    }
    if (smallestIdx === parentIdx) break; // @step:sift-down
    // Swap parent with the smallest child
    const temp = array[parentIdx]; // @step:heap-swap
    array[parentIdx] = array[smallestIdx]; // @step:heap-swap
    array[smallestIdx] = temp; // @step:heap-swap
    parentIdx = smallestIdx; // @step:sift-down
  }
}
