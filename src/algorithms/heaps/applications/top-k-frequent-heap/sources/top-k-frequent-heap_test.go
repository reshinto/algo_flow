package heaps

import "testing"

func containsInt(slice []int, value int) bool {
	for _, element := range slice {
		if element == value {
			return true
		}
	}
	return false
}

func TestTopKFrequentHeapReturnsK(t *testing.T) {
	result := topKFrequentHeap([]int{1, 1, 1, 2, 2, 3, 3, 3, 3, 4}, 2)
	if len(result) != 2 {
		t.Fatalf("Expected 2 elements, got %d", len(result))
	}
	if !containsInt(result, 1) || !containsInt(result, 3) {
		t.Errorf("Expected 1 and 3 in result, got %v", result)
	}
}

func TestTopKFrequentHeapTop1(t *testing.T) {
	result := topKFrequentHeap([]int{4, 4, 4, 4, 2, 2, 1}, 1)
	if len(result) != 1 || result[0] != 4 {
		t.Errorf("Expected [4], got %v", result)
	}
}

func TestTopKFrequentHeapAllSame(t *testing.T) {
	result := topKFrequentHeap([]int{9, 9, 9, 9}, 1)
	if len(result) != 1 || result[0] != 9 {
		t.Errorf("Expected [9], got %v", result)
	}
}

func TestTopKFrequentHeapSingleElement(t *testing.T) {
	result := topKFrequentHeap([]int{3}, 1)
	if len(result) != 1 || result[0] != 3 {
		t.Errorf("Expected [3], got %v", result)
	}
}

func TestTopKFrequentHeapExcludesLowFrequency(t *testing.T) {
	result := topKFrequentHeap([]int{1, 1, 1, 2, 2, 3, 3, 3, 3, 4}, 2)
	if containsInt(result, 4) {
		t.Errorf("Element 4 should not be in top 2, got %v", result)
	}
}

func TestTopKFrequentHeapK3(t *testing.T) {
	result := topKFrequentHeap([]int{1, 1, 1, 2, 2, 3, 3, 3, 3, 4}, 3)
	if len(result) != 3 {
		t.Fatalf("Expected 3 elements, got %d", len(result))
	}
	if !containsInt(result, 1) || !containsInt(result, 2) || !containsInt(result, 3) {
		t.Errorf("Expected 1, 2, 3 in result, got %v", result)
	}
}
