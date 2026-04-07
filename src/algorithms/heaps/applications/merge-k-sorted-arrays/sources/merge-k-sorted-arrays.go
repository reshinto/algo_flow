// Merge K Sorted Arrays — merge k sorted arrays into one sorted array using a min-heap
package heaps

type mergeHeapEntry struct {
	value        int
	arrayIndex   int
	elementIndex int
}

func mergeKSortedArrays(arrays [][]int) []int {
	result := []int{}                // @step:initialize
	heap := []mergeHeapEntry{}       // @step:initialize

	// Insert first element of each array into the heap
	for arrayIndex, arr := range arrays {
		// @step:initialize
		if len(arr) > 0 {
			// @step:initialize
			heap = append(heap, mergeHeapEntry{arr[0], arrayIndex, 0}) // @step:heap-insert
		}
	}

	// Build initial min-heap using sift-up for each inserted element
	for insertedIdx := 1; insertedIdx < len(heap); insertedIdx++ {
		// @step:sift-up
		childIdx := insertedIdx // @step:sift-up
		for childIdx > 0 {
			// @step:sift-up
			parentIdx := (childIdx - 1) / 2 // @step:sift-up
			if heap[parentIdx].value <= heap[childIdx].value {
				break // @step:compare
			}
			heap[parentIdx], heap[childIdx] = heap[childIdx], heap[parentIdx] // @step:heap-swap
			childIdx = parentIdx                                               // @step:sift-up
		}
	}

	// Extract min and insert next element from the same array
	for len(heap) > 0 {
		minValue := heap[0].value        // @step:heap-extract
		arrayIndex := heap[0].arrayIndex // @step:heap-extract
		elementIndex := heap[0].elementIndex
		result = append(result, minValue) // @step:heap-extract

		nextElementIndex := elementIndex + 1 // @step:heap-extract
		if nextElementIndex < len(arrays[arrayIndex]) {
			// Replace root with next element from the same array
			heap[0] = mergeHeapEntry{arrays[arrayIndex][nextElementIndex], arrayIndex, nextElementIndex} // @step:heap-insert
		} else {
			// No more elements in this array — remove root by moving last to root
			lastEntry := heap[len(heap)-1]  // @step:heap-extract
			heap = heap[:len(heap)-1]
			if len(heap) > 0 {
				heap[0] = lastEntry // @step:heap-extract
			}
		}

		// Sift down the root to restore heap property
		if len(heap) > 1 {
			parentIdx := 0 // @step:sift-down
			for {
				// @step:sift-down
				smallestIdx := parentIdx     // @step:sift-down
				leftIdx := 2*parentIdx + 1  // @step:sift-down
				rightIdx := 2*parentIdx + 2 // @step:sift-down
				if leftIdx < len(heap) && heap[leftIdx].value < heap[smallestIdx].value {
					// @step:compare
					smallestIdx = leftIdx // @step:sift-down
				}
				if rightIdx < len(heap) && heap[rightIdx].value < heap[smallestIdx].value {
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

	return result // @step:complete
}
