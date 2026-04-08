package heaps

import "testing"

func isMinHeapHI(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		if 2*parentIdx+1 < size && array[parentIdx] > array[2*parentIdx+1] { return false }
		if 2*parentIdx+2 < size && array[parentIdx] > array[2*parentIdx+2] { return false }
	}
	return true
}

func TestHeapInsertValidHeap(t *testing.T) {
	result := heapInsert([]int{1, 3, 5, 7, 9, 8, 6}, 2)
	if !isMinHeapHI(result) {
		t.Errorf("Not a valid min-heap: %v", result)
	}
}

func TestHeapInsertRootRemains(t *testing.T) {
	result := heapInsert([]int{1, 3, 5, 7, 9, 8, 6}, 2)
	if result[0] != 1 {
		t.Errorf("Expected root=1, got %d", result[0])
	}
}

func TestHeapInsertNewMinimum(t *testing.T) {
	result := heapInsert([]int{3, 5, 7, 9}, 1)
	if result[0] != 1 || !isMinHeapHI(result) {
		t.Errorf("Expected root=1 in valid min-heap, got %v", result)
	}
}

func TestHeapInsertLargerThanAll(t *testing.T) {
	result := heapInsert([]int{1, 3, 5, 7}, 100)
	if result[0] != 1 || !isMinHeapHI(result) {
		t.Errorf("Expected root=1, got %v", result)
	}
}

func TestHeapInsertLengthIncreased(t *testing.T) {
	result := heapInsert([]int{1, 3, 5, 7, 9, 8, 6}, 2)
	if len(result) != 8 {
		t.Errorf("Expected length 8, got %d", len(result))
	}
}

func TestHeapInsertIntoSingle(t *testing.T) {
	result := heapInsert([]int{5}, 3)
	if result[0] != 3 || !isMinHeapHI(result) {
		t.Errorf("Expected root=3, got %v", result)
	}
}

func TestHeapInsertIntoEmpty(t *testing.T) {
	result := heapInsert([]int{}, 42)
	if len(result) != 1 || result[0] != 42 {
		t.Errorf("Expected [42], got %v", result)
	}
}
