// Heap Sort Visualization — sort using max-heap tree perspective: build heap, then extract max repeatedly
package heaps

func siftDownHSV(arr []int, heapSize int, parentIdx int) {
	for {
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		largestIdx := parentIdx     // @step:sift-down
		if leftIdx < heapSize && arr[leftIdx] > arr[largestIdx] {
			// @step:compare
			largestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < heapSize && arr[rightIdx] > arr[largestIdx] {
			// @step:compare
			largestIdx = rightIdx // @step:sift-down
		}
		if largestIdx == parentIdx {
			break // @step:sift-down
		}
		arr[parentIdx], arr[largestIdx] = arr[largestIdx], arr[parentIdx] // @step:heap-swap
		parentIdx = largestIdx                                             // @step:sift-down
	}
}

func heapSortVisualization(inputArray []int) []int {
	array := make([]int, len(inputArray)) // @step:initialize
	copy(array, inputArray)
	arrayLength := len(array) // @step:initialize

	// Phase 1: Build max-heap in-place
	lastNonLeaf := arrayLength/2 - 1
	for nodeIdx := lastNonLeaf; nodeIdx >= 0; nodeIdx-- {
		siftDownHSV(array, arrayLength, nodeIdx) // @step:sift-down
	}

	// Phase 2: Extract elements one by one
	for heapEnd := arrayLength - 1; heapEnd > 0; heapEnd-- {
		array[0], array[heapEnd] = array[heapEnd], array[0] // @step:heap-swap
		siftDownHSV(array, heapEnd, 0)                       // @step:sift-down
	}

	return array // @step:complete
}
