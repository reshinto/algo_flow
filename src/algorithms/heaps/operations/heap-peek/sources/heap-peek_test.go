package heaps

import "testing"

func TestHeapPeekReturnsMin(t *testing.T) {
	val, ok := heapPeek([]int{1, 3, 5, 7, 9, 8, 6})
	if !ok || val != 1 {
		t.Errorf("Expected 1, got %d (ok=%v)", val, ok)
	}
}

func TestHeapPeekSingleElement(t *testing.T) {
	val, ok := heapPeek([]int{42})
	if !ok || val != 42 {
		t.Errorf("Expected 42, got %d (ok=%v)", val, ok)
	}
}

func TestHeapPeekTwoElement(t *testing.T) {
	val, ok := heapPeek([]int{2, 7})
	if !ok || val != 2 {
		t.Errorf("Expected 2, got %d (ok=%v)", val, ok)
	}
}

func TestHeapPeekIdempotent(t *testing.T) {
	heap := []int{1, 3, 5, 7}
	first, _ := heapPeek(heap)
	second, _ := heapPeek(heap)
	if first != second || first != 1 {
		t.Errorf("Expected idempotent result of 1, got %d and %d", first, second)
	}
}

func TestHeapPeekLargerHeap(t *testing.T) {
	val, ok := heapPeek([]int{1, 3, 2, 7, 5, 8, 4, 9, 6})
	if !ok || val != 1 {
		t.Errorf("Expected 1, got %d (ok=%v)", val, ok)
	}
}
