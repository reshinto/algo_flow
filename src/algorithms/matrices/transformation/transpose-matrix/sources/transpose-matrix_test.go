package main

import (
	"reflect"
	"testing"
)

func TestTransposeMatrix3x3(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := transposeMatrix(matrix)
	expected := [][]int{{1, 4, 7}, {2, 5, 8}, {3, 6, 9}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestTransposeMatrix2x2(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	result := transposeMatrix(matrix)
	expected := [][]int{{1, 3}, {2, 4}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestTransposeMatrix1x1(t *testing.T) {
	matrix := [][]int{{42}}
	result := transposeMatrix(matrix)
	if result[0][0] != 42 {
		t.Errorf("expected 42, got %d", result[0][0])
	}
}

func TestTransposeMatrix2x3To3x2(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}}
	result := transposeMatrix(matrix)
	expected := [][]int{{1, 4}, {2, 5}, {3, 6}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestTransposeMatrix3x2To2x3(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}, {5, 6}}
	result := transposeMatrix(matrix)
	expected := [][]int{{1, 3, 5}, {2, 4, 6}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestTransposeMatrixSingleRowToSingleColumn(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}}
	result := transposeMatrix(matrix)
	expected := [][]int{{1}, {2}, {3}, {4}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestTransposeMatrixSingleColumnToSingleRow(t *testing.T) {
	matrix := [][]int{{1}, {2}, {3}}
	result := transposeMatrix(matrix)
	expected := [][]int{{1, 2, 3}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestTransposeMatrixDoubleTransposeReturnsOriginal(t *testing.T) {
	original := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	transposed := transposeMatrix(original)
	doubleTransposed := transposeMatrix(transposed)
	if !reflect.DeepEqual(doubleTransposed, original) {
		t.Errorf("expected original after double transpose, got %v", doubleTransposed)
	}
}
