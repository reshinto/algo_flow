// Top-K Frequent Elements (Heap) — find k most frequent elements using a min-heap of size k
function topKFrequentHeap(array: number[], kValue: number): number[] {
  // Count frequencies of each element
  const frequencyMap = new Map<number, number>(); // @step:initialize
  for (const element of array) {
    // @step:initialize
    frequencyMap.set(element, (frequencyMap.get(element) ?? 0) + 1); // @step:initialize
  }
  // Min-heap: each entry is [frequency, element], heap ordered by frequency
  const heap: [number, number][] = []; // @step:initialize
  const entries = Array.from(frequencyMap.entries()); // @step:initialize

  // Process each unique element
  for (const [element, frequency] of entries) {
    if (heap.length < kValue) {
      // Heap not full — insert and sift up
      heap.push([frequency, element]); // @step:heap-insert
      let childIdx = heap.length - 1; // @step:sift-up
      while (childIdx > 0) {
        // @step:sift-up
        const parentIdx = Math.floor((childIdx - 1) / 2); // @step:sift-up
        if ((heap[parentIdx]?.[0] ?? Infinity) <= (heap[childIdx]?.[0] ?? Infinity)) break; // @step:compare
        // Swap child with parent
        const tempEntry = heap[parentIdx]!; // @step:heap-swap
        heap[parentIdx] = heap[childIdx]!; // @step:heap-swap
        heap[childIdx] = tempEntry; // @step:heap-swap
        childIdx = parentIdx; // @step:sift-up
      }
    } else if (frequency > (heap[0]?.[0] ?? 0)) {
      // Current freq beats root (lowest in heap) — replace root and sift down
      heap[0] = [frequency, element]; // @step:heap-extract
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

  // Extract elements from the heap (the k most frequent)
  return heap.map(([, element]) => element); // @step:complete
}
