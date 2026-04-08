package prefixsum

import (
	"reflect"
	"testing"
)

func TestSingleQuery(t *testing.T) {
	prefixArray, queryResults := prefixSum([]int{1, 2, 3, 4, 5}, [][2]int{{1, 3}})
	if !reflect.DeepEqual(prefixArray, []int{1, 3, 6, 10, 15}) {
		t.Errorf("prefixArray mismatch: %v", prefixArray)
	}
	if !reflect.DeepEqual(queryResults, []int{9}) {
		t.Errorf("queryResults mismatch: %v", queryResults)
	}
}

func TestMultipleQueries(t *testing.T) {
	_, queryResults := prefixSum([]int{2, 4, 1, 3, 5, 2}, [][2]int{{1, 3}, {0, 4}, {2, 5}})
	if !reflect.DeepEqual(queryResults, []int{8, 15, 11}) {
		t.Errorf("Expected [8 15 11], got %v", queryResults)
	}
}

func TestFullRangeQuery(t *testing.T) {
	_, queryResults := prefixSum([]int{3, 1, 4, 1, 5, 9, 2}, [][2]int{{0, 6}})
	if queryResults[0] != 25 {
		t.Errorf("Expected 25, got %d", queryResults[0])
	}
}

func TestSingleElementRange(t *testing.T) {
	_, queryResults := prefixSum([]int{10, 20, 30, 40}, [][2]int{{2, 2}})
	if queryResults[0] != 30 {
		t.Errorf("Expected 30, got %d", queryResults[0])
	}
}

func TestEmptyInput(t *testing.T) {
	prefixArray, queryResults := prefixSum([]int{}, [][2]int{})
	if len(prefixArray) != 0 || len(queryResults) != 0 {
		t.Errorf("Expected empty results")
	}
}

func TestNegativeNumbers(t *testing.T) {
	_, queryResults := prefixSum([]int{-2, 5, -1, 3}, [][2]int{{0, 3}})
	if queryResults[0] != 5 {
		t.Errorf("Expected 5, got %d", queryResults[0])
	}
}

func TestDefaultInput(t *testing.T) {
	prefixArray, queryResults := prefixSum([]int{2, 4, 1, 3, 5, 2}, [][2]int{{1, 3}, {0, 4}, {2, 5}})
	if !reflect.DeepEqual(queryResults, []int{8, 15, 11}) {
		t.Errorf("Expected [8 15 11], got %v", queryResults)
	}
	if !reflect.DeepEqual(prefixArray, []int{2, 6, 7, 10, 15, 17}) {
		t.Errorf("Expected [2 6 7 10 15 17], got %v", prefixArray)
	}
}

func TestQueryFromIndexZero(t *testing.T) {
	_, queryResults := prefixSum([]int{5, 3, 2, 8}, [][2]int{{0, 2}})
	if queryResults[0] != 10 {
		t.Errorf("Expected 10, got %d", queryResults[0])
	}
}
