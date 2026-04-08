// Task Scheduler Heap — minimum intervals to complete all tasks with cooldown (LeetCode 621)
package heaps

func siftUpTSH(arr []int, currentIdx int) {
	for currentIdx > 0 {
		parentIdx := (currentIdx - 1) / 2 // @step:sift-up
		if arr[parentIdx] >= arr[currentIdx] {
			break // @step:compare
		}
		arr[parentIdx], arr[currentIdx] = arr[currentIdx], arr[parentIdx] // @step:heap-swap
		currentIdx = parentIdx                                             // @step:sift-up
	}
}

func siftDownTSH(arr []int, parentIdx int) {
	for {
		largestIdx := parentIdx      // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		if leftIdx < len(arr) && arr[leftIdx] > arr[largestIdx] {
			// @step:compare
			largestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < len(arr) && arr[rightIdx] > arr[largestIdx] {
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

func taskSchedulerHeap(tasks []rune, cooldown int) int {
	// Count task frequencies
	frequencyMap := map[rune]int{} // @step:initialize
	for _, taskName := range tasks {
		frequencyMap[taskName]++ // @step:initialize
	}

	// Build max-heap of frequencies
	heap := []int{} // @step:initialize
	for _, frequency := range frequencyMap {
		heap = append(heap, frequency) // @step:heap-insert
	}

	// Heapify
	for startIdx := len(heap)/2 - 1; startIdx >= 0; startIdx-- {
		siftDownTSH(heap, startIdx) // @step:sift-down
	}

	totalIntervals := 0 // @step:initialize

	for len(heap) > 0 {
		cycleSize := cooldown + 1 // @step:initialize
		roundTasks := []int{}     // @step:initialize

		// Extract up to cooldown+1 tasks this round
		for slotIndex := 0; slotIndex < cycleSize && len(heap) > 0; slotIndex++ {
			maxFrequency := heap[0]                      // @step:heap-extract
			heap[0] = heap[len(heap)-1]                  // @step:heap-swap
			heap = heap[:len(heap)-1]                    // @step:heap-extract
			if len(heap) > 0 {
				siftDownTSH(heap, 0) // @step:sift-down
			}
			roundTasks = append(roundTasks, maxFrequency-1) // @step:compare
		}

		// Reinsert tasks with remaining frequency
		for _, remainingFrequency := range roundTasks {
			if remainingFrequency > 0 {
				heap = append(heap, remainingFrequency) // @step:heap-insert
				siftUpTSH(heap, len(heap)-1)
			}
		}

		// Add full cycle or just the tasks if this is the last round
		if len(heap) > 0 {
			totalIntervals += cycleSize // @step:compare
		} else {
			totalIntervals += len(roundTasks) // @step:compare
		}
	}

	return totalIntervals // @step:complete
}
