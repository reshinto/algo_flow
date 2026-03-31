// Heap Increase Key — increase the value at a given index in a min-heap, then sift-down
function heapIncreaseKey(inputArray: number[], targetIndex: number, newValue: number): number[] {
  const array = [...inputArray]; // @step:initialize

  // Update the value at targetIndex to the new (larger) value
  array[targetIndex] = newValue; // @step:heap-update

  // Sift down to restore the min-heap property
  siftDown(array, targetIndex, array.length); // @step:sift-down

  return array; // @step:complete
}

function siftDown(array: number[], startIndex: number, size: number): void {
  let parentIndex = startIndex; // @step:sift-down
  while (true) {
    let smallestIndex = parentIndex; // @step:sift-down
    const leftIndex = 2 * parentIndex + 1; // @step:sift-down
    const rightIndex = 2 * parentIndex + 2; // @step:sift-down
    // Find the smallest among parent, left child, and right child
    if (leftIndex < size && array[leftIndex]! < array[smallestIndex]!) {
      // @step:compare
      smallestIndex = leftIndex; // @step:sift-down
    }
    if (rightIndex < size && array[rightIndex]! < array[smallestIndex]!) {
      // @step:compare
      smallestIndex = rightIndex; // @step:sift-down
    }
    if (smallestIndex === parentIndex) break; // @step:sift-down
    // Swap parent with smallest child — parent value is too large, push it down
    const temp = array[parentIndex]!; // @step:heap-swap
    array[parentIndex] = array[smallestIndex]!; // @step:heap-swap
    array[smallestIndex] = temp; // @step:heap-swap
    parentIndex = smallestIndex; // @step:sift-down
  }
}
