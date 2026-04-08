package main

import "testing"

func TestToeplitzCanonicalExample(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 1, 2, 3}, {9, 5, 1, 2}}
	if !toeplitzMatrix(matrix) {
		t.Error("expected true for canonical Toeplitz example")
	}
}

func TestToeplitzNonToeplitz2x2(t *testing.T) {
	matrix := [][]int{{1, 2}, {2, 2}}
	if toeplitzMatrix(matrix) {
		t.Error("expected false for non-Toeplitz 2x2")
	}
}

func TestToeplitzSingleElement(t *testing.T) {
	matrix := [][]int{{42}}
	if !toeplitzMatrix(matrix) {
		t.Error("expected true for single element matrix")
	}
}

func TestToeplitzSingleRow(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}}
	if !toeplitzMatrix(matrix) {
		t.Error("expected true for single row matrix")
	}
}

func TestToeplitzSingleColumn(t *testing.T) {
	matrix := [][]int{{1}, {2}, {3}}
	if !toeplitzMatrix(matrix) {
		t.Error("expected true for single column matrix")
	}
}

func TestToeplitzAllSameElements(t *testing.T) {
	matrix := [][]int{{7, 7, 7}, {7, 7, 7}, {7, 7, 7}}
	if !toeplitzMatrix(matrix) {
		t.Error("expected true for all-same-element matrix")
	}
}

func TestToeplitzValid2x2(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 1}}
	if !toeplitzMatrix(matrix) {
		t.Error("expected true for valid 2x2 Toeplitz")
	}
}

func TestToeplitzInvalid2x2(t *testing.T) {
	matrix := [][]int{{5, 3}, {3, 4}}
	if toeplitzMatrix(matrix) {
		t.Error("expected false for invalid 2x2 non-Toeplitz")
	}
}

func TestToeplitzFirstRowMismatch(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 2, 2}, {7, 4, 2}}
	if toeplitzMatrix(matrix) {
		t.Error("expected false for first row mismatch")
	}
}

func TestToeplitzLastDiagonalBroken(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 1, 2}, {7, 4, 9}}
	if toeplitzMatrix(matrix) {
		t.Error("expected false for last diagonal broken")
	}
}
