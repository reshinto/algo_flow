package main

import "testing"

func TestSetDifferenceElementsOnlyInA(t *testing.T) {
	result := setDifference([]int{1, 2, 3, 4, 5}, []int{3, 4, 5, 6, 7})
	expected := []int{1, 2}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetDifferenceDisjointReturnsAllOfA(t *testing.T) {
	result := setDifference([]int{1, 3, 5}, []int{2, 4, 6})
	if len(result) != 3 {
		t.Errorf("expected all of A=[1,3,5], got %v", result)
	}
}

func TestSetDifferenceASubsetOfBReturnsEmpty(t *testing.T) {
	result := setDifference([]int{2, 4}, []int{1, 2, 3, 4, 5})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestSetDifferenceEmptyBReturnsAllOfA(t *testing.T) {
	result := setDifference([]int{1, 2, 3}, []int{})
	expected := []int{1, 2, 3}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetDifferenceEmptyAReturnsEmpty(t *testing.T) {
	result := setDifference([]int{}, []int{1, 2, 3})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestSetDifferenceIdenticalArraysReturnEmpty(t *testing.T) {
	result := setDifference([]int{1, 2, 3}, []int{1, 2, 3})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestSetDifferenceSingleElementMatch(t *testing.T) {
	result := setDifference([]int{7}, []int{7})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestSetDifferenceSingleElementNoMatch(t *testing.T) {
	result := setDifference([]int{7}, []int{8})
	if len(result) != 1 || result[0] != 7 {
		t.Errorf("expected [7], got %v", result)
	}
}

func TestSetDifferenceBSubsetOfA(t *testing.T) {
	result := setDifference([]int{1, 2, 3, 4, 5}, []int{2, 4})
	expected := []int{1, 3, 5}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}
