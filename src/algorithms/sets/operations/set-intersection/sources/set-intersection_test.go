package main

import (
	"sort"
	"testing"
)

func TestSetIntersectionCommonElementsDefault(t *testing.T) {
	result := setIntersection([]int{1, 2, 3, 4, 5, 8}, []int{2, 4, 6, 8, 10})
	expected := []int{2, 4, 8}
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

func TestSetIntersectionDisjointReturnsEmpty(t *testing.T) {
	result := setIntersection([]int{1, 3, 5}, []int{2, 4, 6})
	if len(result) != 0 {
		t.Errorf("expected empty for disjoint arrays, got %v", result)
	}
}

func TestSetIntersectionASubsetOfB(t *testing.T) {
	result := setIntersection([]int{2, 4}, []int{1, 2, 3, 4, 5})
	sort.Ints(result)
	expected := []int{2, 4}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetIntersectionNoDuplicatesFromRepeatedValues(t *testing.T) {
	result := setIntersection([]int{1, 2, 3}, []int{2, 2, 2})
	if len(result) != 1 || result[0] != 2 {
		t.Errorf("expected [2], got %v", result)
	}
}

func TestSetIntersectionEmptyA(t *testing.T) {
	result := setIntersection([]int{}, []int{1, 2, 3})
	if len(result) != 0 {
		t.Errorf("expected empty for empty A, got %v", result)
	}
}

func TestSetIntersectionEmptyB(t *testing.T) {
	result := setIntersection([]int{1, 2, 3}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty for empty B, got %v", result)
	}
}

func TestSetIntersectionSingleElementMatch(t *testing.T) {
	result := setIntersection([]int{7}, []int{7})
	if len(result) != 1 || result[0] != 7 {
		t.Errorf("expected [7], got %v", result)
	}
}

func TestSetIntersectionSingleElementNoMatch(t *testing.T) {
	result := setIntersection([]int{7}, []int{8})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}
