package main

import (
	"sort"
	"testing"
)

func TestAvlInsertSingleValue(t *testing.T) {
	result := avlInsertRotation([]int{5})
	if len(result) != 1 || result[0] != 5 {
		t.Errorf("expected [5], got %v", result)
	}
}

func TestAvlRRRotationAscending(t *testing.T) {
	result := avlInsertRotation([]int{1, 2, 3})
	expected := []int{1, 2, 3}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("RR rotation: expected %v, got %v", expected, result)
			break
		}
	}
}

func TestAvlLLRotationDescending(t *testing.T) {
	result := avlInsertRotation([]int{3, 2, 1})
	expected := []int{1, 2, 3}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("LL rotation: expected %v, got %v", expected, result)
			break
		}
	}
}

func TestAvlLRRotation(t *testing.T) {
	result := avlInsertRotation([]int{3, 1, 2})
	expected := []int{1, 2, 3}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("LR rotation: expected %v, got %v", expected, result)
			break
		}
	}
}

func TestAvlRLRotation(t *testing.T) {
	result := avlInsertRotation([]int{1, 3, 2})
	expected := []int{1, 2, 3}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("RL rotation: expected %v, got %v", expected, result)
			break
		}
	}
}

func TestAvlMultipleRotationsSixValues(t *testing.T) {
	values := []int{10, 20, 30, 25, 28, 27}
	result := avlInsertRotation(values)
	expected := make([]int, len(values))
	copy(expected, values)
	sort.Ints(expected)
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("Multiple rotations: expected %v, got %v", expected, result)
			break
		}
	}
}

func TestAvlEmptyInput(t *testing.T) {
	result := avlInsertRotation([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}
