package heaps

import "testing"

func isMinHeapHEM(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		if 2*parentIdx+1 < size && array[parentIdx] > array[2*parentIdx+1] { return false }
		if 2*parentIdx+2 < size && array[parentIdx] > array[2*parentIdx+2] { return false }
	}
	return true
}

func TestHeapExtractMinValue(t *testing.T) {
	result := heapExtractMin([]int{1, 3, 5, 7, 9, 8, 6})
	if result.extractedValue != 1 {
		t.Errorf("Expected extractedValue=1, got %d", result.extractedValue)
	}
}

func TestHeapExtractMinRemainingIsMinHeap(t *testing.T) {
	result := heapExtractMin([]int{1, 3, 5, 7, 9, 8, 6})
	if !isMinHeapHEM(result.remainingHeap) {
		t.Errorf("Remaining is not a valid min-heap: %v", result.remainingHeap)
	}
}

func TestHeapExtractMinRemainingLength(t *testing.T) {
	result := heapExtractMin([]int{1, 3, 5, 7, 9, 8, 6})
	if len(result.remainingHeap) != 6 {
		t.Errorf("Expected remaining length 6, got %d", len(result.remainingHeap))
	}
}

func TestHeapExtractMinNewRoot(t *testing.T) {
	result := heapExtractMin([]int{1, 3, 5, 7, 9, 8, 6})
	if result.remainingHeap[0] != 3 {
		t.Errorf("Expected new root=3, got %d", result.remainingHeap[0])
	}
}

func TestHeapExtractMinTwoElement(t *testing.T) {
	result := heapExtractMin([]int{2, 5})
	if result.extractedValue != 2 || len(result.remainingHeap) != 1 || result.remainingHeap[0] != 5 {
		t.Errorf("Expected {2, [5]}, got %v", result)
	}
}

func TestHeapExtractMinSingle(t *testing.T) {
	result := heapExtractMin([]int{42})
	if result.extractedValue != 42 || len(result.remainingHeap) != 0 {
		t.Errorf("Expected {42, []}, got %v", result)
	}
}
