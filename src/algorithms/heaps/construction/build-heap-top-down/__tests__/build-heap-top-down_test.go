package heaps

import "testing"

func isMinHeapBHTD(array []int) bool {
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

func TestBuildHeapTopDownValidMinHeap(t *testing.T) {
	result := buildHeapTopDown([]int{9, 5, 7, 1, 3, 8, 2, 6, 4})
	if !isMinHeapBHTD(result) {
		t.Errorf("Result is not a valid min-heap: %v", result)
	}
}

func TestBuildHeapTopDownRootIsMin(t *testing.T) {
	result := buildHeapTopDown([]int{9, 5, 7, 1, 3, 8, 2, 6, 4})
	if result[0] != 1 {
		t.Errorf("Expected root=1, got %d", result[0])
	}
}

func TestBuildHeapTopDownAlreadySorted(t *testing.T) {
	result := buildHeapTopDown([]int{1, 2, 3, 4, 5, 6, 7})
	if !isMinHeapBHTD(result) || result[0] != 1 {
		t.Errorf("Expected valid min-heap with root=1, got %v", result)
	}
}

func TestBuildHeapTopDownReverseSorted(t *testing.T) {
	result := buildHeapTopDown([]int{7, 6, 5, 4, 3, 2, 1})
	if !isMinHeapBHTD(result) || result[0] != 1 {
		t.Errorf("Expected valid min-heap with root=1, got %v", result)
	}
}

func TestBuildHeapTopDownSingle(t *testing.T) {
	result := buildHeapTopDown([]int{42})
	if len(result) != 1 || result[0] != 42 {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestBuildHeapTopDownTwoElements(t *testing.T) {
	result := buildHeapTopDown([]int{5, 2})
	if result[0] != 2 || !isMinHeapBHTD(result) {
		t.Errorf("Expected min-heap with root=2, got %v", result)
	}
}
