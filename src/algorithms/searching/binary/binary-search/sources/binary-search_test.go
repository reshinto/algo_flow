package main

import "testing"

func TestBinarySearchFindsValuePresent(t *testing.T) {
	result := binarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 23)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestBinarySearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := binarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestBinarySearchHandlesEmptyArray(t *testing.T) {
	result := binarySearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestBinarySearchSingleElementFound(t *testing.T) {
	result := binarySearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestBinarySearchSingleElementNotFound(t *testing.T) {
	result := binarySearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestBinarySearchFindsFirstElement(t *testing.T) {
	result := binarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestBinarySearchFindsLastElement(t *testing.T) {
	result := binarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestBinarySearchFindsMiddleElement(t *testing.T) {
	result := binarySearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestBinarySearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := binarySearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestBinarySearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := binarySearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}
