// Top-K Frequent Elements (Heap) — find k most frequent elements using a min-heap of size k
package heaps

type freqEntry struct {
	frequency int
	element   int
}

func topKFrequentHeap(array []int, kValue int) []int {
	// Count frequencies of each element
	frequencyMap := map[int]int{} // @step:initialize
	for _, element := range array {
		// @step:initialize
		frequencyMap[element]++ // @step:initialize
	}

	// Min-heap: each entry is (frequency, element), heap ordered by frequency
	heap := []freqEntry{}           // @step:initialize
	entries := []freqEntry{}        // @step:initialize
	for element, frequency := range frequencyMap {
		entries = append(entries, freqEntry{frequency, element})
	}

	// Process each unique element
	for _, entry := range entries {
		element := entry.element
		frequency := entry.frequency
		if len(heap) < kValue {
			// Heap not full — insert and sift up
			heap = append(heap, freqEntry{frequency, element}) // @step:heap-insert
			childIdx := len(heap) - 1                          // @step:sift-up
			for childIdx > 0 {
				// @step:sift-up
				parentIdx := (childIdx - 1) / 2 // @step:sift-up
				if heap[parentIdx].frequency <= heap[childIdx].frequency {
					break // @step:compare
				}
				heap[parentIdx], heap[childIdx] = heap[childIdx], heap[parentIdx] // @step:heap-swap
				childIdx = parentIdx                                               // @step:sift-up
			}
		} else if frequency > heap[0].frequency {
			// Current freq beats root — replace root and sift down
			heap[0] = freqEntry{frequency, element} // @step:heap-extract
			parentIdx := 0
			for {
				// @step:sift-down
				smallestIdx := parentIdx     // @step:sift-down
				leftIdx := 2*parentIdx + 1  // @step:sift-down
				rightIdx := 2*parentIdx + 2 // @step:sift-down
				if leftIdx < len(heap) && heap[leftIdx].frequency < heap[smallestIdx].frequency {
					// @step:compare
					smallestIdx = leftIdx // @step:sift-down
				}
				if rightIdx < len(heap) && heap[rightIdx].frequency < heap[smallestIdx].frequency {
					// @step:compare
					smallestIdx = rightIdx // @step:sift-down
				}
				if smallestIdx == parentIdx {
					break // @step:sift-down
				}
				heap[parentIdx], heap[smallestIdx] = heap[smallestIdx], heap[parentIdx] // @step:heap-swap
				parentIdx = smallestIdx                                                  // @step:sift-down
			}
		}
	}

	// Extract elements from the heap (the k most frequent)
	result := make([]int, len(heap)) // @step:complete
	for idx, entry := range heap {
		result[idx] = entry.element
	}
	return result // @step:complete
}
