// Heap Replace Root — replace the root with a new value and sift-down (more efficient than extract+insert)
function heapReplaceRoot(
  inputArray: number[],
  newValue: number,
): { replacedValue: number; newHeap: number[] } {
  const array = [...inputArray]; // @step:initialize
  const replacedValue = array[0]!; // @step:initialize

  // Place the new value at the root
  array[0] = newValue; // @step:heap-update

  // Sift down to restore the min-heap property
  siftDown(array, 0, array.length); // @step:sift-down

  return { replacedValue, newHeap: array }; // @step:complete
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
    // Swap parent with smallest child
    const temp = array[parentIndex]!; // @step:heap-swap
    array[parentIndex] = array[smallestIndex]!; // @step:heap-swap
    array[smallestIndex] = temp; // @step:heap-swap
    parentIndex = smallestIndex; // @step:sift-down
  }
}
