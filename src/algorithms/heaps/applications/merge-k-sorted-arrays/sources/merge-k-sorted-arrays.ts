// Merge K Sorted Arrays — merge k sorted arrays into one sorted array using a min-heap
function mergeKSortedArrays(arrays: number[][]): number[] {
  const result: number[] = []; // @step:initialize
  // Min-heap entries: [value, arrayIndex, elementIndex]
  const heap: [number, number, number][] = []; // @step:initialize

  // Insert first element of each array into the heap
  for (let arrayIndex = 0; arrayIndex < arrays.length; arrayIndex++) {
    // @step:initialize
    const firstElement = arrays[arrayIndex]?.[0]; // @step:initialize
    if (firstElement !== undefined) {
      // @step:initialize
      heap.push([firstElement, arrayIndex, 0]); // @step:heap-insert
    }
  }

  // Build initial min-heap using sift-up for each inserted element
  for (let insertedIdx = 1; insertedIdx < heap.length; insertedIdx++) {
    // @step:sift-up
    let childIdx = insertedIdx; // @step:sift-up
    while (childIdx > 0) {
      // @step:sift-up
      const parentIdx = Math.floor((childIdx - 1) / 2); // @step:sift-up
      if ((heap[parentIdx]?.[0] ?? Infinity) <= (heap[childIdx]?.[0] ?? Infinity)) break; // @step:compare
      const tempEntry = heap[parentIdx]!; // @step:heap-swap
      heap[parentIdx] = heap[childIdx]!; // @step:heap-swap
      heap[childIdx] = tempEntry; // @step:heap-swap
      childIdx = parentIdx; // @step:sift-up
    }
  }

  // Extract min and insert next element from the same array
  while (heap.length > 0) {
    const [minValue, arrayIndex, elementIndex] = heap[0]!; // @step:heap-extract
    result.push(minValue); // @step:heap-extract

    const nextElementIndex = elementIndex + 1; // @step:heap-extract
    const nextValue = arrays[arrayIndex]?.[nextElementIndex]; // @step:heap-extract

    if (nextValue !== undefined) {
      // Replace root with next element from the same array
      heap[0] = [nextValue, arrayIndex, nextElementIndex]; // @step:heap-insert
    } else {
      // No more elements in this array — remove root by moving last to root
      const lastEntry = heap.pop()!; // @step:heap-extract
      if (heap.length > 0) {
        heap[0] = lastEntry; // @step:heap-extract
      }
    }

    // Sift down the root to restore heap property
    if (heap.length > 1) {
      let parentIdx = 0; // @step:sift-down
      while (true) {
        // @step:sift-down
        let smallestIdx = parentIdx; // @step:sift-down
        const leftIdx = 2 * parentIdx + 1; // @step:sift-down
        const rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (
          leftIdx < heap.length &&
          (heap[leftIdx]?.[0] ?? Infinity) < (heap[smallestIdx]?.[0] ?? Infinity)
        ) {
          // @step:compare
          smallestIdx = leftIdx; // @step:sift-down
        }
        if (
          rightIdx < heap.length &&
          (heap[rightIdx]?.[0] ?? Infinity) < (heap[smallestIdx]?.[0] ?? Infinity)
        ) {
          // @step:compare
          smallestIdx = rightIdx; // @step:sift-down
        }
        if (smallestIdx === parentIdx) break; // @step:sift-down
        const tempEntry = heap[parentIdx]!; // @step:heap-swap
        heap[parentIdx] = heap[smallestIdx]!; // @step:heap-swap
        heap[smallestIdx] = tempEntry; // @step:heap-swap
        parentIdx = smallestIdx; // @step:sift-down
      }
    }
  }

  return result; // @step:complete
}
