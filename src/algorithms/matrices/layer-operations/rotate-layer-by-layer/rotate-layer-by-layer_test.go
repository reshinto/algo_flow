package main

import (
	"reflect"
	"testing"
)

func deepCopyMatrix(matrix [][]int) [][]int {
	copy := make([][]int, len(matrix))
	for rowIdx, row := range matrix {
		copy[rowIdx] = make([]int, len(row))
		for colIdx, val := range row {
			copy[rowIdx][colIdx] = val
		}
	}
	return copy
}

func TestRotateLayerByLayer3x3(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := rotateLayerByLayer(deepCopyMatrix(matrix))
	expected := [][]int{{7, 4, 1}, {8, 5, 2}, {9, 6, 3}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestRotateLayerByLayer4x4(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	result := rotateLayerByLayer(deepCopyMatrix(matrix))
	expected := [][]int{{13, 9, 5, 1}, {14, 10, 6, 2}, {15, 11, 7, 3}, {16, 12, 8, 4}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestRotateLayerByLayer1x1(t *testing.T) {
	matrix := [][]int{{42}}
	result := rotateLayerByLayer(deepCopyMatrix(matrix))
	if result[0][0] != 42 {
		t.Errorf("expected 42, got %d", result[0][0])
	}
}

func TestRotateLayerByLayer2x2(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	result := rotateLayerByLayer(deepCopyMatrix(matrix))
	expected := [][]int{{3, 1}, {4, 2}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestRotateLayerByLayerFourRotationsReturnOriginal(t *testing.T) {
	original := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	matrix := deepCopyMatrix(original)
	for rotationCount := 0; rotationCount < 4; rotationCount++ {
		matrix = rotateLayerByLayer(matrix)
	}
	if !reflect.DeepEqual(matrix, original) {
		t.Errorf("expected original after 4 rotations, got %v", matrix)
	}
}

func TestRotateLayerByLayerNegativeAndZeroValues(t *testing.T) {
	matrix := [][]int{{-1, 0, 1}, {-2, 0, 2}, {-3, 0, 3}}
	result := rotateLayerByLayer(deepCopyMatrix(matrix))
	expected := [][]int{{-3, -2, -1}, {0, 0, 0}, {3, 2, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}
