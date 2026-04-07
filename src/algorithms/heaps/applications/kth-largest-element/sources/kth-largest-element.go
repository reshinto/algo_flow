// Kth Largest Element — find the kth largest element using a min-heap of size k
package heaps

func siftUpKLE(heap []int, idx int) {
	for idx > 0 {
		parentIdx := (idx - 1) / 2 // @step:sift-up
		if heap[parentIdx] <= heap[idx] {
			break // @step:compare
		}
		heap[parentIdx], heap[idx] = heap[idx], heap[parentIdx] // @step:heap-swap
		idx = parentIdx                                          // @step:sift-up
	}
}

func siftDownKLE(heap []int, parentIdx int, size int) {
	for {
		smallestIdx := parentIdx     // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		if leftIdx < size && heap[leftIdx] < heap[smallestIdx] {
			// @step:compare
			smallestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < size && heap[rightIdx] < heap[smallestIdx] {
			// @step:compare
			smallestIdx = rightIdx // @step:sift-down
		}
		if smallestIdx == parentIdx {
			break // @step:sift-down
		}
		heap[parentIdx], heap[smallestIdx] = heap[smallestIdx], heap[parentIdx] // @step:heap-swap
		parentIdx = smallestIdx                                                  // @step:sift-down
	}
}

func kthLargestElement(array []int, kValue int) int {
	minHeap := []int{} // @step:initialize

	for _, element := range array {
		if len(minHeap) < kValue {
			minHeap = append(minHeap, element) // @step:heap-insert
			siftUpKLE(minHeap, len(minHeap)-1) // @step:sift-up
		} else if element > minHeap[0] {
			// @step:compare
			minHeap[0] = element                      // @step:heap-extract
			siftDownKLE(minHeap, 0, len(minHeap)) // @step:sift-down
		}
	}

	return minHeap[0] // @step:complete
}
