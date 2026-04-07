// Heap Sort — build a max-heap, then repeatedly extract the maximum
package main

func siftDown(arr []int, rootIndex, heapSize int) {
	// @step:compare
	largestIndex := rootIndex        // @step:compare
	leftChild := 2*rootIndex + 1     // @step:compare
	rightChild := 2*rootIndex + 2    // @step:compare

	if leftChild < heapSize && arr[leftChild] > arr[largestIndex] {
		// @step:compare
		largestIndex = leftChild // @step:compare
	}

	if rightChild < heapSize && arr[rightChild] > arr[largestIndex] {
		// @step:compare
		largestIndex = rightChild // @step:compare
	}

	if largestIndex != rootIndex {
		// @step:swap
		arr[rootIndex], arr[largestIndex] = arr[largestIndex], arr[rootIndex] // @step:swap

		siftDown(arr, largestIndex, heapSize) // @step:swap
	}
}

func heapSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	// Phase 1: Build the max-heap by sifting down from the last internal node
	for buildIndex := arrayLength/2 - 1; buildIndex >= 0; buildIndex-- {
		// @step:build-heap
		siftDown(sortedArray, buildIndex, arrayLength) // @step:build-heap
	}

	// Phase 2: Extract maximum elements one by one
	for extractIndex := arrayLength - 1; extractIndex > 0; extractIndex-- {
		// @step:extract
		sortedArray[0], sortedArray[extractIndex] = sortedArray[extractIndex], sortedArray[0] // @step:extract

		// Restore heap property after moving max to its sorted position
		siftDown(sortedArray, 0, extractIndex) // @step:compare

		// The element at extractIndex is now permanently sorted
		// @step:mark-sorted
	}

	return sortedArray // @step:complete
}
