// Heap Sort Visualization — sort using max-heap tree perspective: build heap, then extract max repeatedly
function heapSortVisualization(inputArray: number[]): number[] {
  const array = [...inputArray]; // @step:initialize
  const arrayLength = array.length; // @step:initialize

  // Phase 1: Build max-heap (bottom-up sift-down from last non-leaf)
  function siftDown(heapArr: number[], heapSize: number, rootIdx: number): void {
    let parentIdx = rootIdx; // @step:sift-down
    while (true) {
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      let largestIdx = parentIdx; // @step:sift-down
      if (leftIdx < heapSize && heapArr[leftIdx]! > heapArr[largestIdx]!) {
        // @step:compare
        largestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < heapSize && heapArr[rightIdx]! > heapArr[largestIdx]!) {
        // @step:compare
        largestIdx = rightIdx; // @step:sift-down
      }
      if (largestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = heapArr[parentIdx]!; // @step:heap-swap
      heapArr[parentIdx] = heapArr[largestIdx]!; // @step:heap-swap
      heapArr[largestIdx] = swapTemp; // @step:heap-swap
      parentIdx = largestIdx; // @step:sift-down
    }
  }

  // Build max-heap in-place
  const lastNonLeaf = Math.floor(arrayLength / 2) - 1;
  for (let nodeIdx = lastNonLeaf; nodeIdx >= 0; nodeIdx--) {
    siftDown(array, arrayLength, nodeIdx); // @step:sift-down
  }

  // Phase 2: Extract elements one by one — swap root with last unsorted, shrink heap, sift-down
  for (let heapEnd = arrayLength - 1; heapEnd > 0; heapEnd--) {
    // Swap root (max) with last element in current heap
    const swapTemp = array[0]!; // @step:heap-swap
    array[0] = array[heapEnd]!; // @step:heap-swap
    array[heapEnd] = swapTemp; // @step:heap-swap
    // Mark extracted element as settled in sorted position
    siftDown(array, heapEnd, 0); // @step:sift-down
  }

  return array; // @step:complete
}
