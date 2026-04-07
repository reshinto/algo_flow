// Heap Insert — append a value to a min-heap and restore heap property via sift-up
package heaps

func heapInsert(heapArray []int, value int) []int {
	array := make([]int, len(heapArray)) // @step:initialize
	copy(array, heapArray)
	array = append(array, value) // @step:heap-insert
	currentIdx := len(array) - 1 // @step:heap-insert
	// Sift up: while not at root, compare with parent and swap if smaller
	for currentIdx > 0 {
		// @step:sift-up
		parentIdx := (currentIdx - 1) / 2 // @step:sift-up
		if array[currentIdx] >= array[parentIdx] {
			break // @step:sift-up
		}
		// Swap with parent to restore heap property
		array[currentIdx], array[parentIdx] = array[parentIdx], array[currentIdx] // @step:heap-swap
		currentIdx = parentIdx                                                     // @step:sift-up
	}
	return array // @step:complete
}
