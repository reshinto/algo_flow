// Heap Delete Arbitrary — remove a node at any index from a min-heap in O(log n)
function heapDeleteArbitrary(inputArray: number[], targetIndex: number): number[] {
  const array = [...inputArray]; // @step:initialize
  const lastIndex = array.length - 1; // @step:initialize

  // Replace target with the last element, then shrink the heap
  array[targetIndex] = array[lastIndex]!; // @step:heap-extract
  array.pop(); // @step:heap-extract

  if (targetIndex >= array.length) return array; // @step:complete

  const parentIndex = Math.floor((targetIndex - 1) / 2); // @step:sift-up

  // If new value is smaller than its parent, sift up; otherwise sift down
  if (targetIndex > 0 && array[targetIndex]! < array[parentIndex]!) {
    // @step:sift-up
    siftUp(array, targetIndex); // @step:sift-up
  } else {
    siftDown(array, targetIndex, array.length); // @step:sift-down
  }

  return array; // @step:complete
}

function siftUp(array: number[], startIndex: number): void {
  let currentIndex = startIndex; // @step:sift-up
  while (currentIndex > 0) {
    const parentIndex = Math.floor((currentIndex - 1) / 2); // @step:sift-up
    if (array[currentIndex]! >= array[parentIndex]!) break; // @step:compare
    // Swap current with parent
    const temp = array[currentIndex]!; // @step:heap-swap
    array[currentIndex] = array[parentIndex]!; // @step:heap-swap
    array[parentIndex] = temp; // @step:heap-swap
    currentIndex = parentIndex; // @step:sift-up
  }
}

function siftDown(array: number[], startIndex: number, size: number): void {
  let parentIndex = startIndex; // @step:sift-down
  while (true) {
    let smallestIndex = parentIndex; // @step:sift-down
    const leftIndex = 2 * parentIndex + 1; // @step:sift-down
    const rightIndex = 2 * parentIndex + 2; // @step:sift-down
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
