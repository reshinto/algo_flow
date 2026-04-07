// K Closest Points to Origin — use a max-heap of size k (by distance²) to find the k nearest points
package heaps

type pointEntry struct {
	dist  int
	point [2]int
}

func distanceSquaredKCP(point [2]int) int {
	return point[0]*point[0] + point[1]*point[1] // @step:initialize
}

func siftUpKCP(heap []pointEntry, currentIdx int) {
	for currentIdx > 0 {
		parentIdx := (currentIdx - 1) / 2 // @step:sift-up
		if heap[currentIdx].dist > heap[parentIdx].dist {
			// @step:compare
			heap[currentIdx], heap[parentIdx] = heap[parentIdx], heap[currentIdx] // @step:heap-swap
			currentIdx = parentIdx                                                 // @step:sift-up
		} else {
			break // @step:compare
		}
	}
}

func siftDownKCP(heap []pointEntry, heapSize int, parentIdx int) {
	for {
		leftIdx := 2*parentIdx + 1  // @step:sift-down
		rightIdx := 2*parentIdx + 2 // @step:sift-down
		largestIdx := parentIdx     // @step:sift-down
		if leftIdx < heapSize && heap[leftIdx].dist > heap[largestIdx].dist {
			// @step:compare
			largestIdx = leftIdx // @step:sift-down
		}
		if rightIdx < heapSize && heap[rightIdx].dist > heap[largestIdx].dist {
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

func kClosestPoints(points [][2]int, kValue int) [][2]int {
	heap := []pointEntry{} // @step:initialize

	for _, point := range points {
		dist := distanceSquaredKCP(point) // @step:heap-insert
		if len(heap) < kValue {
			heap = append(heap, pointEntry{dist, point}) // @step:heap-insert
			siftUpKCP(heap, len(heap)-1)                 // @step:sift-up
		} else if len(heap) > 0 && dist < heap[0].dist {
			// Current point is closer than the farthest in heap — replace root
			heap[0] = pointEntry{dist, point}    // @step:heap-extract
			siftDownKCP(heap, len(heap), 0) // @step:sift-down
		}
	}

	result := make([][2]int, len(heap)) // @step:complete
	for idx, entry := range heap {
		result[idx] = entry.point
	}
	return result // @step:complete
}
