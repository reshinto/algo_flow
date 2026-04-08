package main

import (
	"sort"
	"testing"
)

func TestMultisetIntersectionDefaultInput(t *testing.T) {
	result := multisetIntersection([]int{1, 1, 2, 3, 3, 3}, []int{1, 1, 1, 2, 2, 3})
	expected := []int{1, 1, 2, 3}
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

func TestMultisetIntersectionBothEmpty(t *testing.T) {
	result := multisetIntersection([]int{}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty result, got %v", result)
	}
}

func TestMultisetIntersectionDisjointArrays(t *testing.T) {
	result := multisetIntersection([]int{1, 3, 5}, []int{2, 4, 6})
	if len(result) != 0 {
		t.Errorf("expected empty result for disjoint arrays, got %v", result)
	}
}

func TestMultisetIntersectionMinCountFromSmallerSide(t *testing.T) {
	result := multisetIntersection([]int{5, 5, 5}, []int{5})
	if len(result) != 1 || result[0] != 5 {
		t.Errorf("expected [5], got %v", result)
	}
}

func TestMultisetIntersectionIdenticalArrays(t *testing.T) {
	result := multisetIntersection([]int{1, 2, 2, 3}, []int{1, 2, 2, 3})
	expected := []int{1, 2, 2, 3}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestMultisetIntersectionSingleElementMatch(t *testing.T) {
	result := multisetIntersection([]int{7}, []int{7})
	if len(result) != 1 || result[0] != 7 {
		t.Errorf("expected [7], got %v", result)
	}
}

func TestMultisetIntersectionSingleElementNoMatch(t *testing.T) {
	result := multisetIntersection([]int{7}, []int{8})
	if len(result) != 0 {
		t.Errorf("expected empty result, got %v", result)
	}
}

func TestMultisetIntersectionOutputIsSorted(t *testing.T) {
	result := multisetIntersection([]int{3, 1, 2, 2}, []int{4, 2, 1, 3})
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
