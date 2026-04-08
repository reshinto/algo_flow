package main

import "testing"

func TestSegMinRangeDefaultInput(t *testing.T) {
	result := segmentTreeRangeMin([]int{2, 5, 1, 4, 9, 3}, [][2]int{{0, 2}, {3, 5}})
	if result[0] != 1 {
		t.Errorf("expected 1, got %d", result[0])
	}
	if result[1] != 3 {
		t.Errorf("expected 3, got %d", result[1])
	}
}

func TestSegMinSingleElementQuery(t *testing.T) {
	result := segmentTreeRangeMin([]int{4, 2, 6}, [][2]int{{1, 1}})
	if result[0] != 2 {
		t.Errorf("expected 2, got %d", result[0])
	}
}

func TestSegMinFullRangeQuery(t *testing.T) {
	result := segmentTreeRangeMin([]int{3, 1, 4, 1, 5, 9}, [][2]int{{0, 5}})
	if result[0] != 1 {
		t.Errorf("expected 1, got %d", result[0])
	}
}

func TestSegMinMultipleQueries(t *testing.T) {
	result := segmentTreeRangeMin([]int{10, 3, 8, 1, 7}, [][2]int{{0, 2}, {1, 4}, {3, 4}})
	if result[0] != 3 || result[1] != 1 || result[2] != 1 {
		t.Errorf("multiple queries failed: %v", result)
	}
}
