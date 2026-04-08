package main

import "testing"

func TestHashSearchFindsValuePresent(t *testing.T) {
	result := hashSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 9)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestHashSearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := hashSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 6)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestHashSearchHandlesEmptyArray(t *testing.T) {
	result := hashSearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestHashSearchSingleElementFound(t *testing.T) {
	result := hashSearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestHashSearchSingleElementNotFound(t *testing.T) {
	result := hashSearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestHashSearchFindsFirstElement(t *testing.T) {
	result := hashSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 4)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestHashSearchFindsLastElement(t *testing.T) {
	result := hashSearch([]int{4, 2, 7, 1, 9, 3, 8, 5}, 5)
	if result != 7 {
		t.Errorf("expected 7, got %d", result)
	}
}

func TestHashSearchFindsMiddleElement(t *testing.T) {
	result := hashSearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestHashSearchReturnsMinusOneForValueNotInArray(t *testing.T) {
	result := hashSearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestHashSearchHandlesNegativeNumbers(t *testing.T) {
	result := hashSearch([]int{-10, -5, 0, 3, 7}, -5)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestHashSearchWorksOnUnsortedArray(t *testing.T) {
	result := hashSearch([]int{9, 3, 1, 7, 2, 5}, 7)
	if result != 3 {
		t.Errorf("expected 3, got %d", result)
	}
}
