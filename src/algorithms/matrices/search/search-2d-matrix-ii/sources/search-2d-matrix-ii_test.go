package main

import "testing"

var defaultMatrix2 = [][]int{
	{1, 4, 7, 11, 15},
	{2, 5, 8, 12, 19},
	{3, 6, 9, 16, 22},
	{10, 13, 14, 17, 24},
	{18, 21, 23, 26, 30},
}

func TestSearch2DMatrixIIFindsTargetInCenter(t *testing.T) {
	if !search2DMatrixII(defaultMatrix2, 5) {
		t.Error("expected true for target 5")
	}
}

func TestSearch2DMatrixIIReturnsFalseWhenNotFound(t *testing.T) {
	if search2DMatrixII(defaultMatrix2, 20) {
		t.Error("expected false for target 20")
	}
}

func TestSearch2DMatrixIIFindsTopRightCorner(t *testing.T) {
	if !search2DMatrixII(defaultMatrix2, 15) {
		t.Error("expected true for top-right corner")
	}
}

func TestSearch2DMatrixIIFindsBottomLeftCorner(t *testing.T) {
	if !search2DMatrixII(defaultMatrix2, 18) {
		t.Error("expected true for bottom-left corner")
	}
}

func TestSearch2DMatrixIISingleElementMatch(t *testing.T) {
	if !search2DMatrixII([][]int{{7}}, 7) {
		t.Error("expected true for single element match")
	}
}

func TestSearch2DMatrixIISingleElementNoMatch(t *testing.T) {
	if search2DMatrixII([][]int{{7}}, 3) {
		t.Error("expected false for single element no match")
	}
}

func TestSearch2DMatrixIIEmptyMatrix(t *testing.T) {
	if search2DMatrixII([][]int{}, 5) {
		t.Error("expected false for empty matrix")
	}
}

func TestSearch2DMatrixIILargeMatrixFound(t *testing.T) {
	matrix := [][]int{{1, 4, 7, 11}, {2, 5, 8, 12}, {3, 6, 9, 16}, {10, 13, 14, 17}}
	if !search2DMatrixII(matrix, 9) {
		t.Error("expected true for 9 in large matrix")
	}
}

func TestSearch2DMatrixIILargeMatrixNotFound(t *testing.T) {
	matrix := [][]int{{1, 4, 7, 11}, {2, 5, 8, 12}, {3, 6, 9, 16}, {10, 13, 14, 17}}
	if search2DMatrixII(matrix, 15) {
		t.Error("expected false for 15 not in large matrix")
	}
}

func TestSearch2DMatrixIIFindsFirstElement(t *testing.T) {
	if !search2DMatrixII(defaultMatrix2, 1) {
		t.Error("expected true for first element")
	}
}

func TestSearch2DMatrixIIFindsLastElement(t *testing.T) {
	if !search2DMatrixII(defaultMatrix2, 30) {
		t.Error("expected true for last element")
	}
}
