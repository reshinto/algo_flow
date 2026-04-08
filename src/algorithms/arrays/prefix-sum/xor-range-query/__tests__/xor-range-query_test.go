package xorrangequery

import (
	"reflect"
	"testing"
)

func TestSingleQuery(t *testing.T) {
	_, queryResults := xorRangeQuery([]int{3, 5, 2, 7, 1, 4}, [][2]int{{0, 2}})
	if queryResults[0] != 4 {
		t.Errorf("Expected 4, got %d", queryResults[0])
	}
}

func TestMultipleQueries(t *testing.T) {
	_, queryResults := xorRangeQuery([]int{3, 5, 2, 7, 1, 4}, [][2]int{{0, 2}, {1, 4}, {2, 5}})
	if !reflect.DeepEqual(queryResults, []int{4, 1, 0}) {
		t.Errorf("Expected [4 1 0], got %v", queryResults)
	}
}

func TestPrefixXorArray(t *testing.T) {
	prefixXor, _ := xorRangeQuery([]int{3, 5, 2, 7, 1, 4}, [][2]int{{0, 5}})
	if !reflect.DeepEqual(prefixXor, []int{3, 6, 4, 3, 2, 6}) {
		t.Errorf("Expected [3 6 4 3 2 6], got %v", prefixXor)
	}
}

func TestFullRange(t *testing.T) {
	_, queryResults := xorRangeQuery([]int{1, 2, 3, 4}, [][2]int{{0, 3}})
	if queryResults[0] != 4 {
		t.Errorf("Expected 4, got %d", queryResults[0])
	}
}

func TestSingleElementQuery(t *testing.T) {
	_, queryResults := xorRangeQuery([]int{10, 20, 30, 40}, [][2]int{{2, 2}})
	if queryResults[0] != 30 {
		t.Errorf("Expected 30, got %d", queryResults[0])
	}
}

func TestEmptyInput(t *testing.T) {
	prefixXor, queryResults := xorRangeQuery([]int{}, [][2]int{})
	if len(prefixXor) != 0 || len(queryResults) != 0 {
		t.Error("Expected empty results")
	}
}

func TestQueryFromIndexZero(t *testing.T) {
	_, queryResults := xorRangeQuery([]int{5, 3, 2, 8}, [][2]int{{0, 2}})
	if queryResults[0] != 4 {
		t.Errorf("Expected 4, got %d", queryResults[0])
	}
}

func TestAllZeros(t *testing.T) {
	prefixXor, queryResults := xorRangeQuery([]int{0, 0, 0, 0}, [][2]int{{0, 3}})
	if queryResults[0] != 0 {
		t.Errorf("Expected 0, got %d", queryResults[0])
	}
	if !reflect.DeepEqual(prefixXor, []int{0, 0, 0, 0}) {
		t.Errorf("Expected all zeros, got %v", prefixXor)
	}
}
