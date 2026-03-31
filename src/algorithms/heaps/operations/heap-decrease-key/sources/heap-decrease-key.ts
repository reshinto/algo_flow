// Heap Decrease Key — decrease the value at a given index in a min-heap, then sift-up
function heapDecreaseKey(inputArray: number[], targetIndex: number, newValue: number): number[] {
  const array = [...inputArray]; // @step:initialize

  // Update the value at targetIndex to the new (smaller) value
  array[targetIndex] = newValue; // @step:heap-update

  // Sift up to restore the min-heap property
  siftUp(array, targetIndex); // @step:sift-up

  return array; // @step:complete
}

function siftUp(array: number[], startIndex: number): void {
  let currentIndex = startIndex; // @step:sift-up
  while (currentIndex > 0) {
    const parentIndex = Math.floor((currentIndex - 1) / 2); // @step:sift-up
    if (array[currentIndex]! >= array[parentIndex]!) break; // @step:compare
    // Swap current with parent — current value is smaller, move it up
    const temp = array[currentIndex]!; // @step:heap-swap
    array[currentIndex] = array[parentIndex]!; // @step:heap-swap
    array[parentIndex] = temp; // @step:heap-swap
    currentIndex = parentIndex; // @step:sift-up
  }
}
