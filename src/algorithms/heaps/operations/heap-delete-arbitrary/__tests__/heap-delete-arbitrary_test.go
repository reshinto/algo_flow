package heaps

import (
	"sort"
	"testing"
)

func isMinHeapHDA(array []int) bool {
	size := len(array)
	for parentIdx := 0; parentIdx < size/2; parentIdx++ {
		if 2*parentIdx+1 < size && array[parentIdx] > array[2*parentIdx+1] { return false }
		if 2*parentIdx+2 < size && array[parentIdx] > array[2*parentIdx+2] { return false }
	}
	return true
}

func TestHeapDeleteArbitraryMaintainsHeap(t *testing.T) {
	result := heapDeleteArbitrary([]int{1, 3, 5, 7, 9, 8, 6}, 2)
	if !isMinHeapHDA(result) || len(result) != 6 {
		t.Errorf("Expected valid min-heap of length 6, got %v", result)
	}
}

func TestHeapDeleteArbitraryCorrectElements(t *testing.T) {
	result := heapDeleteArbitrary([]int{1, 3, 5, 7, 9, 8, 6}, 2)
	sorted := append([]int{}, result...)
	sort.Ints(sorted)
	expected := []int{1, 3, 6, 7, 8, 9}
	for idx, val := range expected {
		if sorted[idx] != val {
			t.Errorf("Expected %v, got %v", expected, sorted)
			break
		}
	}
}

func TestHeapDeleteArbitraryRoot(t *testing.T) {
	result := heapDeleteArbitrary([]int{1, 3, 5, 7, 9, 8, 6}, 0)
	if !isMinHeapHDA(result) || len(result) != 6 || result[0] == 1 {
		t.Errorf("Expected valid min-heap without root=1, got %v", result)
	}
}

func TestHeapDeleteArbitraryTwoDelete0(t *testing.T) {
	result := heapDeleteArbitrary([]int{1, 5}, 0)
	if len(result) != 1 || result[0] != 5 {
		t.Errorf("Expected [5], got %v", result)
	}
}

func TestHeapDeleteArbitraryTwoDelete1(t *testing.T) {
	result := heapDeleteArbitrary([]int{1, 5}, 1)
	if len(result) != 1 || result[0] != 1 {
		t.Errorf("Expected [1], got %v", result)
	}
}

func TestHeapDeleteArbitrarySingle(t *testing.T) {
	result := heapDeleteArbitrary([]int{42}, 0)
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestHeapDeleteArbitrarySiftUp(t *testing.T) {
	result := heapDeleteArbitrary([]int{1, 10, 5, 15, 20, 8, 6}, 3)
	if !isMinHeapHDA(result) {
		t.Errorf("Expected valid min-heap, got %v", result)
	}
}
