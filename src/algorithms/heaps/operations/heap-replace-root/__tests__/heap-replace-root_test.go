package heaps

import "testing"

func isMinHeapHRR(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		if 2*parentIdx+1 < size && array[parentIdx] > array[2*parentIdx+1] { return false }
		if 2*parentIdx+2 < size && array[parentIdx] > array[2*parentIdx+2] { return false }
	}
	return true
}

func TestHeapReplaceRootReplacedValue(t *testing.T) {
	result := heapReplaceRoot([]int{1, 3, 5, 7, 9, 8, 6}, 10)
	if result.replacedValue != 1 {
		t.Errorf("Expected replacedValue=1, got %d", result.replacedValue)
	}
}

func TestHeapReplaceRootValidMinHeap(t *testing.T) {
	result := heapReplaceRoot([]int{1, 3, 5, 7, 9, 8, 6}, 10)
	if !isMinHeapHRR(result.newHeap) {
		t.Errorf("newHeap is not a valid min-heap: %v", result.newHeap)
	}
}

func TestHeapReplaceRootNewValuePresent(t *testing.T) {
	result := heapReplaceRoot([]int{1, 3, 5, 7, 9, 8, 6}, 10)
	hasTen, hasOne := false, false
	for _, val := range result.newHeap {
		if val == 10 { hasTen = true }
		if val == 1 { hasOne = true }
	}
	if !hasTen || hasOne {
		t.Errorf("Expected 10 present and 1 removed, got %v", result.newHeap)
	}
}

func TestHeapReplaceRootSmallValueAtRoot(t *testing.T) {
	result := heapReplaceRoot([]int{1, 3, 5, 7, 9, 8, 6}, 2)
	if result.replacedValue != 1 || result.newHeap[0] != 2 {
		t.Errorf("Expected replacedValue=1, newRoot=2, got %v", result)
	}
}

func TestHeapReplaceRootLargeValueSinks(t *testing.T) {
	result := heapReplaceRoot([]int{1, 3, 5, 7, 9, 8, 6}, 100)
	if !isMinHeapHRR(result.newHeap) || result.newHeap[0] == 100 {
		t.Errorf("Expected valid min-heap without 100 at root, got %v", result)
	}
}

func TestHeapReplaceRootSingle(t *testing.T) {
	result := heapReplaceRoot([]int{42}, 7)
	if result.replacedValue != 42 || len(result.newHeap) != 1 || result.newHeap[0] != 7 {
		t.Errorf("Expected {42, [7]}, got %v", result)
	}
}
