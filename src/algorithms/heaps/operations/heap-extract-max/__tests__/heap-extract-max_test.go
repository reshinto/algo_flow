package heaps

import "testing"

func isMaxHeapHEM(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		if 2*parentIdx+1 < size && array[parentIdx] < array[2*parentIdx+1] { return false }
		if 2*parentIdx+2 < size && array[parentIdx] < array[2*parentIdx+2] { return false }
	}
	return true
}

func TestHeapExtractMaxValue(t *testing.T) {
	result := heapExtractMax([]int{9, 7, 8, 3, 5, 6, 1})
	if result.extractedValue != 9 {
		t.Errorf("Expected extractedValue=9, got %d", result.extractedValue)
	}
}

func TestHeapExtractMaxRemainingIsMaxHeap(t *testing.T) {
	result := heapExtractMax([]int{9, 7, 8, 3, 5, 6, 1})
	if !isMaxHeapHEM(result.remainingHeap) {
		t.Errorf("Remaining is not a valid max-heap: %v", result.remainingHeap)
	}
}

func TestHeapExtractMaxRemainingLength(t *testing.T) {
	result := heapExtractMax([]int{9, 7, 8, 3, 5, 6, 1})
	if len(result.remainingHeap) != 6 {
		t.Errorf("Expected remaining length 6, got %d", len(result.remainingHeap))
	}
}

func TestHeapExtractMaxNewRoot(t *testing.T) {
	result := heapExtractMax([]int{9, 7, 8, 3, 5, 6, 1})
	if result.remainingHeap[0] != 8 {
		t.Errorf("Expected new root=8, got %d", result.remainingHeap[0])
	}
}

func TestHeapExtractMaxTwoElement(t *testing.T) {
	result := heapExtractMax([]int{8, 3})
	if result.extractedValue != 8 || len(result.remainingHeap) != 1 || result.remainingHeap[0] != 3 {
		t.Errorf("Expected {8, [3]}, got %v", result)
	}
}

func TestHeapExtractMaxSingle(t *testing.T) {
	result := heapExtractMax([]int{99})
	if result.extractedValue != 99 || len(result.remainingHeap) != 0 {
		t.Errorf("Expected {99, []}, got %v", result)
	}
}
