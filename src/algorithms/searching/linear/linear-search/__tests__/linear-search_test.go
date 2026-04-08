package main

import "testing"

func TestLinearSearchFindsValuePresent(t *testing.T) {
	result := linearSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 9)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestLinearSearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := linearSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 6)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestLinearSearchHandlesEmptyArray(t *testing.T) {
	result := linearSearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestLinearSearchSingleElementFound(t *testing.T) {
	result := linearSearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestLinearSearchSingleElementNotFound(t *testing.T) {
	result := linearSearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestLinearSearchFindsFirstElement(t *testing.T) {
	result := linearSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 4)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestLinearSearchFindsLastElement(t *testing.T) {
	result := linearSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 5)
	if result != 7 {
		t.Errorf("expected 7, got %d", result)
	}
}

func TestLinearSearchReturnsFirstOccurrenceForDuplicates(t *testing.T) {
	result := linearSearch([]int{3, 1, 3, 5, 3}, 3)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestLinearSearchHandlesNegativeNumbers(t *testing.T) {
	result := linearSearch([]int{-5, -3, 0, 2, 4}, -3)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestLinearSearchWorksOnUnsortedArray(t *testing.T) {
	result := linearSearch([]int{9, 3, 1, 7, 2, 5}, 7)
	if result != 3 {
		t.Errorf("expected 3, got %d", result)
	}
}
