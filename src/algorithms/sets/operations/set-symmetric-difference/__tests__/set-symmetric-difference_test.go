package main

import (
	"sort"
	"testing"
)

func TestSetSymmetricDifferenceElementsExclusiveToEach(t *testing.T) {
	result := setSymmetricDifference([]int{1, 2, 3, 4}, []int{3, 4, 5, 6})
	sort.Ints(result)
	expected := []int{1, 2, 5, 6}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetSymmetricDifferenceDisjointReturnsAll(t *testing.T) {
	result := setSymmetricDifference([]int{1, 3, 5}, []int{2, 4, 6})
	sort.Ints(result)
	expected := []int{1, 2, 3, 4, 5, 6}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetSymmetricDifferenceIdenticalArraysReturnEmpty(t *testing.T) {
	result := setSymmetricDifference([]int{1, 2, 3}, []int{1, 2, 3})
	if len(result) != 0 {
		t.Errorf("expected empty for identical arrays, got %v", result)
	}
}

func TestSetSymmetricDifferenceEmptyBReturnsAllOfA(t *testing.T) {
	result := setSymmetricDifference([]int{1, 2, 3}, []int{})
	sort.Ints(result)
	expected := []int{1, 2, 3}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetSymmetricDifferenceSingleElementMatch(t *testing.T) {
	result := setSymmetricDifference([]int{7}, []int{7})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestSetSymmetricDifferenceASubsetOfB(t *testing.T) {
	result := setSymmetricDifference([]int{2, 4}, []int{1, 2, 3, 4, 5})
	sort.Ints(result)
	expected := []int{1, 3, 5}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}
