// PQ Change Priority — update element priority at a given index, then restore heap order via sift-up or sift-down
package heaps

func pqChangePriority(priorityQueue []int, targetIndex int, newValue int) []int {
	queue := make([]int, len(priorityQueue)) // @step:initialize
	copy(queue, priorityQueue)
	oldValue := queue[targetIndex] // @step:heap-update
	queue[targetIndex] = newValue  // @step:heap-update

	if newValue < oldValue {
		// Priority increased (value decreased) — sift up
		currentIdx := targetIndex // @step:sift-up
		for currentIdx > 0 {
			// @step:sift-up
			parentIdx := (currentIdx - 1) / 2 // @step:sift-up
			if queue[currentIdx] >= queue[parentIdx] {
				break // @step:compare
			}
			queue[currentIdx], queue[parentIdx] = queue[parentIdx], queue[currentIdx] // @step:heap-swap
			currentIdx = parentIdx                                                     // @step:sift-up
		}
	} else {
		// Priority decreased (value increased) — sift down
		parentIdx := targetIndex // @step:sift-down
		size := len(queue)
		for {
			// @step:sift-down
			smallestIdx := parentIdx     // @step:sift-down
			leftIdx := 2*parentIdx + 1  // @step:sift-down
			rightIdx := 2*parentIdx + 2 // @step:sift-down
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
			queue[parentIdx], queue[smallestIdx] = queue[smallestIdx], queue[parentIdx] // @step:heap-swap
			parentIdx = smallestIdx                                                      // @step:sift-down
		}
	}

	return queue // @step:complete
}
