// Task Scheduler Heap — minimum intervals to complete all tasks with cooldown (LeetCode 621)
function taskSchedulerHeap(tasks: string[], cooldown: number): number {
  // Count task frequencies
  const frequencyMap: Record<string, number> = {}; // @step:initialize
  for (const taskName of tasks) {
    frequencyMap[taskName] = (frequencyMap[taskName] ?? 0) + 1; // @step:initialize
  }

  // Build max-heap of frequencies
  const heap: number[] = []; // @step:initialize
  for (const frequency of Object.values(frequencyMap)) {
    heap.push(frequency); // @step:heap-insert
  }

  function siftUp(arr: number[], currentIdx: number): void {
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
      if (arr[parentIdx]! >= arr[currentIdx]!) break; // @step:compare
      const swapTemp = arr[parentIdx]!; // @step:heap-swap
      arr[parentIdx] = arr[currentIdx]!; // @step:heap-swap
      arr[currentIdx] = swapTemp; // @step:heap-swap
      currentIdx = parentIdx; // @step:sift-up
    }
  }

  function siftDown(arr: number[], parentIdx: number): void {
    while (true) {
      let largestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < arr.length && arr[leftIdx]! > arr[largestIdx]!) {
        // @step:compare
        largestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < arr.length && arr[rightIdx]! > arr[largestIdx]!) {
        // @step:compare
        largestIdx = rightIdx; // @step:sift-down
      }
      if (largestIdx === parentIdx) break; // @step:sift-down
      const swapTemp = arr[parentIdx]!; // @step:heap-swap
      arr[parentIdx] = arr[largestIdx]!; // @step:heap-swap
      arr[largestIdx] = swapTemp; // @step:heap-swap
      parentIdx = largestIdx; // @step:sift-down
    }
  }

  // Heapify
  for (let startIdx = Math.floor(heap.length / 2) - 1; startIdx >= 0; startIdx--) {
    siftDown(heap, startIdx); // @step:sift-down
  }

  let totalIntervals = 0; // @step:initialize

  while (heap.length > 0) {
    const cycleSize = cooldown + 1; // @step:initialize
    const roundTasks: number[] = []; // @step:initialize

    // Extract up to cooldown+1 tasks this round
    for (let slotIndex = 0; slotIndex < cycleSize && heap.length > 0; slotIndex++) {
      const maxFrequency = heap[0]!; // @step:heap-extract
      const lastIdx = heap.length - 1; // @step:heap-extract
      heap[0] = heap[lastIdx]!; // @step:heap-swap
      heap.pop(); // @step:heap-extract
      if (heap.length > 0) siftDown(heap, 0); // @step:sift-down

      roundTasks.push(maxFrequency - 1); // @step:compare
    }

    // Reinsert tasks with remaining frequency
    for (const remainingFrequency of roundTasks) {
      if (remainingFrequency > 0) {
        heap.push(remainingFrequency); // @step:heap-insert
        siftUp(heap, heap.length - 1);
      }
    }

    // Add full cycle or just the tasks if this is the last round
    if (heap.length > 0) {
      totalIntervals += cycleSize; // @step:compare
    } else {
      totalIntervals += roundTasks.length; // @step:compare
    }
  }

  return totalIntervals; // @step:complete
}
