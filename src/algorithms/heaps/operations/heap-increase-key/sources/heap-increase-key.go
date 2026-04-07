// Heap Increase Key — increase the value at a given index in a min-heap, then sift-down
package heaps

func siftDownHIK(array []int, startIndex int, size int) {
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
		// Swap parent with smallest child — parent value is too large, push it down
		array[parentIndex], array[smallestIndex] = array[smallestIndex], array[parentIndex] // @step:heap-swap
		parentIndex = smallestIndex                                                          // @step:sift-down
	}
}

func heapIncreaseKey(inputArray []int, targetIndex int, newValue int) []int {
	array := make([]int, len(inputArray)) // @step:initialize
	copy(array, inputArray)

	// Update the value at targetIndex to the new (larger) value
	array[targetIndex] = newValue // @step:heap-update

	// Sift down to restore the min-heap property
	siftDownHIK(array, targetIndex, len(array)) // @step:sift-down

	return array // @step:complete
}
