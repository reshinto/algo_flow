// Heap Extract Min — remove and return the minimum (root) from a min-heap, then restore heap property
package heaps

type extractMinResult struct {
	extractedValue int
	remainingHeap  []int
}

func heapExtractMin(heapArray []int) extractMinResult {
	array := make([]int, len(heapArray)) // @step:initialize
	copy(array, heapArray)
	extractedValue := array[0]              // @step:heap-extract
	lastIdx := len(array) - 1               // @step:heap-extract
	// Move last element to root and remove the last position
	array[0], array[lastIdx] = array[lastIdx], array[0] // @step:heap-swap
	array = array[:lastIdx]                              // @step:heap-extract
	// Sift down the new root to restore heap property
	size := len(array)
	parentIdx := 0 // @step:sift-down
	for {
		// @step:sift-down
		smallestIdx := parentIdx     // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		// Find the smallest among parent, left child, and right child
		if leftIdx < size && array[leftIdx] < array[smallestIdx] {
			// @step:sift-down
			smallestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < size && array[rightIdx] < array[smallestIdx] {
			// @step:sift-down
			smallestIdx = rightIdx // @step:sift-down
		}
		if smallestIdx == parentIdx {
			break // @step:sift-down
		}
		// Swap parent with smallest child
		array[parentIdx], array[smallestIdx] = array[smallestIdx], array[parentIdx] // @step:heap-swap
		parentIdx = smallestIdx                                                      // @step:sift-down
	}
	return extractMinResult{extractedValue, array} // @step:complete
}
