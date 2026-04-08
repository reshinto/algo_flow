package heaps

import "testing"

func isMinHeapHDK(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		if 2*parentIdx+1 < size && array[parentIdx] > array[2*parentIdx+1] { return false }
		if 2*parentIdx+2 < size && array[parentIdx] > array[2*parentIdx+2] { return false }
	}
	return true
}

func TestHeapDecreaseKeyValidHeap(t *testing.T) {
	result := heapDecreaseKey([]int{1, 5, 3, 7, 9, 8, 6}, 3, 2)
	if !isMinHeapHDK(result) {
		t.Errorf("Not a valid min-heap: %v", result)
	}
}

func TestHeapDecreaseKeyNewValuePresent(t *testing.T) {
	result := heapDecreaseKey([]int{1, 5, 3, 7, 9, 8, 6}, 3, 2)
	hasTwo, hasSeven := false, false
	for _, val := range result {
		if val == 2 { hasTwo = true }
		if val == 7 { hasSeven = true }
	}
	if !hasTwo || hasSeven {
		t.Errorf("Expected 2 in result and 7 removed, got %v", result)
	}
}

func TestHeapDecreaseKeyNoSiftNeeded(t *testing.T) {
	result := heapDecreaseKey([]int{1, 5, 3, 7, 9, 8, 6}, 3, 6)
	if !isMinHeapHDK(result) || result[3] != 6 {
		t.Errorf("Expected min-heap with result[3]=6, got %v", result)
	}
}

func TestHeapDecreaseKeyAtRoot(t *testing.T) {
	result := heapDecreaseKey([]int{1, 5, 3, 7, 9, 8, 6}, 0, -1)
	if !isMinHeapHDK(result) || result[0] != -1 {
		t.Errorf("Expected root=-1, got %v", result)
	}
}

func TestHeapDecreaseKeyBubblesToRoot(t *testing.T) {
	result := heapDecreaseKey([]int{1, 3, 5, 7, 9, 8, 6}, 6, 0)
	if !isMinHeapHDK(result) || result[0] != 0 {
		t.Errorf("Expected root=0, got %v", result)
	}
}

func TestHeapDecreaseKeySingle(t *testing.T) {
	result := heapDecreaseKey([]int{10}, 0, 5)
	if len(result) != 1 || result[0] != 5 {
		t.Errorf("Expected [5], got %v", result)
	}
}
