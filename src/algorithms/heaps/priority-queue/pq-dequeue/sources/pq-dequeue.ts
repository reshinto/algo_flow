// PQ Dequeue — remove and return the highest-priority (smallest) element from a min-heap priority queue
function pqDequeue(priorityQueue: number[]): { dequeuedValue: number; remainingQueue: number[] } {
  const queue = [...priorityQueue]; // @step:initialize
  const dequeuedValue = queue[0]; // @step:heap-extract
  const lastIdx = queue.length - 1; // @step:heap-extract
  // Move last element to root and remove the last position
  const temp = queue[0]; // @step:heap-swap
  queue[0] = queue[lastIdx]; // @step:heap-swap
  queue[lastIdx] = temp; // @step:heap-swap
  queue.pop(); // @step:heap-extract
  // Sift down the new root to restore heap property
  const size = queue.length;
  let parentIdx = 0; // @step:sift-down
  while (true) {
    // @step:sift-down
    let smallestIdx = parentIdx; // @step:sift-down
    const leftIdx = 2 * parentIdx + 1; // @step:sift-down
    const rightIdx = 2 * parentIdx + 2; // @step:sift-down
    // Find the smallest among parent, left child, and right child
    if (leftIdx < size && queue[leftIdx] < queue[smallestIdx]) {
      // @step:compare
      smallestIdx = leftIdx; // @step:sift-down
    }
    if (rightIdx < size && queue[rightIdx] < queue[smallestIdx]) {
      // @step:compare
      smallestIdx = rightIdx; // @step:sift-down
    }
    if (smallestIdx === parentIdx) break; // @step:sift-down
    // Swap parent with highest-priority child
    const swapTemp = queue[parentIdx]; // @step:heap-swap
    queue[parentIdx] = queue[smallestIdx]; // @step:heap-swap
    queue[smallestIdx] = swapTemp; // @step:heap-swap
    parentIdx = smallestIdx; // @step:sift-down
  }
  return { dequeuedValue: dequeuedValue as number, remainingQueue: queue }; // @step:complete
}
