package main

import (
	"sort"
	"testing"
)

func TestMultisetUnionDefaultInput(t *testing.T) {
	result := multisetUnion([]int{1, 1, 2, 3, 3, 3}, []int{1, 1, 1, 2, 2, 3})
	expected := []int{1, 1, 1, 2, 2, 3, 3, 3}
	if len(result) != len(expected) {
		t.Errorf("expected %v, got %v", expected, result)
		return
	}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestMultisetUnionBothEmpty(t *testing.T) {
	result := multisetUnion([]int{}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty result, got %v", result)
	}
}

func TestMultisetUnionMaxCountFromLargerSide(t *testing.T) {
	result := multisetUnion([]int{5, 5, 5}, []int{5})
	if len(result) != 3 {
		t.Errorf("expected 3 copies of 5, got %v", result)
	}
}

func TestMultisetUnionIdenticalArrays(t *testing.T) {
	result := multisetUnion([]int{1, 2, 2}, []int{1, 2, 2})
	expected := []int{1, 2, 2}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestMultisetUnionSingleElementSameValue(t *testing.T) {
	result := multisetUnion([]int{7}, []int{7})
	if len(result) != 1 || result[0] != 7 {
		t.Errorf("expected [7], got %v", result)
	}
}

func TestMultisetUnionSingleElementDifferentValues(t *testing.T) {
	result := multisetUnion([]int{3}, []int{9})
	if len(result) != 2 {
		t.Errorf("expected 2 elements, got %v", result)
	}
}

func TestMultisetUnionOutputIsSorted(t *testing.T) {
	result := multisetUnion([]int{3, 1, 2}, []int{4, 2, 1})
	sortedResult := make([]int, len(result))
	copy(sortedResult, result)
	sort.Ints(sortedResult)
	for elemIdx, val := range sortedResult {
		if result[elemIdx] != val {
			t.Errorf("expected sorted output, got %v", result)
			return
		}
	}
}
