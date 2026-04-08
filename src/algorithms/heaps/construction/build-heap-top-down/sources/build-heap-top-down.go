// Build Heap Top-Down — build a min-heap by inserting elements one-by-one with sift-up
package heaps

func siftUpBHTD(heap []int, childIdx int) {
	for childIdx > 0 {
		parentIdx := (childIdx - 1) / 2 // @step:sift-up
		// If child is smaller than parent, swap to restore min-heap property
		if heap[childIdx] < heap[parentIdx] {
			// @step:sift-up
			heap[childIdx], heap[parentIdx] = heap[parentIdx], heap[childIdx] // @step:heap-swap
			childIdx = parentIdx                                               // @step:sift-up
		} else {
			break // @step:sift-up
		}
	}
}

func buildHeapTopDown(inputArray []int) []int {
	heap := []int{} // @step:initialize
	// Insert each element at the end and restore heap property by sifting up
	for _, value := range inputArray {
		heap = append(heap, value)    // @step:heap-insert
		siftUpBHTD(heap, len(heap)-1) // @step:sift-up
	}
	return heap // @step:complete
}
