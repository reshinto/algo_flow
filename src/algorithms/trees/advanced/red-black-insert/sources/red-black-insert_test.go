package main

import (
	"sort"
	"testing"
)

func TestRBInsertSingleValue(t *testing.T) {
	result := redBlackInsert([]int{5})
	if len(result) != 1 || result[0] != 5 {
		t.Errorf("expected [5], got %v", result)
	}
}

func TestRBInsertSortedInorderDefaultInput(t *testing.T) {
	values := []int{7, 3, 18, 10, 22, 8, 11, 26}
	result := redBlackInsert(values)
	expected := make([]int, len(values))
	copy(expected, values)
	sort.Ints(expected)
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}

func TestRBInsertAscendingOrder(t *testing.T) {
	result := redBlackInsert([]int{1, 2, 3, 4, 5})
	expected := []int{1, 2, 3, 4, 5}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}

func TestRBInsertDescendingOrder(t *testing.T) {
	result := redBlackInsert([]int{5, 4, 3, 2, 1})
	expected := []int{1, 2, 3, 4, 5}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}

func TestRBInsertEmptyInput(t *testing.T) {
	result := redBlackInsert([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestRBInsertDuplicatesHandled(t *testing.T) {
	result := redBlackInsert([]int{5, 3, 5})
	if len(result) == 0 {
		t.Error("result should not be empty for duplicate input")
	}
}
