package main

import (
	"reflect"
	"testing"
)

func TestPascalsTriangleRowZero(t *testing.T) {
	if !reflect.DeepEqual(pascalsTriangleRow(0), []int{1}) {
		t.Errorf("row 0 should be [1]")
	}
}

func TestPascalsTriangleRowOne(t *testing.T) {
	if !reflect.DeepEqual(pascalsTriangleRow(1), []int{1, 1}) {
		t.Errorf("row 1 should be [1,1]")
	}
}

func TestPascalsTriangleRowTwo(t *testing.T) {
	if !reflect.DeepEqual(pascalsTriangleRow(2), []int{1, 2, 1}) {
		t.Errorf("row 2 should be [1,2,1]")
	}
}

func TestPascalsTriangleRowThree(t *testing.T) {
	if !reflect.DeepEqual(pascalsTriangleRow(3), []int{1, 3, 3, 1}) {
		t.Errorf("row 3 should be [1,3,3,1]")
	}
}

func TestPascalsTriangleRowFour(t *testing.T) {
	if !reflect.DeepEqual(pascalsTriangleRow(4), []int{1, 4, 6, 4, 1}) {
		t.Errorf("row 4 should be [1,4,6,4,1]")
	}
}

func TestPascalsTriangleRowEight(t *testing.T) {
	if !reflect.DeepEqual(pascalsTriangleRow(8), []int{1, 8, 28, 56, 70, 56, 28, 8, 1}) {
		t.Errorf("row 8 mismatch")
	}
}

func TestPascalsTriangleRowSixSumsTo64(t *testing.T) {
	result := pascalsTriangleRow(6)
	rowSum := 0
	for _, val := range result {
		rowSum += val
	}
	if rowSum != 64 {
		t.Errorf("row 6 should sum to 64, got %d", rowSum)
	}
}
