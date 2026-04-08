package heaps

import "testing"

func isMaxHeapBMH(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		leftIdx := 2*parentIdx + 1
		rightIdx := 2*parentIdx + 2
		if leftIdx < size && array[parentIdx] < array[leftIdx] {
			return false
		}
		if rightIdx < size && array[parentIdx] < array[rightIdx] {
			return false
		}
	}
	return true
}

func TestBuildMaxHeapValid(t *testing.T) {
	result := buildMaxHeap([]int{9, 5, 7, 1, 3, 8, 2, 6, 4})
	if !isMaxHeapBMH(result) {
		t.Errorf("Result is not a valid max-heap: %v", result)
	}
}

func TestBuildMaxHeapRootIsMax(t *testing.T) {
	result := buildMaxHeap([]int{9, 5, 7, 1, 3, 8, 2, 6, 4})
	if result[0] != 9 {
		t.Errorf("Expected root=9, got %d", result[0])
	}
}

func TestBuildMaxHeapAlreadyValid(t *testing.T) {
	result := buildMaxHeap([]int{9, 7, 8, 5, 6, 3, 4})
	if !isMaxHeapBMH(result) || result[0] != 9 {
		t.Errorf("Expected valid max-heap with root=9, got %v", result)
	}
}

func TestBuildMaxHeapSortedAscending(t *testing.T) {
	result := buildMaxHeap([]int{1, 2, 3, 4, 5, 6, 7})
	if !isMaxHeapBMH(result) || result[0] != 7 {
		t.Errorf("Expected valid max-heap with root=7, got %v", result)
	}
}

func TestBuildMaxHeapSingle(t *testing.T) {
	result := buildMaxHeap([]int{42})
	if len(result) != 1 || result[0] != 42 {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestBuildMaxHeapTwoElements(t *testing.T) {
	result := buildMaxHeap([]int{2, 5})
	if result[0] != 5 || !isMaxHeapBMH(result) {
		t.Errorf("Expected max-heap with root=5, got %v", result)
	}
}
