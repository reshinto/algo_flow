// Heap Sort — build a max-heap, then repeatedly extract the maximum
function heapSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  function siftDown(arr: number[], rootIndex: number, heapSize: number): void {
    // @step:compare
    let largestIndex = rootIndex; // @step:compare
    const leftChild = 2 * rootIndex + 1; // @step:compare
    const rightChild = 2 * rootIndex + 2; // @step:compare

    if (leftChild < heapSize && arr[leftChild]! > arr[largestIndex]!) {
      // @step:compare
      largestIndex = leftChild; // @step:compare
    }

    if (rightChild < heapSize && arr[rightChild]! > arr[largestIndex]!) {
      // @step:compare
      largestIndex = rightChild; // @step:compare
    }

    if (largestIndex !== rootIndex) {
      // @step:swap
      const temporaryValue = arr[rootIndex]!; // @step:swap
      arr[rootIndex] = arr[largestIndex]!; // @step:swap
      arr[largestIndex] = temporaryValue; // @step:swap

      siftDown(arr, largestIndex, heapSize); // @step:swap
    }
  }

  // Phase 1: Build the max-heap by sifting down from the last internal node
  for (let buildIndex = Math.floor(arrayLength / 2) - 1; buildIndex >= 0; buildIndex--) {
    // @step:build-heap
    siftDown(sortedArray, buildIndex, arrayLength); // @step:build-heap
  }

  // Phase 2: Extract maximum elements one by one
  for (let extractIndex = arrayLength - 1; extractIndex > 0; extractIndex--) {
    // @step:extract
    const temporaryValue = sortedArray[0]!; // @step:extract
    sortedArray[0] = sortedArray[extractIndex]!; // @step:extract
    sortedArray[extractIndex] = temporaryValue; // @step:extract

    // Restore heap property after moving max to its sorted position
    siftDown(sortedArray, 0, extractIndex); // @step:compare

    // The element at extractIndex is now permanently sorted
    // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
