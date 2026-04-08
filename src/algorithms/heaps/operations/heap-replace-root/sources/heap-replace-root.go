// Heap Replace Root — replace the root with a new value and sift-down (more efficient than extract+insert)
package heaps

type replaceRootResult struct {
	replacedValue int
	newHeap       []int
}

func siftDownHRR(array []int, startIndex int, size int) {
	parentIndex := startIndex // @step:sift-down
	for {
		smallestIndex := parentIndex     // @step:sift-down
		leftIndex := 2*parentIndex + 1  // @step:sift-down
		rightIndex := 2*parentIndex + 2 // @step:sift-down
		// Find the smallest among parent, left child, and right child
		if leftIndex < size && array[leftIndex] < array[smallestIndex] {
			// @step:compare
			smallestIndex = leftIndex // @step:sift-down
		}
		if rightIndex < size && array[rightIndex] < array[smallestIndex] {
			// @step:compare
			smallestIndex = rightIndex // @step:sift-down
		}
		if smallestIndex == parentIndex {
			break // @step:sift-down
		}
		// Swap parent with smallest child
		array[parentIndex], array[smallestIndex] = array[smallestIndex], array[parentIndex] // @step:heap-swap
		parentIndex = smallestIndex                                                          // @step:sift-down
	}
}

func heapReplaceRoot(inputArray []int, newValue int) replaceRootResult {
	array := make([]int, len(inputArray)) // @step:initialize
	copy(array, inputArray)
	replacedValue := array[0] // @step:initialize

	// Place the new value at the root
	array[0] = newValue // @step:heap-update

	// Sift down to restore the min-heap property
	siftDownHRR(array, 0, len(array)) // @step:sift-down

	return replaceRootResult{replacedValue, array} // @step:complete
}
