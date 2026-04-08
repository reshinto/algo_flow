package main

import "testing"

func TestBITRangeSumsDefaultInput(t *testing.T) {
	result := binaryIndexedTree([]int{3, 2, 4, 5, 1, 1, 5, 3}, [][2]int{{0, 4}, {2, 6}})
	if result[0] != 15 {
		t.Errorf("expected 15, got %d", result[0])
	}
	if result[1] != 16 {
		t.Errorf("expected 16, got %d", result[1])
	}
}

func TestBITSingleElementQuery(t *testing.T) {
	result := binaryIndexedTree([]int{10, 20, 30}, [][2]int{{1, 1}})
	if result[0] != 20 {
		t.Errorf("expected 20, got %d", result[0])
	}
}

func TestBITFullRangeQuery(t *testing.T) {
	result := binaryIndexedTree([]int{1, 2, 3, 4, 5}, [][2]int{{0, 4}})
	if result[0] != 15 {
		t.Errorf("expected 15, got %d", result[0])
	}
}

func TestBITMultipleQueries(t *testing.T) {
	result := binaryIndexedTree([]int{5, 3, 2, 8, 1}, [][2]int{{0, 2}, {1, 4}, {2, 3}})
	if result[0] != 10 {
		t.Errorf("expected 10, got %d", result[0])
	}
	if result[1] != 14 {
		t.Errorf("expected 14, got %d", result[1])
	}
	if result[2] != 10 {
		t.Errorf("expected 10, got %d", result[2])
	}
}
