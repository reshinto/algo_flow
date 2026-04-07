package main

import "testing"

func containsInt(slice []int, val int) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}

func TestTopKFrequentElements_ReturnsTop2FromDefault(t *testing.T) {
	result := topKFrequentElements([]int{1, 1, 1, 2, 2, 3}, 2)
	if len(result) != 2 || !containsInt(result, 1) || !containsInt(result, 2) {
		t.Errorf("expected [1, 2] in result, got %v", result)
	}
}

func TestTopKFrequentElements_ReturnsSingleTopElementWhenKEquals1(t *testing.T) {
	result := topKFrequentElements([]int{1, 1, 2, 2, 2, 3}, 1)
	if len(result) != 1 || result[0] != 2 {
		t.Errorf("expected [2], got %v", result)
	}
}

func TestTopKFrequentElements_ReturnsAllElementsWhenKEqualsUniqueCount(t *testing.T) {
	result := topKFrequentElements([]int{1, 2, 3}, 3)
	if len(result) != 3 {
		t.Errorf("expected 3 elements, got %d", len(result))
	}
}

func TestTopKFrequentElements_HandlesAllSameElements(t *testing.T) {
	result := topKFrequentElements([]int{7, 7, 7, 7}, 1)
	if len(result) != 1 || result[0] != 7 {
		t.Errorf("expected [7], got %v", result)
	}
}

func TestTopKFrequentElements_ReturnsCorrectTopKWithClearWinner(t *testing.T) {
	result := topKFrequentElements([]int{4, 4, 4, 4, 5, 5, 6}, 2)
	if len(result) != 2 || !containsInt(result, 4) || !containsInt(result, 5) {
		t.Errorf("expected [4, 5] in result, got %v", result)
	}
}

func TestTopKFrequentElements_HandlesNegativeNumbers(t *testing.T) {
	result := topKFrequentElements([]int{-1, -1, -2, -2, -2, 3}, 2)
	if len(result) != 2 || !containsInt(result, -2) || !containsInt(result, -1) {
		t.Errorf("expected [-2, -1] in result, got %v", result)
	}
}

func TestTopKFrequentElements_ReturnsExactlyKElements(t *testing.T) {
	result := topKFrequentElements([]int{1, 2, 3, 4, 5}, 2)
	if len(result) != 2 {
		t.Errorf("expected 2 elements, got %d", len(result))
	}
}
