package main

import "testing"

func TestCuckooFilterFindsAllInsertedElements(t *testing.T) {
	results := cuckooFilter([]int{3, 7, 11, 15}, []int{3, 7, 11, 15}, 32)
	for _, entry := range results {
		if !entry.found {
			t.Errorf("expected found=true for element %d", entry.value)
		}
	}
}

func TestCuckooFilterReturnsResultForEveryQuery(t *testing.T) {
	queries := []int{1, 2, 3, 4, 5}
	results := cuckooFilter([]int{1, 3}, queries, 8)
	if len(results) != len(queries) {
		t.Errorf("expected %d results, got %d", len(queries), len(results))
	}
	for queryIdx, query := range queries {
		if results[queryIdx].value != query {
			t.Errorf("result at index %d has value %d, expected %d", queryIdx, results[queryIdx].value, query)
		}
	}
}

func TestCuckooFilterEmptyElementsAllQueriesNotFound(t *testing.T) {
	results := cuckooFilter([]int{}, []int{5, 10, 15}, 8)
	for _, entry := range results {
		if entry.found {
			t.Errorf("expected found=false for empty filter, but %d was found", entry.value)
		}
	}
}

func TestCuckooFilterEmptyQueriesReturnsEmptyResults(t *testing.T) {
	results := cuckooFilter([]int{1, 2, 3}, []int{}, 8)
	if len(results) != 0 {
		t.Errorf("expected empty results for empty queries, got %d", len(results))
	}
}

func TestCuckooFilterSingleElementAndSingleMatchingQuery(t *testing.T) {
	results := cuckooFilter([]int{42}, []int{42}, 16)
	if !results[0].found {
		t.Error("expected single inserted element to be found")
	}
}

func TestCuckooFilterLargeBucketCount(t *testing.T) {
	elements := []int{100, 200, 300}
	results := cuckooFilter(elements, elements, 1024)
	for _, entry := range results {
		if !entry.found {
			t.Errorf("expected found=true with large bucket count, but %d was not found", entry.value)
		}
	}
}

func TestCuckooFilterCorrectStructureShape(t *testing.T) {
	results := cuckooFilter([]int{5}, []int{5, 99}, 8)
	if len(results) != 2 {
		t.Errorf("expected 2 results, got %d", len(results))
	}
}
