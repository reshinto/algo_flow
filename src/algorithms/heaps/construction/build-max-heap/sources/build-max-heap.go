// Build Max Heap — convert an arbitrary array into a valid max-heap in-place using sift-down
package heaps

func siftDownBMH(array []int, startIdx int, size int) {
	parentIdx := startIdx // @step:sift-down
	for {
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
		// Swap parent with the largest child
		array[parentIdx], array[largestIdx] = array[largestIdx], array[parentIdx] // @step:heap-swap
		parentIdx = largestIdx                                                     // @step:sift-down
	}
}

func buildMaxHeap(inputArray []int) []int {
	array := make([]int, len(inputArray)) // @step:initialize
	copy(array, inputArray)
	size := len(array) // @step:initialize
	// Start from last non-leaf node and sift down each node toward root
	for startIdx := size/2 - 1; startIdx >= 0; startIdx-- {
		// @step:sift-down
		siftDownBMH(array, startIdx, size) // @step:sift-down
	}
	return array // @step:complete
}
