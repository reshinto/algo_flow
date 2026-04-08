// Meeting Rooms II — find minimum number of meeting rooms required using a min-heap of end times
package heaps

import "sort"

func meetingRoomsII(intervals [][2]int) int {
	if len(intervals) == 0 {
		return 0 // @step:initialize
	}

	// Sort meetings by start time
	sorted := make([][2]int, len(intervals)) // @step:initialize
	copy(sorted, intervals)
	sort.Slice(sorted, func(a, b int) bool { return sorted[a][0] < sorted[b][0] }) // @step:initialize

	// Min-heap tracking end times of active meetings
	endTimeHeap := []int{} // @step:initialize

	for _, meeting := range sorted {
		startTime := meeting[0]
		endTime := meeting[1]

		if len(endTimeHeap) > 0 && endTimeHeap[0] <= startTime {
			// A room is free — extract its end time and reuse the room
			endTimeHeap[0] = endTimeHeap[len(endTimeHeap)-1]   // @step:heap-extract
			endTimeHeap = endTimeHeap[:len(endTimeHeap)-1]      // @step:heap-extract
			// Sift down to restore min-heap property
			parentIdx := 0 // @step:sift-down
			for {
				smallestIdx := parentIdx              // @step:sift-down
				leftIdx := 2*parentIdx + 1           // @step:sift-down
				rightIdx := 2*parentIdx + 2          // @step:sift-down
				if leftIdx < len(endTimeHeap) && endTimeHeap[leftIdx] < endTimeHeap[smallestIdx] {
					// @step:compare
					smallestIdx = leftIdx
				}
				if rightIdx < len(endTimeHeap) && endTimeHeap[rightIdx] < endTimeHeap[smallestIdx] {
					// @step:compare
					smallestIdx = rightIdx
				}
				if smallestIdx == parentIdx {
					break // @step:sift-down
				}
				endTimeHeap[parentIdx], endTimeHeap[smallestIdx] = endTimeHeap[smallestIdx], endTimeHeap[parentIdx] // @step:heap-swap
				parentIdx = smallestIdx                                                                              // @step:sift-down
			}
		}

		// Insert current meeting's end time into the heap (allocate room)
		endTimeHeap = append(endTimeHeap, endTime) // @step:heap-insert
		currentIdx := len(endTimeHeap) - 1         // @step:heap-insert
		// Sift up to restore min-heap property
		for currentIdx > 0 {
			// @step:sift-up
			parentIdx := (currentIdx - 1) / 2 // @step:sift-up
			if endTimeHeap[currentIdx] >= endTimeHeap[parentIdx] {
				break // @step:compare
			}
			endTimeHeap[currentIdx], endTimeHeap[parentIdx] = endTimeHeap[parentIdx], endTimeHeap[currentIdx] // @step:heap-swap
			currentIdx = parentIdx                                                                             // @step:sift-up
		}
	}

	return len(endTimeHeap) // @step:complete
}
