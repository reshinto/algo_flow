package heaps

import "testing"

func isMinHeapPCP(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		if 2*parentIdx+1 < size && array[parentIdx] > array[2*parentIdx+1] {
			return false
		}
		if 2*parentIdx+2 < size && array[parentIdx] > array[2*parentIdx+2] {
			return false
		}
	}
	return true
}

func TestPqChangePriorityDecreaseBubblesToRoot(t *testing.T) {
	result := pqChangePriority([]int{2, 5, 3, 10, 15, 8, 7}, 4, 1)
	if !isMinHeapPCP(result) || result[0] != 1 {
		t.Errorf("Expected valid min-heap with root=1, got %v", result)
	}
}

func TestPqChangePriorityIncreaseOldRootSinks(t *testing.T) {
	result := pqChangePriority([]int{2, 5, 3, 10, 15, 8, 7}, 0, 20)
	if !isMinHeapPCP(result) || result[0] != 3 {
		t.Errorf("Expected valid min-heap with root=3, got %v", result)
	}
}

func TestPqChangePriorityDecreaseLastToNewMin(t *testing.T) {
	result := pqChangePriority([]int{1, 3, 5, 7, 9, 8, 6}, 6, 0)
	if !isMinHeapPCP(result) || result[0] != 0 {
		t.Errorf("Expected valid min-heap with root=0, got %v", result)
	}
}

func TestPqChangePriorityIncreaseLastElement(t *testing.T) {
	result := pqChangePriority([]int{1, 3, 5, 7, 9}, 4, 100)
	if !isMinHeapPCP(result) {
		t.Errorf("Expected valid min-heap, got %v", result)
	}
}

func TestPqChangePrioritySameValue(t *testing.T) {
	result := pqChangePriority([]int{2, 5, 3, 10, 15, 8, 7}, 2, 3)
	if !isMinHeapPCP(result) {
		t.Errorf("Expected valid min-heap after no-op change, got %v", result)
	}
}

func TestPqChangePriorityPreservesLength(t *testing.T) {
	result := pqChangePriority([]int{2, 5, 3, 10, 15, 8, 7}, 3, 0)
	if len(result) != 7 {
		t.Errorf("Expected length 7, got %d", len(result))
	}
}

func TestPqChangePrioritySingleElement(t *testing.T) {
	result := pqChangePriority([]int{5}, 0, 99)
	if len(result) != 1 || result[0] != 99 {
		t.Errorf("Expected [99], got %v", result)
	}
}
