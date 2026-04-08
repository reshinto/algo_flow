package main

import "testing"

func TestCountMinSketchReturnsResultsForInsertedElements(t *testing.T) {
	results := countMinSketch([]int{3, 3, 7, 7, 7, 11}, []int{3, 7, 11, 5}, 8, 3)
	found := make(map[int]bool)
	for _, entry := range results {
		found[entry.value] = true
	}
	if !found[3] {
		t.Error("expected element 3 in results")
	}
	if !found[7] {
		t.Error("expected element 7 in results")
	}
	if !found[11] {
		t.Error("expected element 11 in results")
	}
}

func TestCountMinSketchDoesNotReturnNonInsertedElement(t *testing.T) {
	results := countMinSketch([]int{3, 3, 7, 7, 7, 11}, []int{3, 7, 11, 5}, 8, 3)
	for _, entry := range results {
		if entry.value == 5 {
			t.Error("element 5 should not appear in results")
		}
	}
}

func TestCountMinSketchEstimatedCountForElement7(t *testing.T) {
	results := countMinSketch([]int{3, 3, 7, 7, 7, 11}, []int{7}, 8, 3)
	var count7 int
	for _, entry := range results {
		if entry.value == 7 {
			count7 = entry.estimatedCount
		}
	}
	if count7 < 3 {
		t.Errorf("expected estimated count for 7 >= 3, got %d", count7)
	}
}

func TestCountMinSketchEmptyElementsReturnsEmptyResults(t *testing.T) {
	results := countMinSketch([]int{}, []int{3, 7}, 8, 3)
	if len(results) != 0 {
		t.Errorf("expected empty results for empty sketch, got %d", len(results))
	}
}

func TestCountMinSketchEmptyQueriesReturnsEmptyResults(t *testing.T) {
	results := countMinSketch([]int{3, 3, 7}, []int{}, 8, 3)
	if len(results) != 0 {
		t.Errorf("expected empty results for empty queries, got %d", len(results))
	}
}

func TestCountMinSketchNeverUndercounts(t *testing.T) {
	results := countMinSketch([]int{1, 1, 1, 2, 2, 3}, []int{1, 2, 3}, 16, 4)
	countMap := make(map[int]int)
	for _, entry := range results {
		countMap[entry.value] = entry.estimatedCount
	}
	if countMap[1] < 3 {
		t.Errorf("expected count of 1 >= 3, got %d", countMap[1])
	}
	if countMap[2] < 2 {
		t.Errorf("expected count of 2 >= 2, got %d", countMap[2])
	}
	if countMap[3] < 1 {
		t.Errorf("expected count of 3 >= 1, got %d", countMap[3])
	}
}

func TestCountMinSketchSingleElementInsertedOnce(t *testing.T) {
	results := countMinSketch([]int{42}, []int{42}, 8, 3)
	if len(results) != 1 {
		t.Errorf("expected 1 result, got %d", len(results))
	}
	if results[0].estimatedCount < 1 {
		t.Errorf("expected estimated count >= 1, got %d", results[0].estimatedCount)
	}
}
