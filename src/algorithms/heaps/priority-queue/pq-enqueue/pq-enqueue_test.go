package heaps

import (
	"sort"
	"testing"
)

func isMinHeapPQE(array []int) bool {
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

func TestPqEnqueueIntoEmpty(t *testing.T) {
	result := pqEnqueue([]int{}, 5)
	if len(result) != 1 || result[0] != 5 {
		t.Errorf("Expected [5], got %v", result)
	}
}

func TestPqEnqueueLargerValue(t *testing.T) {
	result := pqEnqueue([]int{1, 3, 5, 7, 9, 8, 6}, 10)
	if !isMinHeapPQE(result) || len(result) != 8 {
		t.Errorf("Expected valid min-heap of length 8, got %v", result)
	}
}

func TestPqEnqueueSmallerValueBubblesToRoot(t *testing.T) {
	result := pqEnqueue([]int{1, 3, 5, 7, 9, 8, 6}, 0)
	if !isMinHeapPQE(result) || result[0] != 0 {
		t.Errorf("Expected valid min-heap with root=0, got %v", result)
	}
}

func TestPqEnqueueNewMinimum(t *testing.T) {
	result := pqEnqueue([]int{2, 5, 3, 10, 15, 8, 7}, 1)
	if !isMinHeapPQE(result) || result[0] != 1 {
		t.Errorf("Expected valid min-heap with root=1, got %v", result)
	}
}

func TestPqEnqueuePreservesLengthIncrement(t *testing.T) {
	original := []int{1, 3, 5, 7, 9, 8, 6}
	result := pqEnqueue(original, 4)
	if len(result) != len(original)+1 {
		t.Errorf("Expected length %d, got %d", len(original)+1, len(result))
	}
}

func TestPqEnqueueAllElementsPresent(t *testing.T) {
	original := []int{1, 3, 5, 7, 9, 8, 6}
	result := pqEnqueue(original, 4)
	sortedResult := make([]int, len(result))
	copy(sortedResult, result)
	sort.Ints(sortedResult)
	expected := append(append([]int{}, original...), 4)
	sort.Ints(expected)
	for idx, val := range expected {
		if sortedResult[idx] != val {
			t.Errorf("Elements mismatch at index %d", idx)
		}
	}
}

func TestPqEnqueueSingleElementSmallerValue(t *testing.T) {
	result := pqEnqueue([]int{5}, 2)
	if len(result) != 2 || result[0] != 2 {
		t.Errorf("Expected [2, 5], got %v", result)
	}
}

func TestPqEnqueueDuplicateValue(t *testing.T) {
	result := pqEnqueue([]int{1, 3, 5}, 3)
	if !isMinHeapPQE(result) {
		t.Errorf("Expected valid min-heap, got %v", result)
	}
	count := 0
	for _, val := range result {
		if val == 3 {
			count++
		}
	}
	if count != 2 {
		t.Errorf("Expected two 3s, got %d", count)
	}
}
