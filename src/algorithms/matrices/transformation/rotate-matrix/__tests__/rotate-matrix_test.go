package main

import (
	"reflect"
	"testing"
)

func TestRotateMatrix3x3(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := rotateMatrix(matrix)
	expected := [][]int{{7, 4, 1}, {8, 5, 2}, {9, 6, 3}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestRotateMatrix4x4(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	result := rotateMatrix(matrix)
	expected := [][]int{{13, 9, 5, 1}, {14, 10, 6, 2}, {15, 11, 7, 3}, {16, 12, 8, 4}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestRotateMatrix1x1NoOp(t *testing.T) {
	matrix := [][]int{{42}}
	result := rotateMatrix(matrix)
	if result[0][0] != 42 {
		t.Errorf("expected 42, got %d", result[0][0])
	}
}

func TestRotateMatrix2x2(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	result := rotateMatrix(matrix)
	expected := [][]int{{3, 1}, {4, 2}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestRotateMatrixNegativeValues(t *testing.T) {
	matrix := [][]int{{-1, -2}, {-3, -4}}
	result := rotateMatrix(matrix)
	expected := [][]int{{-3, -1}, {-4, -2}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func deepCopyMatrix(matrix [][]int) [][]int {
	copied := make([][]int, len(matrix))
	for rowIdx, row := range matrix {
		copied[rowIdx] = make([]int, len(row))
		copy(copied[rowIdx], row)
	}
	return copied
}

func TestRotateMatrixFourRotationsReturnOriginal(t *testing.T) {
	original := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	matrix := deepCopyMatrix(original)
	for rotationCount := 0; rotationCount < 4; rotationCount++ {
		matrix = rotateMatrix(matrix)
	}
	if !reflect.DeepEqual(matrix, original) {
		t.Errorf("expected original after 4 rotations, got %v", matrix)
	}
}
