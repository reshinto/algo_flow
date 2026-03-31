// Build Heap Top-Down — build a min-heap by inserting elements one-by-one with sift-up
function buildHeapTopDown(inputArray: number[]): number[] {
  const heap: number[] = []; // @step:initialize
  // Insert each element at the end and restore heap property by sifting up
  for (let insertIdx = 0; insertIdx < inputArray.length; insertIdx++) {
    const value = inputArray[insertIdx]; // @step:heap-insert
    heap.push(value!); // @step:heap-insert
    siftUp(heap, heap.length - 1); // @step:sift-up
  }
  return heap; // @step:complete
}

function siftUp(heap: number[], startIdx: number): void {
  let childIdx = startIdx; // @step:sift-up
  while (childIdx > 0) {
    const parentIdx = Math.floor((childIdx - 1) / 2); // @step:sift-up
    // If child is smaller than parent, swap to restore min-heap property
    if (heap[childIdx] < heap[parentIdx]) {
      // @step:sift-up
      const temp = heap[childIdx]; // @step:heap-swap
      heap[childIdx] = heap[parentIdx]; // @step:heap-swap
      heap[parentIdx] = temp; // @step:heap-swap
      childIdx = parentIdx; // @step:sift-up
    } else {
      break; // @step:sift-up
    }
  }
}
