// PQ Change Priority — update element priority at a given index, then restore heap order via sift-up or sift-down
function pqChangePriority(
  priorityQueue: number[],
  targetIndex: number,
  newValue: number,
): number[] {
  const queue = [...priorityQueue]; // @step:initialize
  const oldValue = queue[targetIndex]; // @step:heap-update
  queue[targetIndex] = newValue; // @step:heap-update

  if (newValue < (oldValue as number)) {
    // Priority increased (value decreased) — sift up
    let currentIdx = targetIndex; // @step:sift-up
    while (currentIdx > 0) {
      // @step:sift-up
      const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
      if (queue[currentIdx] >= queue[parentIdx]) break; // @step:compare
      const temp = queue[currentIdx]; // @step:heap-swap
      queue[currentIdx] = queue[parentIdx]; // @step:heap-swap
      queue[parentIdx] = temp; // @step:heap-swap
      currentIdx = parentIdx; // @step:sift-up
    }
  } else {
    // Priority decreased (value increased) — sift down
    let parentIdx = targetIndex; // @step:sift-down
    const size = queue.length;
    while (true) {
      // @step:sift-down
      let smallestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < size && queue[leftIdx] < queue[smallestIdx]) {
        // @step:compare
        smallestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < size && queue[rightIdx] < queue[smallestIdx]) {
        // @step:compare
        smallestIdx = rightIdx; // @step:sift-down
      }
      if (smallestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = queue[parentIdx]; // @step:heap-swap
      queue[parentIdx] = queue[smallestIdx]; // @step:heap-swap
      queue[smallestIdx] = swapTemp; // @step:heap-swap
      parentIdx = smallestIdx; // @step:sift-down
    }
  }

  return queue; // @step:complete
}
