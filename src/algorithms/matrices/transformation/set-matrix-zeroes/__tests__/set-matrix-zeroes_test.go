package main

import (
	"reflect"
	"testing"
)

func TestSetMatrixZeroesZerosRowAndColumn(t *testing.T) {
	matrix := [][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}}
	result := setMatrixZeroes(matrix)
	expected := [][]int{{1, 0, 1}, {0, 0, 0}, {1, 0, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSetMatrixZeroesDefaultInput(t *testing.T) {
	matrix := [][]int{{0, 1, 2, 0}, {3, 4, 5, 2}, {1, 3, 1, 5}}
	result := setMatrixZeroes(matrix)
	expected := [][]int{{0, 0, 0, 0}, {0, 4, 5, 0}, {0, 3, 1, 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSetMatrixZeroesLeavesNoZeroMatrixUnchanged(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := setMatrixZeroes(matrix)
	expected := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSetMatrixZeroes1x1WithZero(t *testing.T) {
	matrix := [][]int{{0}}
	result := setMatrixZeroes(matrix)
	if result[0][0] != 0 {
		t.Errorf("expected 0, got %d", result[0][0])
	}
}

func TestSetMatrixZeroes1x1WithNonzero(t *testing.T) {
	matrix := [][]int{{5}}
	result := setMatrixZeroes(matrix)
	if result[0][0] != 5 {
		t.Errorf("expected 5, got %d", result[0][0])
	}
}

func TestSetMatrixZeroesZeroInFirstRow(t *testing.T) {
	matrix := [][]int{{1, 0, 3}, {4, 5, 6}, {7, 8, 9}}
	result := setMatrixZeroes(matrix)
	if !reflect.DeepEqual(result[0], []int{0, 0, 0}) {
		t.Errorf("row 0 wrong: %v", result[0])
	}
}

func TestSetMatrixZeroesSingleRowWithZero(t *testing.T) {
	matrix := [][]int{{1, 0, 3}}
	result := setMatrixZeroes(matrix)
	if !reflect.DeepEqual(result[0], []int{0, 0, 0}) {
		t.Errorf("expected [0 0 0], got %v", result[0])
	}
}

func TestSetMatrixZeroesMultipleZerosInSameRow(t *testing.T) {
	matrix := [][]int{{0, 1, 0}, {2, 3, 4}, {5, 6, 7}}
	result := setMatrixZeroes(matrix)
	expected := [][]int{{0, 0, 0}, {0, 3, 0}, {0, 6, 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}
