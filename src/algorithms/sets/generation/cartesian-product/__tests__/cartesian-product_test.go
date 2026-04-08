package main

import "testing"

func TestCartesianProductDefaultInput(t *testing.T) {
	result := cartesianProduct([]int{1, 2, 3}, []int{4, 5})
	expected := []Pair{{1, 4}, {1, 5}, {2, 4}, {2, 5}, {3, 4}, {3, 5}}
	if len(result) != len(expected) {
		t.Errorf("expected %d pairs, got %d", len(expected), len(result))
	}
	for pairIdx, pair := range expected {
		if result[pairIdx] != pair {
			t.Errorf("pair at index %d: expected %v, got %v", pairIdx, pair, result[pairIdx])
		}
	}
}

func TestCartesianProductSingleElementSets(t *testing.T) {
	result := cartesianProduct([]int{7}, []int{9})
	if len(result) != 1 || result[0] != (Pair{7, 9}) {
		t.Errorf("expected [(7,9)], got %v", result)
	}
}

func TestCartesianProductNTimesMPairs(t *testing.T) {
	result := cartesianProduct([]int{1, 2}, []int{3, 4})
	if len(result) != 4 {
		t.Errorf("expected 4 pairs, got %d", len(result))
	}
}

func TestCartesianProductEmptySetA(t *testing.T) {
	result := cartesianProduct([]int{}, []int{4, 5})
	if len(result) != 0 {
		t.Errorf("expected empty result for empty set A, got %v", result)
	}
}

func TestCartesianProductEmptySetB(t *testing.T) {
	result := cartesianProduct([]int{1, 2, 3}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty result for empty set B, got %v", result)
	}
}

func TestCartesianProductBothEmpty(t *testing.T) {
	result := cartesianProduct([]int{}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty result for both empty sets, got %v", result)
	}
}

func TestCartesianProductPreservesOrder(t *testing.T) {
	result := cartesianProduct([]int{10, 20}, []int{1, 2})
	if result[0] != (Pair{10, 1}) {
		t.Errorf("expected first pair (10,1), got %v", result[0])
	}
	if result[1] != (Pair{10, 2}) {
		t.Errorf("expected second pair (10,2), got %v", result[1])
	}
	if result[2] != (Pair{20, 1}) {
		t.Errorf("expected third pair (20,1), got %v", result[2])
	}
	if result[3] != (Pair{20, 2}) {
		t.Errorf("expected fourth pair (20,2), got %v", result[3])
	}
}
