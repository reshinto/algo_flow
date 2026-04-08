package heaps

import "testing"

func isMinHeapBMnH(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		leftIdx := 2*parentIdx + 1
		rightIdx := 2*parentIdx + 2
		if leftIdx < size && array[parentIdx] > array[leftIdx] {
			return false
		}
		if rightIdx < size && array[parentIdx] > array[rightIdx] {
			return false
		}
	}
	return true
}

func TestBuildMinHeapValid(t *testing.T) {
	result := buildMinHeap([]int{9, 5, 7, 1, 3, 8, 2, 6, 4})
	if !isMinHeapBMnH(result) {
		t.Errorf("Result is not a valid min-heap: %v", result)
	}
}

func TestBuildMinHeapRootIsMin(t *testing.T) {
	result := buildMinHeap([]int{9, 5, 7, 1, 3, 8, 2, 6, 4})
	if result[0] != 1 {
		t.Errorf("Expected root=1, got %d", result[0])
	}
}

func TestBuildMinHeapAlreadyValid(t *testing.T) {
	result := buildMinHeap([]int{1, 3, 2, 7, 5, 8, 4})
	if !isMinHeapBMnH(result) || result[0] != 1 {
		t.Errorf("Expected valid min-heap with root=1, got %v", result)
	}
}

func TestBuildMinHeapReverseSorted(t *testing.T) {
	result := buildMinHeap([]int{7, 6, 5, 4, 3, 2, 1})
	if !isMinHeapBMnH(result) || result[0] != 1 {
		t.Errorf("Expected valid min-heap with root=1, got %v", result)
	}
}

func TestBuildMinHeapSingle(t *testing.T) {
	result := buildMinHeap([]int{42})
	if len(result) != 1 || result[0] != 42 {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestBuildMinHeapTwoElements(t *testing.T) {
	result := buildMinHeap([]int{5, 2})
	if result[0] != 2 || !isMinHeapBMnH(result) {
		t.Errorf("Expected min-heap with root=2, got %v", result)
	}
}
