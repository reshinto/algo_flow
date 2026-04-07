package main

import "testing"

func TestBloomFilterReturnsResultsForDefaultInput(t *testing.T) {
	results := bloomFilter([]int{3, 7, 11, 15}, []int{3, 5, 7, 9, 11}, 16, 3)
	if len(results) != 5 {
		t.Errorf("expected 5 results, got %d", len(results))
	}
}

func TestBloomFilterNoFalseNegativesForInsertedElements(t *testing.T) {
	inserted := []int{3, 7, 11, 15}
	results := bloomFilter(inserted, inserted, 16, 3)
	for _, entry := range results {
		if !entry.found {
			t.Errorf("expected found=true for inserted element %d", entry.value)
		}
	}
}

func TestBloomFilterNoInsertionsAllQueriesNotFound(t *testing.T) {
	results := bloomFilter([]int{}, []int{1, 2, 3, 4, 5}, 16, 3)
	for _, entry := range results {
		if entry.found {
			t.Errorf("expected found=false for empty filter, but %d was found", entry.value)
		}
	}
}

func TestBloomFilterInsertedElementsAreFound(t *testing.T) {
	results := bloomFilter([]int{3, 7, 11, 15}, []int{3, 5, 7, 9, 11}, 16, 3)
	resultMap := make(map[int]bool)
	for _, entry := range results {
		resultMap[entry.value] = entry.found
	}
	if !resultMap[3] {
		t.Error("expected element 3 to be found")
	}
	if !resultMap[7] {
		t.Error("expected element 7 to be found")
	}
	if !resultMap[11] {
		t.Error("expected element 11 to be found")
	}
}

func TestBloomFilterPreservesQueryOrder(t *testing.T) {
	queries := []int{3, 5, 7, 9, 11}
	results := bloomFilter([]int{3, 7, 11, 15}, queries, 16, 3)
	for queryIdx, query := range queries {
		if results[queryIdx].value != query {
			t.Errorf("result at index %d has value %d, expected %d", queryIdx, results[queryIdx].value, query)
		}
	}
}

func TestBloomFilterSingleInsertedElementFound(t *testing.T) {
	results := bloomFilter([]int{42}, []int{42}, 16, 3)
	if !results[0].found {
		t.Error("expected single inserted element to be found")
	}
}

func TestBloomFilterEmptyQueriesReturnsEmptyResults(t *testing.T) {
	results := bloomFilter([]int{3, 7, 11}, []int{}, 16, 3)
	if len(results) != 0 {
		t.Errorf("expected empty results for empty queries, got %d", len(results))
	}
}

func TestBloomFilterLargerBitArrayNoFalseNegatives(t *testing.T) {
	elements := []int{100, 200, 300}
	results := bloomFilter(elements, elements, 512, 5)
	for _, entry := range results {
		if !entry.found {
			t.Errorf("expected no false negatives with large bit array, but %d was not found", entry.value)
		}
	}
}
