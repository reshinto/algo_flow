// Heap Peek — return the minimum element (root) from a min-heap without removing it
function heapPeek(heapArray: number[]): number | undefined {
  const array = [...heapArray]; // @step:initialize
  // The root at index 0 is always the minimum in a valid min-heap
  const minimumValue = array[0]; // @step:visit
  return minimumValue; // @step:complete
}
