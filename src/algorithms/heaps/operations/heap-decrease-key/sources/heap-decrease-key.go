// Heap Decrease Key — decrease the value at a given index in a min-heap, then sift-up
package heaps

func siftUpHDK(array []int, startIndex int) {
	currentIndex := startIndex // @step:sift-up
	for currentIndex > 0 {
		parentIndex := (currentIndex - 1) / 2 // @step:sift-up
		if array[currentIndex] >= array[parentIndex] {
			break // @step:compare
		}
		// Swap current with parent — current value is smaller, move it up
		array[currentIndex], array[parentIndex] = array[parentIndex], array[currentIndex] // @step:heap-swap
		currentIndex = parentIndex                                                         // @step:sift-up
	}
}

func heapDecreaseKey(inputArray []int, targetIndex int, newValue int) []int {
	array := make([]int, len(inputArray)) // @step:initialize
	copy(array, inputArray)

	// Update the value at targetIndex to the new (smaller) value
	array[targetIndex] = newValue // @step:heap-update

	// Sift up to restore the min-heap property
	siftUpHDK(array, targetIndex) // @step:sift-up

	return array // @step:complete
}
