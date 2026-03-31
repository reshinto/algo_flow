// Sort Nearly Sorted — sort an array where each element is at most k positions from its sorted position
function sortNearlySorted(array: number[], kValue: number): number[] {
  const result: number[] = []; // @step:initialize
  const heap: number[] = []; // @step:initialize

  function siftUp(arr: number[], currentIdx: number): void {
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
      if (arr[parentIdx]! <= arr[currentIdx]!) break; // @step:compare
      const swapTemp = arr[parentIdx]!; // @step:heap-swap
      arr[parentIdx] = arr[currentIdx]!; // @step:heap-swap
      arr[currentIdx] = swapTemp; // @step:heap-swap
      currentIdx = parentIdx; // @step:sift-up
    }
  }

  function siftDown(arr: number[], parentIdx: number): void {
    while (true) {
      let smallestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < arr.length && arr[leftIdx]! < arr[smallestIdx]!) {
        // @step:compare
        smallestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < arr.length && arr[rightIdx]! < arr[smallestIdx]!) {
        // @step:compare
        smallestIdx = rightIdx; // @step:sift-down
      }
      if (smallestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = arr[parentIdx]!; // @step:heap-swap
      arr[parentIdx] = arr[smallestIdx]!; // @step:heap-swap
      arr[smallestIdx] = swapTemp; // @step:heap-swap
      parentIdx = smallestIdx; // @step:sift-down
    }
  }

  function heapInsert(arr: number[], value: number): void {
    arr.push(value); // @step:heap-insert
    siftUp(arr, arr.length - 1);
  }

  function heapExtract(arr: number[]): number {
    const minValue = arr[0]!; // @step:heap-extract
    const lastIdx = arr.length - 1; // @step:heap-extract
    arr[0] = arr[lastIdx]!; // @step:heap-swap
    arr.pop(); // @step:heap-extract
    if (arr.length > 0) siftDown(arr, 0); // @step:sift-down
    return minValue;
  }

  // Insert first k+1 elements into the min-heap
  for (let insertIdx = 0; insertIdx <= Math.min(kValue, array.length - 1); insertIdx++) {
    heapInsert(heap, array[insertIdx]!); // @step:heap-insert
  }

  // For each remaining element, extract-min to result and insert next element
  for (let nextIdx = kValue + 1; nextIdx < array.length; nextIdx++) {
    result.push(heapExtract(heap)); // @step:heap-extract
    heapInsert(heap, array[nextIdx]!); // @step:heap-insert
  }

  // Drain the remaining elements from the heap
  while (heap.length > 0) {
    result.push(heapExtract(heap)); // @step:heap-extract
  }

  return result; // @step:complete
}
