package main

import "testing"

var defaultMatrix = [][]int{{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}}

func TestSearch2DMatrixFindsTarget(t *testing.T) {
	if !search2DMatrix(defaultMatrix, 3) {
		t.Error("expected true for target 3")
	}
}

func TestSearch2DMatrixReturnsFalseWhenNotFound(t *testing.T) {
	if search2DMatrix(defaultMatrix, 13) {
		t.Error("expected false for target 13")
	}
}

func TestSearch2DMatrixFindsFirstElement(t *testing.T) {
	if !search2DMatrix(defaultMatrix, 1) {
		t.Error("expected true for first element")
	}
}

func TestSearch2DMatrixFindsLastElement(t *testing.T) {
	if !search2DMatrix(defaultMatrix, 60) {
		t.Error("expected true for last element")
	}
}

func TestSearch2DMatrixSingleRowFound(t *testing.T) {
	if !search2DMatrix([][]int{{1, 3, 5, 7, 9}}, 5) {
		t.Error("expected true for target 5 in single row")
	}
}

func TestSearch2DMatrixSingleRowNotFound(t *testing.T) {
	if search2DMatrix([][]int{{1, 3, 5, 7, 9}}, 4) {
		t.Error("expected false for target 4 in single row")
	}
}

func TestSearch2DMatrixSingleElementMatch(t *testing.T) {
	if !search2DMatrix([][]int{{42}}, 42) {
		t.Error("expected true for single element match")
	}
}

func TestSearch2DMatrixSingleElementNoMatch(t *testing.T) {
	if search2DMatrix([][]int{{42}}, 99) {
		t.Error("expected false for single element no match")
	}
}

func TestSearch2DMatrixEmptyMatrix(t *testing.T) {
	if search2DMatrix([][]int{}, 5) {
		t.Error("expected false for empty matrix")
	}
}

func TestSearch2DMatrixLargeMatrixFound(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4, 5}, {6, 7, 8, 9, 10}, {11, 12, 13, 14, 15}, {16, 17, 18, 19, 20}}
	if !search2DMatrix(matrix, 13) {
		t.Error("expected true for target 13 in large matrix")
	}
}

func TestSearch2DMatrixRowBoundaries(t *testing.T) {
	if !search2DMatrix(defaultMatrix, 10) {
		t.Error("expected true for first element of row 2")
	}
	if !search2DMatrix(defaultMatrix, 7) {
		t.Error("expected true for last element of row 1")
	}
}
