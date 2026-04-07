// Heap Delete Arbitrary — remove a node at any index from a min-heap in O(log n)
package heaps

func siftUpHDA(array []int, startIndex int) {
	currentIndex := startIndex // @step:sift-up
	for currentIndex > 0 {
		parentIndex := (currentIndex - 1) / 2 // @step:sift-up
		if array[currentIndex] >= array[parentIndex] {
			break // @step:compare
		}
		// Swap current with parent
		array[currentIndex], array[parentIndex] = array[parentIndex], array[currentIndex] // @step:heap-swap
		currentIndex = parentIndex                                                         // @step:sift-up
	}
}

func siftDownHDA(array []int, startIndex int, size int) {
	parentIndex := startIndex // @step:sift-down
	for {
		smallestIndex := parentIndex     // @step:sift-down
		leftIndex := 2*parentIndex + 1  // @step:sift-down
		rightIndex := 2*parentIndex + 2 // @step:sift-down
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

func heapDeleteArbitrary(inputArray []int, targetIndex int) []int {
	array := make([]int, len(inputArray)) // @step:initialize
	copy(array, inputArray)
	lastIndex := len(array) - 1 // @step:initialize

	// Replace target with the last element, then shrink the heap
	array[targetIndex] = array[lastIndex] // @step:heap-extract
	array = array[:lastIndex]             // @step:heap-extract

	if targetIndex >= len(array) {
		return array // @step:complete
	}

	parentIndex := 0
	if targetIndex > 0 {
		parentIndex = (targetIndex - 1) / 2 // @step:sift-up
	}

	// If new value is smaller than its parent, sift up; otherwise sift down
	if targetIndex > 0 && array[targetIndex] < array[parentIndex] {
		// @step:sift-up
		siftUpHDA(array, targetIndex) // @step:sift-up
	} else {
		siftDownHDA(array, targetIndex, len(array)) // @step:sift-down
	}

	return array // @step:complete
}
