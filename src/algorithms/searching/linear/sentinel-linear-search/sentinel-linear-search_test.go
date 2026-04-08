package main

import "testing"

func TestSentinelLinearSearchFindsValuePresent(t *testing.T) {
	result := sentinelLinearSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 9)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestSentinelLinearSearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := sentinelLinearSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 6)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestSentinelLinearSearchHandlesEmptyArray(t *testing.T) {
	result := sentinelLinearSearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestSentinelLinearSearchSingleElementFound(t *testing.T) {
	result := sentinelLinearSearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSentinelLinearSearchSingleElementNotFound(t *testing.T) {
	result := sentinelLinearSearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestSentinelLinearSearchFindsFirstElement(t *testing.T) {
	result := sentinelLinearSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 4)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSentinelLinearSearchFindsLastElement(t *testing.T) {
	result := sentinelLinearSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 5)
	if result != 7 {
		t.Errorf("expected 7, got %d", result)
	}
}

func TestSentinelLinearSearchReturnsFirstOccurrenceForDuplicates(t *testing.T) {
	result := sentinelLinearSearch([]int{3, 1, 3, 5, 3}, 3)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSentinelLinearSearchAllIdenticalElementsFound(t *testing.T) {
	result := sentinelLinearSearch([]int{7, 7, 7, 7}, 7)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSentinelLinearSearchAllIdenticalElementsNotFound(t *testing.T) {
	result := sentinelLinearSearch([]int{7, 7, 7, 7}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestSentinelLinearSearchFindsNegativeNumber(t *testing.T) {
	result := sentinelLinearSearch([]int{-5, -3, 0, 2, 4}, -3)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestSentinelLinearSearchReturnsMinusOneForAbsentNegativeTarget(t *testing.T) {
	result := sentinelLinearSearch([]int{-5, -3, 0, 2, 4}, -1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}
