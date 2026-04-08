package main

import (
	"reflect"
	"testing"
)

func TestDiagonalTraversal3x4(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}
	result := diagonalTraversal(matrix)
	expected := []int{1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestDiagonalTraversal4x4(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	result := diagonalTraversal(matrix)
	expected := []int{1, 2, 5, 3, 6, 9, 4, 7, 10, 13, 8, 11, 14, 12, 15, 16}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestDiagonalTraversal1x1(t *testing.T) {
	matrix := [][]int{{42}}
	result := diagonalTraversal(matrix)
	if !reflect.DeepEqual(result, []int{42}) {
		t.Errorf("expected [42], got %v", result)
	}
}

func TestDiagonalTraversalSingleRow(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}}
	result := diagonalTraversal(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}
}

func TestDiagonalTraversalSingleColumn(t *testing.T) {
	matrix := [][]int{{1}, {2}, {3}, {4}}
	result := diagonalTraversal(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}
}

func TestDiagonalTraversalEmptyMatrix(t *testing.T) {
	matrix := [][]int{}
	result := diagonalTraversal(matrix)
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestDiagonalTraversal3x3(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := diagonalTraversal(matrix)
	expected := []int{1, 2, 4, 3, 5, 7, 6, 8, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestDiagonalTraversalCollectsAllOnce(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := diagonalTraversal(matrix)
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
