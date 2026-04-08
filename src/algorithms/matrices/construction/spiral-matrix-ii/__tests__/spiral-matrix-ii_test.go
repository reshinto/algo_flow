package main

import (
	"reflect"
	"testing"
)

func TestSpiralMatrixIIGenerates1x1Matrix(t *testing.T) {
	result := spiralMatrixII(1)
	expected := [][]int{{1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSpiralMatrixIIGenerates2x2Matrix(t *testing.T) {
	result := spiralMatrixII(2)
	expected := [][]int{{1, 2}, {4, 3}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSpiralMatrixIIGenerates3x3Matrix(t *testing.T) {
	result := spiralMatrixII(3)
	expected := [][]int{{1, 2, 3}, {8, 9, 4}, {7, 6, 5}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSpiralMatrixIIGenerates4x4Matrix(t *testing.T) {
	result := spiralMatrixII(4)
	expected := [][]int{
		{1, 2, 3, 4},
		{12, 13, 14, 5},
		{11, 16, 15, 6},
		{10, 9, 8, 7},
	}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSpiralMatrixIIGenerates5x5Matrix(t *testing.T) {
	result := spiralMatrixII(5)
	if !reflect.DeepEqual(result[0], []int{1, 2, 3, 4, 5}) {
		t.Errorf("row 0 wrong: %v", result[0])
	}
	if !reflect.DeepEqual(result[2], []int{15, 24, 25, 20, 7}) {
		t.Errorf("row 2 wrong: %v", result[2])
	}
	if !reflect.DeepEqual(result[4], []int{13, 12, 11, 10, 9}) {
		t.Errorf("row 4 wrong: %v", result[4])
	}
}

func TestSpiralMatrixIIPlaces1InTopLeft(t *testing.T) {
	for _, size := range []int{2, 3, 4, 5} {
		result := spiralMatrixII(size)
		if result[0][0] != 1 {
			t.Errorf("top-left not 1 for size %d", size)
		}
	}
}

func TestSpiralMatrixIIContainsAllValuesForN4(t *testing.T) {
	result := spiralMatrixII(4)
	seen := make(map[int]bool)
	total := 0
	for _, row := range result {
		for _, value := range row {
			seen[value] = true
			total++
		}
	}
	if total != 16 {
		t.Errorf("expected 16 total elements, got %d", total)
	}
	if len(seen) != 16 {
		t.Errorf("expected 16 unique elements, got %d", len(seen))
	}
}

func TestSpiralMatrixIIProducesSquareMatrix(t *testing.T) {
	result := spiralMatrixII(4)
	if len(result) != 4 {
		t.Errorf("expected 4 rows, got %d", len(result))
	}
	for rowIdx, row := range result {
		if len(row) != 4 {
			t.Errorf("row %d: expected 4 cols, got %d", rowIdx, len(row))
		}
	}
}
