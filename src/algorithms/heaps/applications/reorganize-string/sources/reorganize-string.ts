// Reorganize String — rearrange string so no two adjacent characters are the same (LeetCode 767)
function reorganizeString(text: string): string {
  // Count character frequencies
  const frequencyMap: Record<string, number> = {}; // @step:initialize
  for (const character of text) {
    frequencyMap[character] = (frequencyMap[character] ?? 0) + 1; // @step:initialize
  }

  // Build max-heap entries: [frequency, character]
  const heap: [number, string][] = []; // @step:initialize
  for (const [character, frequency] of Object.entries(frequencyMap)) {
    heap.push([frequency, character]); // @step:heap-insert
  }

  function siftUp(arr: [number, string][], currentIdx: number): void {
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
      if (arr[parentIdx]![0] >= arr[currentIdx]![0]) break; // @step:compare
      const swapTemp = arr[parentIdx]!; // @step:heap-swap
      arr[parentIdx] = arr[currentIdx]!; // @step:heap-swap
      arr[currentIdx] = swapTemp; // @step:heap-swap
      currentIdx = parentIdx; // @step:sift-up
    }
  }

  function siftDown(arr: [number, string][], parentIdx: number): void {
    while (true) {
      let largestIdx = parentIdx; // @step:sift-down
      const leftIdx = 2 * parentIdx + 1; // @step:sift-down
      const rightIdx = 2 * parentIdx + 2; // @step:sift-down
      if (leftIdx < arr.length && arr[leftIdx]![0] > arr[largestIdx]![0]) {
        // @step:compare
        largestIdx = leftIdx; // @step:sift-down
      }
      if (rightIdx < arr.length && arr[rightIdx]![0] > arr[largestIdx]![0]) {
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

  let result = ""; // @step:initialize
  let prevEntry: [number, string] | null = null; // @step:initialize

  while (heap.length > 0) {
    // Extract most frequent
    const topEntry = heap[0]!; // @step:heap-extract
    const lastIdx = heap.length - 1; // @step:heap-extract
    heap[0] = heap[lastIdx]!; // @step:heap-swap
    heap.pop(); // @step:heap-extract
    if (heap.length > 0) siftDown(heap, 0); // @step:sift-down

    result += topEntry[1]; // @step:heap-extract
    topEntry[0] -= 1; // @step:heap-extract

    // Reinsert previous entry if it still has frequency
    if (prevEntry !== null && prevEntry[0] > 0) {
      heap.push(prevEntry); // @step:heap-insert
      siftUp(heap, heap.length - 1); // @step:sift-up
    }

    // Hold current entry for next iteration to prevent adjacency
    prevEntry = topEntry[0] > 0 ? topEntry : null; // @step:compare

    // Impossible case: same character would be adjacent
    if (heap.length === 0 && prevEntry !== null) {
      return ""; // @step:complete
    }
  }

  return result; // @step:complete
}
