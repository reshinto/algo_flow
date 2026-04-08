package main

import (
	"reflect"
	"testing"
)

func TestReturnsSingleRowForNumRows1(t *testing.T) {
	result := pascalsTriangle(1)
	expected := [][]int{{1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReturnsCorrectTriangleForNumRows2(t *testing.T) {
	result := pascalsTriangle(2)
	expected := [][]int{{1}, {1, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReturnsCorrectTriangleForNumRows3(t *testing.T) {
	result := pascalsTriangle(3)
	expected := [][]int{{1}, {1, 1}, {1, 2, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReturnsCorrectTriangleForNumRows5(t *testing.T) {
	result := pascalsTriangle(5)
	expected := [][]int{{1}, {1, 1}, {1, 2, 1}, {1, 3, 3, 1}, {1, 4, 6, 4, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReturnsCorrectTriangleForNumRows6(t *testing.T) {
	result := pascalsTriangle(6)
	if len(result) != 6 {
		t.Fatalf("expected 6 rows, got %d", len(result))
	}
	expectedLastRow := []int{1, 5, 10, 10, 5, 1}
	if !reflect.DeepEqual(result[5], expectedLastRow) {
		t.Errorf("expected row 5 %v, got %v", expectedLastRow, result[5])
	}
}

func TestInnerCellIsSumOfTwoAbove(t *testing.T) {
	result := pascalsTriangle(5)
	for rowIdx := 2; rowIdx < len(result); rowIdx++ {
		currentRow := result[rowIdx]
		aboveRow := result[rowIdx-1]
		for colIdx := 1; colIdx < len(currentRow)-1; colIdx++ {
			expected := aboveRow[colIdx-1] + aboveRow[colIdx]
			if currentRow[colIdx] != expected {
				t.Errorf("row %d col %d: expected %d, got %d", rowIdx, colIdx, expected, currentRow[colIdx])
			}
		}
	}
}

func TestAllEdgeCellsAre1(t *testing.T) {
	result := pascalsTriangle(6)
	for rowIdx, row := range result {
		if row[0] != 1 {
			t.Errorf("row %d first element is not 1", rowIdx)
		}
		if row[len(row)-1] != 1 {
			t.Errorf("row %d last element is not 1", rowIdx)
		}
	}
}

func TestRowLengthEqualsRowIndexPlusOne(t *testing.T) {
	result := pascalsTriangle(5)
	for rowIdx, row := range result {
		if len(row) != rowIdx+1 {
			t.Errorf("row %d: expected length %d, got %d", rowIdx, rowIdx+1, len(row))
		}
	}
}

func TestReturnsEmptyForNumRows0(t *testing.T) {
	result := pascalsTriangle(0)
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}
