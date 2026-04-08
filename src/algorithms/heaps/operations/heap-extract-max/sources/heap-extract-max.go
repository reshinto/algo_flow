// Heap Extract Max — remove and return the maximum (root) from a max-heap, then restore heap property
package heaps

type extractMaxResult struct {
	extractedValue int
	remainingHeap  []int
}

func heapExtractMax(heapArray []int) extractMaxResult {
	array := make([]int, len(heapArray)) // @step:initialize
	copy(array, heapArray)
	extractedValue := array[0]              // @step:heap-extract
	lastIdx := len(array) - 1               // @step:heap-extract
	// Move last element to root and remove the last position
	array[0], array[lastIdx] = array[lastIdx], array[0] // @step:heap-swap
	array = array[:lastIdx]                              // @step:heap-extract
	// Sift down the new root to restore max-heap property
	size := len(array)
	parentIdx := 0 // @step:sift-down
	for {
		// @step:sift-down
		largestIdx := parentIdx      // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		// Find the largest among parent, left child, and right child
		if leftIdx < size && array[leftIdx] > array[largestIdx] {
			// @step:sift-down
			largestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < size && array[rightIdx] > array[largestIdx] {
			// @step:sift-down
			largestIdx = rightIdx // @step:sift-down
		}
		if largestIdx == parentIdx {
			break // @step:sift-down
		}
		// Swap parent with largest child
		array[parentIdx], array[largestIdx] = array[largestIdx], array[parentIdx] // @step:heap-swap
		parentIdx = largestIdx                                                     // @step:sift-down
	}
	return extractMaxResult{extractedValue, array} // @step:complete
}
