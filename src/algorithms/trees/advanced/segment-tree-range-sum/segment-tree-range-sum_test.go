package main

import "testing"

func TestSegSumRangeDefaultInput(t *testing.T) {
	result := segmentTreeRangeSum([]int64{1, 3, 5, 7, 9, 11}, [][2]int{{1, 3}, {0, 5}})
	if result[0] != 15 {
		t.Errorf("expected 15, got %d", result[0])
	}
	if result[1] != 36 {
		t.Errorf("expected 36, got %d", result[1])
	}
}

func TestSegSumSingleElementQuery(t *testing.T) {
	result := segmentTreeRangeSum([]int64{4, 2, 6}, [][2]int{{1, 1}})
	if result[0] != 2 {
		t.Errorf("expected 2, got %d", result[0])
	}
}

func TestSegSumFullRangeQuery(t *testing.T) {
	result := segmentTreeRangeSum([]int64{1, 2, 3, 4, 5}, [][2]int{{0, 4}})
	if result[0] != 15 {
		t.Errorf("expected 15, got %d", result[0])
	}
}

func TestSegSumMultipleQueries(t *testing.T) {
	result := segmentTreeRangeSum([]int64{10, 20, 30, 40, 50}, [][2]int{{0, 1}, {2, 4}, {1, 3}})
	if result[0] != 30 || result[1] != 120 || result[2] != 90 {
		t.Errorf("multiple queries failed: %v", result)
	}
}
