// Reorganize String — rearrange string so no two adjacent characters are the same (LeetCode 767)
package heaps

type charEntry struct {
	frequency int
	character rune
}

func siftUpRS(arr []charEntry, currentIdx int) {
	for currentIdx > 0 {
		parentIdx := (currentIdx - 1) / 2 // @step:sift-up
		if arr[parentIdx].frequency >= arr[currentIdx].frequency {
			break // @step:compare
		}
		arr[parentIdx], arr[currentIdx] = arr[currentIdx], arr[parentIdx] // @step:heap-swap
		currentIdx = parentIdx                                             // @step:sift-up
	}
}

func siftDownRS(arr []charEntry, parentIdx int) {
	for {
		largestIdx := parentIdx      // @step:sift-down
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		if leftIdx < len(arr) && arr[leftIdx].frequency > arr[largestIdx].frequency {
			// @step:compare
			largestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < len(arr) && arr[rightIdx].frequency > arr[largestIdx].frequency {
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

func reorganizeString(text string) string {
	// Count character frequencies
	frequencyMap := map[rune]int{} // @step:initialize
	for _, character := range text {
		frequencyMap[character]++ // @step:initialize
	}

	// Build max-heap entries: (frequency, character)
	heap := []charEntry{} // @step:initialize
	for character, frequency := range frequencyMap {
		heap = append(heap, charEntry{frequency, character}) // @step:heap-insert
	}

	// Heapify
	for startIdx := len(heap)/2 - 1; startIdx >= 0; startIdx-- {
		siftDownRS(heap, startIdx) // @step:sift-down
	}

	result := ""                          // @step:initialize
	var prevEntry *charEntry = nil        // @step:initialize

	for len(heap) > 0 {
		// Extract most frequent
		topEntry := heap[0]              // @step:heap-extract
		heap[0] = heap[len(heap)-1]      // @step:heap-swap
		heap = heap[:len(heap)-1]        // @step:heap-extract
		if len(heap) > 0 {
			siftDownRS(heap, 0) // @step:sift-down
		}

		result += string(topEntry.character) // @step:heap-extract
		topEntry.frequency--                 // @step:heap-extract

		// Reinsert previous entry if it still has frequency
		if prevEntry != nil && prevEntry.frequency > 0 {
			heap = append(heap, *prevEntry)    // @step:heap-insert
			siftUpRS(heap, len(heap)-1) // @step:sift-up
		}

		// Hold current entry for next iteration to prevent adjacency
		if topEntry.frequency > 0 { // @step:compare
			prevEntry = &charEntry{topEntry.frequency, topEntry.character}
		} else {
			prevEntry = nil
		}

		// Impossible case: same character would be adjacent
		if len(heap) == 0 && prevEntry != nil {
			return "" // @step:complete
		}
	}

	return result // @step:complete
}
