package main

import (
	"reflect"
	"testing"
)

func TestSpiralOrder4x4(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	result := spiralOrder(matrix)
	expected := []int{1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSpiralOrder3x3(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := spiralOrder(matrix)
	expected := []int{1, 2, 3, 6, 9, 8, 7, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestSpiralOrderSingleRow(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}}
	result := spiralOrder(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}
}

func TestSpiralOrderSingleColumn(t *testing.T) {
	matrix := [][]int{{1}, {2}, {3}, {4}}
	result := spiralOrder(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}
}

func TestSpiralOrder1x1(t *testing.T) {
	matrix := [][]int{{42}}
	result := spiralOrder(matrix)
	if !reflect.DeepEqual(result, []int{42}) {
		t.Errorf("expected [42], got %v", result)
	}
}

func TestSpiralOrder2x2(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}}
	result := spiralOrder(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 4, 3}) {
		t.Errorf("expected [1 2 4 3], got %v", result)
	}
}

func TestSpiralOrder2x4NonSquare(t *testing.T) {
	matrix := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}}
	result := spiralOrder(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 8, 7, 6, 5}) {
		t.Errorf("expected [1 2 3 4 8 7 6 5], got %v", result)
	}
}

func TestSpiralOrder3x2NonSquare(t *testing.T) {
	matrix := [][]int{{1, 2}, {3, 4}, {5, 6}}
	result := spiralOrder(matrix)
	if !reflect.DeepEqual(result, []int{1, 2, 4, 6, 5, 3}) {
		t.Errorf("expected [1 2 4 6 5 3], got %v", result)
	}
}

func TestSpiralOrderEmptyMatrix(t *testing.T) {
	matrix := [][]int{}
	result := spiralOrder(matrix)
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestSpiralOrderCollectsAllOnce(t *testing.T) {
	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	result := spiralOrder(matrix)
	if len(result) != 9 {
		t.Errorf("expected 9 elements, got %d", len(result))
	}
	seen := make(map[int]bool)
	for _, value := range result {
		seen[value] = true
	}
	if len(seen) != 9 {
		t.Errorf("expected 9 unique elements, got %d", len(seen))
	}
}
