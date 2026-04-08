package main

import (
	"reflect"
	"testing"
)

func TestZigzagTraversal3x3(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := zigzagTraversal(matrix)
	expected := []int{1, 2, 4, 7, 5, 3, 6, 8, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestZigzagTraversal3x4(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}
	result := zigzagTraversal(matrix)
	expected := []int{1, 2, 5, 9, 6, 3, 4, 7, 10, 11, 8, 12}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestZigzagTraversal4x4(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	result := zigzagTraversal(matrix)
	expected := []int{1, 2, 5, 9, 6, 3, 4, 7, 10, 13, 14, 11, 8, 12, 15, 16}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestZigzagTraversalSingleElement(t *testing.T) {
	matrix := [][]int{{42}}
	result := zigzagTraversal(matrix)
	if !reflect.DeepEqual(result, []int{42}) {
		t.Errorf("expected [42], got %v", result)
	}
}

func TestZigzagTraversalSingleRow(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}}
	result := zigzagTraversal(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}
}

func TestZigzagTraversalSingleColumn(t *testing.T) {
	matrix := [][]int{{1}, {2}, {3}, {4}}
	result := zigzagTraversal(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}
}

func TestZigzagTraversalEmptyMatrix(t *testing.T) {
	matrix := [][]int{}
	result := zigzagTraversal(matrix)
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestZigzagTraversal2x2(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	result := zigzagTraversal(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}
}

func TestZigzagTraversalCollectsAllOnce3x3(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := zigzagTraversal(matrix)
	if len(result) != 9 {
		t.Errorf("expected 9 elements, got %d", len(result))
	}
	seen := make(map[int]bool)
	for _, value := range result {
		seen[value] = true
	}
	if len(seen) != 9 {
		t.Errorf("expected 9 unique elements, got %d", len(seen))
	}
}

func TestZigzagTraversalCollectsAllOnce3x4(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}
	result := zigzagTraversal(matrix)
	if len(result) != 12 {
		t.Errorf("expected 12 elements, got %d", len(result))
	}
	seen := make(map[int]bool)
	for _, value := range result {
		seen[value] = true
	}
	if len(seen) != 12 {
		t.Errorf("expected 12 unique elements, got %d", len(seen))
	}
}
