package heaps

import (
	"sort"
	"testing"
)

func isMinHeapPQD(array []int) bool {
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

func TestPqDequeueMinimum(t *testing.T) {
	result := pqDequeue([]int{1, 3, 5, 7, 9, 8, 6})
	if result.dequeuedValue != 1 {
		t.Errorf("Expected dequeuedValue=1, got %d", result.dequeuedValue)
	}
}

func TestPqDequeueRemainingIsValidMinHeap(t *testing.T) {
	result := pqDequeue([]int{1, 3, 5, 7, 9, 8, 6})
	if !isMinHeapPQD(result.remainingQueue) {
		t.Errorf("remainingQueue is not a valid min-heap: %v", result.remainingQueue)
	}
}

func TestPqDequeueRemainingLength(t *testing.T) {
	result := pqDequeue([]int{1, 3, 5, 7, 9, 8, 6})
	if len(result.remainingQueue) != 6 {
		t.Errorf("Expected length 6, got %d", len(result.remainingQueue))
	}
}

func TestPqDequeueNewRootIsSecondSmallest(t *testing.T) {
	result := pqDequeue([]int{1, 3, 5, 7, 9, 8, 6})
	if result.remainingQueue[0] != 3 {
		t.Errorf("Expected new root=3, got %d", result.remainingQueue[0])
	}
}

func TestPqDequeueAllElementsAccounted(t *testing.T) {
	original := []int{1, 3, 5, 7, 9, 8, 6}
	result := pqDequeue(original)
	reconstructed := append(result.remainingQueue, result.dequeuedValue)
	sort.Ints(reconstructed)
	expected := make([]int, len(original))
	copy(expected, original)
	sort.Ints(expected)
	for idx, val := range expected {
		if reconstructed[idx] != val {
			t.Errorf("Elements mismatch at index %d", idx)
		}
	}
}

func TestPqDequeueTwoElement(t *testing.T) {
	result := pqDequeue([]int{2, 5})
	if result.dequeuedValue != 2 || len(result.remainingQueue) != 1 || result.remainingQueue[0] != 5 {
		t.Errorf("Expected {2, [5]}, got %v", result)
	}
}

func TestPqDequeueSingleElement(t *testing.T) {
	result := pqDequeue([]int{42})
	if result.dequeuedValue != 42 || len(result.remainingQueue) != 0 {
		t.Errorf("Expected {42, []}, got %v", result)
	}
}

func TestPqDequeueLargerHeap(t *testing.T) {
	result := pqDequeue([]int{2, 5, 3, 10, 15, 8, 7})
	if result.dequeuedValue != 2 || !isMinHeapPQD(result.remainingQueue) {
		t.Errorf("Expected dequeuedValue=2 and valid min-heap, got %v", result)
	}
}
