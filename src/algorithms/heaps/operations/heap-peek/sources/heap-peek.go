// Heap Peek — return the minimum element (root) from a min-heap without removing it
package heaps

func heapPeek(heapArray []int) (int, bool) {
	array := make([]int, len(heapArray)) // @step:initialize
	copy(array, heapArray)
	// The root at index 0 is always the minimum in a valid min-heap
	if len(array) == 0 {
		return 0, false
	}
	minimumValue := array[0] // @step:visit
	return minimumValue, true // @step:complete
}
