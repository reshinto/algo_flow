package main

import "testing"

func TestKthSmallestSortedMatrix3x3K8(t *testing.T) {
	matrix := [][]int{{1, 5, 9}, {10, 11, 13}, {12, 13, 15}}
	if kthSmallestSortedMatrix(matrix, 8) != 13 {
		t.Errorf("expected 13")
	}
}

func TestKthSmallestSortedMatrixReturnsSmallestK1(t *testing.T) {
	matrix := [][]int{{1, 5, 9}, {10, 11, 13}, {12, 13, 15}}
	if kthSmallestSortedMatrix(matrix, 1) != 1 {
		t.Errorf("expected 1")
	}
}

func TestKthSmallestSortedMatrixReturnsLargestKN2(t *testing.T) {
	matrix := [][]int{{1, 5, 9}, {10, 11, 13}, {12, 13, 15}}
	if kthSmallestSortedMatrix(matrix, 9) != 15 {
		t.Errorf("expected 15")
	}
}

func TestKthSmallestSortedMatrix1x1(t *testing.T) {
	matrix := [][]int{{42}}
	if kthSmallestSortedMatrix(matrix, 1) != 42 {
		t.Errorf("expected 42")
	}
}

func TestKthSmallestSortedMatrix2x2K2(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	if kthSmallestSortedMatrix(matrix, 2) != 2 {
		t.Errorf("expected 2")
	}
}

func TestKthSmallestSortedMatrix2x2K3(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	if kthSmallestSortedMatrix(matrix, 3) != 3 {
		t.Errorf("expected 3")
	}
}

func TestKthSmallestSortedMatrixAllSameValues(t *testing.T) {
	matrix := [][]int{{5, 5, 5}, {5, 5, 5}, {5, 5, 5}}
	if kthSmallestSortedMatrix(matrix, 5) != 5 {
		t.Errorf("expected 5")
	}
}

func TestKthSmallestSortedMatrix4x4K8(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	if kthSmallestSortedMatrix(matrix, 8) != 8 {
		t.Errorf("expected 8")
	}
}

func TestKthSmallestSortedMatrixNegativeValues(t *testing.T) {
	matrix := [][]int{{-5, -4, -3}, {-2, -1, 0}, {1, 2, 3}}
	if kthSmallestSortedMatrix(matrix, 5) != -1 {
		t.Errorf("expected -1")
	}
}

func TestKthSmallestSortedMatrix4x4K16(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	if kthSmallestSortedMatrix(matrix, 16) != 16 {
		t.Errorf("expected 16")
	}
}
