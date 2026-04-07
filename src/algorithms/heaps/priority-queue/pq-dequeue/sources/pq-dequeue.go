// PQ Dequeue — remove and return the highest-priority (smallest) element from a min-heap priority queue
package heaps

type dequeueResult struct {
	dequeuedValue  int
	remainingQueue []int
}

func pqDequeue(priorityQueue []int) dequeueResult {
	queue := make([]int, len(priorityQueue)) // @step:initialize
	copy(queue, priorityQueue)
	dequeuedValue := queue[0]            // @step:heap-extract
	lastIdx := len(queue) - 1            // @step:heap-extract
	// Move last element to root and remove the last position
	queue[0], queue[lastIdx] = queue[lastIdx], queue[0] // @step:heap-swap
	queue = queue[:lastIdx]                              // @step:heap-extract
	// Sift down the new root to restore heap property
	size := len(queue)
	parentIdx := 0 // @step:sift-down
	for {
		// @step:sift-down
		smallestIdx := parentIdx     // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		// Find the smallest among parent, left child, and right child
		if leftIdx < size && queue[leftIdx] < queue[smallestIdx] {
			// @step:compare
			smallestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < size && queue[rightIdx] < queue[smallestIdx] {
			// @step:compare
			smallestIdx = rightIdx // @step:sift-down
		}
		if smallestIdx == parentIdx {
			break // @step:sift-down
		}
		// Swap parent with highest-priority child
		queue[parentIdx], queue[smallestIdx] = queue[smallestIdx], queue[parentIdx] // @step:heap-swap
		parentIdx = smallestIdx                                                      // @step:sift-down
	}
	return dequeueResult{dequeuedValue, queue} // @step:complete
}
