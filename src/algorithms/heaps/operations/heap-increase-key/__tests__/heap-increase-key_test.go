package heaps

import "testing"

func isMinHeapHIK(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		if 2*parentIdx+1 < size && array[parentIdx] > array[2*parentIdx+1] { return false }
		if 2*parentIdx+2 < size && array[parentIdx] > array[2*parentIdx+2] { return false }
	}
	return true
}

func TestHeapIncreaseKeyValidHeap(t *testing.T) {
	result := heapIncreaseKey([]int{1, 3, 5, 7, 9, 8, 6}, 1, 10)
	if !isMinHeapHIK(result) {
		t.Errorf("Not a valid min-heap: %v", result)
	}
}

func TestHeapIncreaseKeyNewValuePresent(t *testing.T) {
	result := heapIncreaseKey([]int{1, 3, 5, 7, 9, 8, 6}, 1, 10)
	hasTen, hasThree := false, false
	for _, val := range result {
		if val == 10 { hasTen = true }
		if val == 3 { hasThree = true }
	}
	if !hasTen || hasThree {
		t.Errorf("Expected 10 present and 3 removed, got %v", result)
	}
}

func TestHeapIncreaseKeyNoSift(t *testing.T) {
	result := heapIncreaseKey([]int{1, 3, 5, 7, 9, 8, 6}, 1, 5)
	if !isMinHeapHIK(result) || result[1] != 5 {
		t.Errorf("Expected min-heap with result[1]=5, got %v", result)
	}
}

func TestHeapIncreaseKeyRootSiftsDown(t *testing.T) {
	result := heapIncreaseKey([]int{1, 3, 5, 7, 9, 8, 6}, 0, 20)
	if !isMinHeapHIK(result) || result[0] == 20 {
		t.Errorf("Expected root!=20 in valid min-heap, got %v", result)
	}
}

func TestHeapIncreaseKeyLeaf(t *testing.T) {
	result := heapIncreaseKey([]int{1, 3, 5, 7, 9, 8, 6}, 6, 100)
	hasHundred := false
	for _, val := range result {
		if val == 100 { hasHundred = true }
	}
	if !isMinHeapHIK(result) || !hasHundred {
		t.Errorf("Expected valid min-heap with 100, got %v", result)
	}
}

func TestHeapIncreaseKeySingle(t *testing.T) {
	result := heapIncreaseKey([]int{5}, 0, 10)
	if len(result) != 1 || result[0] != 10 {
		t.Errorf("Expected [10], got %v", result)
	}
}
