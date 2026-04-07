package main

import "testing"

func TestSetUnionCombinesUniqueElements(t *testing.T) {
	result := setUnion([]int{1, 2, 3, 4, 5}, []int{3, 4, 5, 6, 7})
	expected := []int{1, 2, 3, 4, 5, 6, 7}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetUnionDisjointReturnsAllElements(t *testing.T) {
	result := setUnion([]int{1, 3, 5}, []int{2, 4, 6})
	expected := []int{1, 3, 5, 2, 4, 6}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetUnionIdenticalArrays(t *testing.T) {
	result := setUnion([]int{1, 2, 3}, []int{1, 2, 3})
	expected := []int{1, 2, 3}
	if len(result) != len(expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSetUnionEmptyA(t *testing.T) {
	result := setUnion([]int{}, []int{1, 2, 3})
	expected := []int{1, 2, 3}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetUnionEmptyB(t *testing.T) {
	result := setUnion([]int{1, 2, 3}, []int{})
	expected := []int{1, 2, 3}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetUnionBothEmpty(t *testing.T) {
	result := setUnion([]int{}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestSetUnionSingleElementMatch(t *testing.T) {
	result := setUnion([]int{7}, []int{7})
	if len(result) != 1 || result[0] != 7 {
		t.Errorf("expected [7], got %v", result)
	}
}

func TestSetUnionSingleElementNoMatch(t *testing.T) {
	result := setUnion([]int{7}, []int{8})
	if len(result) != 2 {
		t.Errorf("expected [7,8], got %v", result)
	}
}

func TestSetUnionNoDuplicatesFromRepeatedBValues(t *testing.T) {
	result := setUnion([]int{1, 2, 3}, []int{2, 2, 2})
	expected := []int{1, 2, 3}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}
