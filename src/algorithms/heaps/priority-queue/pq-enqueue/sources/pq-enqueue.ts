// PQ Enqueue — insert an element into a min-heap-based priority queue and restore heap order via sift-up
function pqEnqueue(priorityQueue: number[], value: number): number[] {
  const queue = [...priorityQueue]; // @step:initialize
  queue.push(value); // @step:heap-insert
  let currentIdx = queue.length - 1; // @step:heap-insert
  // Sift up: bubble the new element toward the root until heap property holds
  while (currentIdx > 0) {
    // @step:sift-up
    const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
    if (queue[currentIdx] >= queue[parentIdx]) break; // @step:compare
    // New element has higher priority (smaller value) — swap with parent
    const temp = queue[currentIdx]; // @step:heap-swap
    queue[currentIdx] = queue[parentIdx]; // @step:heap-swap
    queue[parentIdx] = temp; // @step:heap-swap
    currentIdx = parentIdx; // @step:sift-up
  }
  return queue; // @step:complete
}
