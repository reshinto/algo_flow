// PQ Enqueue — insert an element into a min-heap-based priority queue and restore heap order via sift-up
package heaps

func pqEnqueue(priorityQueue []int, value int) []int {
	queue := make([]int, len(priorityQueue)) // @step:initialize
	copy(queue, priorityQueue)
	queue = append(queue, value)  // @step:heap-insert
	currentIdx := len(queue) - 1 // @step:heap-insert
	// Sift up: bubble the new element toward the root until heap property holds
	for currentIdx > 0 {
		// @step:sift-up
		parentIdx := (currentIdx - 1) / 2 // @step:sift-up
		if queue[currentIdx] >= queue[parentIdx] {
			break // @step:compare
		}
		// New element has higher priority (smaller value) — swap with parent
		queue[currentIdx], queue[parentIdx] = queue[parentIdx], queue[currentIdx] // @step:heap-swap
		currentIdx = parentIdx                                                     // @step:sift-up
	}
	return queue // @step:complete
}
