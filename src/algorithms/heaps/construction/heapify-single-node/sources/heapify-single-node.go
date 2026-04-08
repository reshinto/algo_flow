// Heapify Single Node — demonstrate sift-down on a single subtree root to its correct position
package heaps

func siftDownHSN(array []int, startIdx int, size int) {
	parentIdx := startIdx // @step:sift-down
	for {
		smallestIdx := parentIdx     // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		// Find the smallest among parent, left child, and right child
		if leftIdx < size && array[leftIdx] < array[smallestIdx] {
			// @step:sift-down
			smallestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < size && array[rightIdx] < array[smallestIdx] {
			// @step:sift-down
			smallestIdx = rightIdx // @step:sift-down
		}
		if smallestIdx == parentIdx {
			break // @step:sift-down
		}
		// Swap parent with the smallest child
		array[parentIdx], array[smallestIdx] = array[smallestIdx], array[parentIdx] // @step:heap-swap
		parentIdx = smallestIdx                                                      // @step:sift-down
	}
}

func heapifySingleNode(inputArray []int, targetIndex int) []int {
	array := make([]int, len(inputArray)) // @step:initialize
	copy(array, inputArray)
	size := len(array)                 // @step:initialize
	siftDownHSN(array, targetIndex, size) // @step:sift-down
	return array                       // @step:complete
}
