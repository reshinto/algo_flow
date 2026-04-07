package main

import "testing"

func TestMatrixDiagonalSum3x3SubtractsCenter(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	if matrixDiagonalSum(matrix) != 25 {
		t.Errorf("expected 25, got %d", matrixDiagonalSum(matrix))
	}
}

func TestMatrixDiagonalSum4x4NoCenter(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	if matrixDiagonalSum(matrix) != 68 {
		t.Errorf("expected 68, got %d", matrixDiagonalSum(matrix))
	}
}

func TestMatrixDiagonalSumSingleElement(t *testing.T) {
	matrix := [][]int{{42}}
	if matrixDiagonalSum(matrix) != 42 {
		t.Errorf("expected 42, got %d", matrixDiagonalSum(matrix))
	}
}

func TestMatrixDiagonalSum2x2(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	if matrixDiagonalSum(matrix) != 10 {
		t.Errorf("expected 10, got %d", matrixDiagonalSum(matrix))
	}
}

func TestMatrixDiagonalSum5x5SubtractsCenter(t *testing.T) {
	matrix := [][]int{
		{1, 2, 3, 4, 5},
		{6, 7, 8, 9, 10},
		{11, 12, 13, 14, 15},
		{16, 17, 18, 19, 20},
		{21, 22, 23, 24, 25},
	}
	if matrixDiagonalSum(matrix) != 117 {
		t.Errorf("expected 117, got %d", matrixDiagonalSum(matrix))
	}
}

func TestMatrixDiagonalSumAllZeros(t *testing.T) {
	matrix := [][]int{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}
	if matrixDiagonalSum(matrix) != 0 {
		t.Errorf("expected 0, got %d", matrixDiagonalSum(matrix))
	}
}

func TestMatrixDiagonalSumIdentityMatrix(t *testing.T) {
	matrix := [][]int{{1, 0, 0}, {0, 1, 0}, {0, 0, 1}}
	if matrixDiagonalSum(matrix) != 3 {
		t.Errorf("expected 3, got %d", matrixDiagonalSum(matrix))
	}
}

func TestMatrixDiagonalSumNegativeValues(t *testing.T) {
	matrix := [][]int{{-1, 0, -2}, {0, -3, 0}, {-4, 0, -5}}
	if matrixDiagonalSum(matrix) != -15 {
		t.Errorf("expected -15, got %d", matrixDiagonalSum(matrix))
	}
}

func TestMatrixDiagonalSum4x4AllSame(t *testing.T) {
	matrix := [][]int{{2, 2, 2, 2}, {2, 2, 2, 2}, {2, 2, 2, 2}, {2, 2, 2, 2}}
	if matrixDiagonalSum(matrix) != 16 {
		t.Errorf("expected 16, got %d", matrixDiagonalSum(matrix))
	}
}
