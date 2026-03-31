// Heap Insert — append a value to a min-heap and restore heap property via sift-up
function heapInsert(heapArray: number[], value: number): number[] {
  const array = [...heapArray]; // @step:initialize
  array.push(value); // @step:heap-insert
  let currentIdx = array.length - 1; // @step:heap-insert
  // Sift up: while not at root, compare with parent and swap if smaller
  while (currentIdx > 0) {
    // @step:sift-up
    const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
    if (array[currentIdx] >= array[parentIdx]) break; // @step:sift-up
    // Swap with parent to restore heap property
    const temp = array[currentIdx]; // @step:heap-swap
    array[currentIdx] = array[parentIdx]; // @step:heap-swap
    array[parentIdx] = temp; // @step:heap-swap
    currentIdx = parentIdx; // @step:sift-up
  }
  return array; // @step:complete
}
