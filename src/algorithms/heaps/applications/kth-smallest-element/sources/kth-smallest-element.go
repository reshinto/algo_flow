// Kth Smallest Element — find the kth smallest element using a max-heap of size k
package heaps

func siftUpKSE(heap []int, idx int) {
	for idx > 0 {
		parentIdx := (idx - 1) / 2 // @step:sift-up
		if heap[parentIdx] >= heap[idx] {
			break // @step:compare
		}
		heap[parentIdx], heap[idx] = heap[idx], heap[parentIdx] // @step:heap-swap
		idx = parentIdx                                          // @step:sift-up
	}
}

func siftDownKSE(heap []int, parentIdx int, size int) {
	for {
		largestIdx := parentIdx      // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		if leftIdx < size && heap[leftIdx] > heap[largestIdx] {
			// @step:compare
			largestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < size && heap[rightIdx] > heap[largestIdx] {
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

func kthSmallestElement(array []int, kValue int) int {
	maxHeap := []int{} // @step:initialize

	for _, element := range array {
		if len(maxHeap) < kValue {
			maxHeap = append(maxHeap, element) // @step:heap-insert
			siftUpKSE(maxHeap, len(maxHeap)-1) // @step:sift-up
		} else if element < maxHeap[0] {
			// @step:compare
			maxHeap[0] = element                      // @step:heap-extract
			siftDownKSE(maxHeap, 0, len(maxHeap)) // @step:sift-down
		}
	}

	return maxHeap[0] // @step:complete
}
