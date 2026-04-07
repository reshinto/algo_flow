// Find Median from Data Stream — maintain running median using two heaps
// maxHeap stores the lower half (root = largest of lower half)
// minHeap stores the upper half (root = smallest of upper half)
package heaps

func siftUpMaxFMS(heap []int, idx int) {
	for idx > 0 {
		parentIdx := (idx - 1) / 2 // @step:sift-up
		if heap[parentIdx] >= heap[idx] {
			break // @step:compare
		}
		heap[parentIdx], heap[idx] = heap[idx], heap[parentIdx] // @step:heap-swap
		idx = parentIdx                                          // @step:sift-up
	}
}

func siftDownMaxFMS(heap []int, parentIdx int) {
	heapSize := len(heap) // @step:sift-down
	for {
		largestIdx := parentIdx              // @step:sift-down
		leftIdx := 2*parentIdx + 1          // @step:sift-down
		rightIdx := 2*parentIdx + 2         // @step:sift-down
		if leftIdx < heapSize && heap[leftIdx] > heap[largestIdx] {
			// @step:compare
			largestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < heapSize && heap[rightIdx] > heap[largestIdx] {
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

func siftUpMinFMS(heap []int, idx int) {
	for idx > 0 {
		parentIdx := (idx - 1) / 2 // @step:sift-up
		if heap[parentIdx] <= heap[idx] {
			break // @step:compare
		}
		heap[parentIdx], heap[idx] = heap[idx], heap[parentIdx] // @step:heap-swap
		idx = parentIdx                                          // @step:sift-up
	}
}

func siftDownMinFMS(heap []int, parentIdx int) {
	heapSize := len(heap) // @step:sift-down
	for {
		smallestIdx := parentIdx             // @step:sift-down
		leftIdx := 2*parentIdx + 1          // @step:sift-down
		rightIdx := 2*parentIdx + 2         // @step:sift-down
		if leftIdx < heapSize && heap[leftIdx] < heap[smallestIdx] {
			// @step:compare
			smallestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < heapSize && heap[rightIdx] < heap[smallestIdx] {
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

func findMedianStream(stream []int) []float64 {
	maxHeap := []int{}     // @step:initialize
	minHeap := []int{}     // @step:initialize
	medians := []float64{} // @step:initialize

	for _, num := range stream {
		// Insert into appropriate heap
		if len(maxHeap) == 0 || num <= maxHeap[0] {
			maxHeap = append(maxHeap, num) // @step:heap-insert
			siftUpMaxFMS(maxHeap, len(maxHeap)-1) // @step:sift-up
		} else {
			minHeap = append(minHeap, num) // @step:heap-insert
			siftUpMinFMS(minHeap, len(minHeap)-1) // @step:sift-up
		}

		// Rebalance: maxHeap can be at most 1 larger than minHeap
		if len(maxHeap) > len(minHeap)+1 {
			extracted := maxHeap[0]                      // @step:heap-extract
			maxHeap[0] = maxHeap[len(maxHeap)-1]         // @step:heap-extract
			maxHeap = maxHeap[:len(maxHeap)-1]           // @step:heap-extract
			siftDownMaxFMS(maxHeap, 0)                   // @step:sift-down
			minHeap = append(minHeap, extracted)         // @step:heap-insert
			siftUpMinFMS(minHeap, len(minHeap)-1)        // @step:sift-up
		} else if len(minHeap) > len(maxHeap) {
			extracted := minHeap[0]                      // @step:heap-extract
			minHeap[0] = minHeap[len(minHeap)-1]         // @step:heap-extract
			minHeap = minHeap[:len(minHeap)-1]           // @step:heap-extract
			siftDownMinFMS(minHeap, 0)                   // @step:sift-down
			maxHeap = append(maxHeap, extracted)         // @step:heap-insert
			siftUpMaxFMS(maxHeap, len(maxHeap)-1)        // @step:sift-up
		}

		// Compute median
		var median float64
		if len(maxHeap) == len(minHeap) {
			median = float64(maxHeap[0]+minHeap[0]) / 2.0 // @step:complete
		} else {
			median = float64(maxHeap[0]) // @step:complete
		}
		medians = append(medians, median)
	}

	return medians // @step:complete
}
