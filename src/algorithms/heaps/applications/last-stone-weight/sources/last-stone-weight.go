// Last Stone Weight — repeatedly smash the two heaviest stones, return the last remaining weight
package heaps

func siftDownLSW(heap []int, parentIdx int) {
	for {
		largestIdx := parentIdx      // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		if leftIdx < len(heap) && heap[leftIdx] > heap[largestIdx] {
			// @step:compare
			largestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < len(heap) && heap[rightIdx] > heap[largestIdx] {
			// @step:compare
			largestIdx = rightIdx // @step:sift-down
		}
		if largestIdx == parentIdx {
			break // @step:sift-down
		}
		heap[parentIdx], heap[largestIdx] = heap[largestIdx], heap[parentIdx] // @step:heap-swap
		parentIdx = largestIdx                                                 // @step:sift-down
	}
}

func extractMaxLSW(arr *[]int) int {
	maxValue := (*arr)[0]                            // @step:heap-extract
	(*arr)[0] = (*arr)[len(*arr)-1]                  // @step:heap-swap
	*arr = (*arr)[:len(*arr)-1]                      // @step:heap-extract
	siftDownLSW(*arr, 0)                             // @step:sift-down
	return maxValue
}

func insertValueLSW(arr *[]int, value int) {
	*arr = append(*arr, value) // @step:heap-insert
	currentIdx := len(*arr) - 1 // @step:sift-up
	for currentIdx > 0 {
		parentIdx := (currentIdx - 1) / 2 // @step:sift-up
		if (*arr)[parentIdx] >= (*arr)[currentIdx] {
			break // @step:compare
		}
		(*arr)[parentIdx], (*arr)[currentIdx] = (*arr)[currentIdx], (*arr)[parentIdx] // @step:heap-swap
		currentIdx = parentIdx                                                         // @step:sift-up
	}
}

func lastStoneWeight(stones []int) int {
	heap := make([]int, len(stones)) // @step:initialize
	copy(heap, stones)
	heapSize := len(heap)

	// Build max-heap using Floyd's algorithm
	for startIdx := heapSize/2 - 1; startIdx >= 0; startIdx-- {
		siftDownLSW(heap, startIdx) // @step:sift-down
	}

	for len(heap) >= 2 {
		heaviest := extractMaxLSW(&heap)       // @step:heap-extract
		secondHeaviest := extractMaxLSW(&heap) // @step:heap-extract
		if heaviest != secondHeaviest {
			// @step:compare
			insertValueLSW(&heap, heaviest-secondHeaviest) // @step:heap-insert
		}
	}

	if len(heap) == 0 {
		return 0 // @step:complete
	}
	return heap[0] // @step:complete
}
