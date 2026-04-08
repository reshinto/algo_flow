package main

import (
	"reflect"
	"testing"
)

func TestReshapeMatrix2x4To4x2(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}}
	result := reshapeMatrix(matrix, 4, 2)
	expected := [][]int{{1, 2}, {3, 4}, {5, 6}, {7, 8}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReshapeMatrix2x2To1x4(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	result := reshapeMatrix(matrix, 1, 4)
	expected := [][]int{{1, 2, 3, 4}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReshapeMatrix2x2To4x1(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	result := reshapeMatrix(matrix, 4, 1)
	expected := [][]int{{1}, {2}, {3}, {4}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReshapeMatrixImpossibleReshape(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	result := reshapeMatrix(matrix, 3, 2)
	if !reflect.DeepEqual(result, matrix) {
		t.Errorf("expected original matrix for impossible reshape")
	}
}

func TestReshapeMatrix1x1Identity(t *testing.T) {
	matrix := [][]int{{42}}
	result := reshapeMatrix(matrix, 1, 1)
	if result[0][0] != 42 {
		t.Errorf("expected 42, got %d", result[0][0])
	}
}

func TestReshapeMatrix3x3To1x9(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := reshapeMatrix(matrix, 1, 9)
	expected := [][]int{{1, 2, 3, 4, 5, 6, 7, 8, 9}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReshapeMatrix1x6To2x3(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4, 5, 6}}
	result := reshapeMatrix(matrix, 2, 3)
	expected := [][]int{{1, 2, 3}, {4, 5, 6}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReshapeMatrixImpossibleLargerTarget(t *testing.T) {
	matrix := [][]int{{1, 2, 3}}
	result := reshapeMatrix(matrix, 2, 5)
	if !reflect.DeepEqual(result, matrix) {
		t.Errorf("expected original matrix for impossible reshape with larger target")
	}
}
