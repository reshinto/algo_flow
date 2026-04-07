// Ugly Number II — find the nth ugly number (only prime factors 2, 3, 5) using a min-heap
package heaps

func siftUpUNII(heapArr []int64, currentIdx int) {
	for currentIdx > 0 {
		parentIdx := (currentIdx - 1) / 2 // @step:sift-up
		if heapArr[currentIdx] < heapArr[parentIdx] {
			// @step:compare
			heapArr[currentIdx], heapArr[parentIdx] = heapArr[parentIdx], heapArr[currentIdx] // @step:heap-swap
			currentIdx = parentIdx                                                              // @step:sift-up
		} else {
			break // @step:compare
		}
	}
}

func siftDownUNII(heapArr []int64, heapSize int, parentIdx int) {
	for {
		leftIdx := 2*parentIdx + 1      // @step:sift-down
		rightIdx := 2*parentIdx + 2     // @step:sift-down
		smallestIdx := parentIdx        // @step:sift-down
		if leftIdx < heapSize && heapArr[leftIdx] < heapArr[smallestIdx] {
			// @step:compare
			smallestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < heapSize && heapArr[rightIdx] < heapArr[smallestIdx] {
			// @step:compare
			smallestIdx = rightIdx // @step:sift-down
		}
		if smallestIdx == parentIdx {
			break // @step:sift-down
		}
		heapArr[parentIdx], heapArr[smallestIdx] = heapArr[smallestIdx], heapArr[parentIdx] // @step:heap-swap
		parentIdx = smallestIdx                                                              // @step:sift-down
	}
}

func uglyNumberIi(nthPosition int) int64 {
	heap := []int64{1}                          // @step:initialize
	seen := map[int64]bool{1: true}             // @step:initialize
	primeFactors := []int64{2, 3, 5}            // @step:initialize
	var currentUgly int64 = 1                   // @step:initialize

	for iteration := 0; iteration < nthPosition; iteration++ {
		// Extract minimum (root)
		currentUgly = heap[0]                          // @step:heap-extract
		heap[0] = heap[len(heap)-1]                    // @step:heap-extract
		heap = heap[:len(heap)-1]                      // @step:heap-extract
		siftDownUNII(heap, len(heap), 0)               // @step:sift-down
		// Generate next candidates by multiplying by 2, 3, 5
		for _, factor := range primeFactors {
			candidate := currentUgly * factor // @step:heap-insert
			if !seen[candidate] {
				seen[candidate] = true                          // @step:heap-insert
				heap = append(heap, candidate)                  // @step:heap-insert
				siftUpUNII(heap, len(heap)-1)                   // @step:sift-up
			}
		}
	}

	return currentUgly // @step:complete
}
