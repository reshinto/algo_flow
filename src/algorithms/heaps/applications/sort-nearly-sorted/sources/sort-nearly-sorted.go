// Sort Nearly Sorted — sort an array where each element is at most k positions from its sorted position
package heaps

func siftUpSNS(arr []int, currentIdx int) {
	for currentIdx > 0 {
		parentIdx := (currentIdx - 1) / 2 // @step:sift-up
		if arr[parentIdx] <= arr[currentIdx] {
			break // @step:compare
		}
		arr[parentIdx], arr[currentIdx] = arr[currentIdx], arr[parentIdx] // @step:heap-swap
		currentIdx = parentIdx                                             // @step:sift-up
	}
}

func siftDownSNS(arr []int, parentIdx int) {
	for {
		smallestIdx := parentIdx     // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		if leftIdx < len(arr) && arr[leftIdx] < arr[smallestIdx] {
			// @step:compare
			smallestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < len(arr) && arr[rightIdx] < arr[smallestIdx] {
			// @step:compare
			smallestIdx = rightIdx // @step:sift-down
		}
		if smallestIdx == parentIdx {
			break // @step:sift-down
		}
		arr[parentIdx], arr[smallestIdx] = arr[smallestIdx], arr[parentIdx] // @step:heap-swap
		parentIdx = smallestIdx                                              // @step:sift-down
	}
}

func heapInsertSNS(arr *[]int, value int) {
	*arr = append(*arr, value) // @step:heap-insert
	siftUpSNS(*arr, len(*arr)-1)
}

func heapExtractSNS(arr *[]int) int {
	minValue := (*arr)[0]                          // @step:heap-extract
	(*arr)[0] = (*arr)[len(*arr)-1]                // @step:heap-swap
	*arr = (*arr)[:len(*arr)-1]                    // @step:heap-extract
	if len(*arr) > 0 {
		siftDownSNS(*arr, 0) // @step:sift-down
	}
	return minValue
}

func sortNearlySorted(array []int, kValue int) []int {
	result := []int{} // @step:initialize
	heap := []int{}   // @step:initialize

	// Insert first k+1 elements into the min-heap
	initialCount := kValue
	if initialCount > len(array)-1 {
		initialCount = len(array) - 1
	}
	for insertIdx := 0; insertIdx <= initialCount; insertIdx++ {
		heapInsertSNS(&heap, array[insertIdx]) // @step:heap-insert
	}

	// For each remaining element, extract-min to result and insert next element
	for nextIdx := kValue + 1; nextIdx < len(array); nextIdx++ {
		result = append(result, heapExtractSNS(&heap)) // @step:heap-extract
		heapInsertSNS(&heap, array[nextIdx])            // @step:heap-insert
	}

	// Drain the remaining elements from the heap
	for len(heap) > 0 {
		result = append(result, heapExtractSNS(&heap)) // @step:heap-extract
	}

	return result // @step:complete
}
