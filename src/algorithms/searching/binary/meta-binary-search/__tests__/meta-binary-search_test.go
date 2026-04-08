package main

import "testing"

func TestMetaBinarySearchFindsValuePresent(t *testing.T) {
	result := metaBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 23)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestMetaBinarySearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := metaBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestMetaBinarySearchHandlesEmptyArray(t *testing.T) {
	result := metaBinarySearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestMetaBinarySearchSingleElementFound(t *testing.T) {
	result := metaBinarySearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestMetaBinarySearchSingleElementNotFound(t *testing.T) {
	result := metaBinarySearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestMetaBinarySearchFindsFirstElement(t *testing.T) {
	result := metaBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestMetaBinarySearchFindsLastElement(t *testing.T) {
	result := metaBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestMetaBinarySearchFindsMiddleElement(t *testing.T) {
	result := metaBinarySearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestMetaBinarySearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := metaBinarySearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestMetaBinarySearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := metaBinarySearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestMetaBinarySearchFindsElementInTwoElementArray(t *testing.T) {
	result := metaBinarySearch([]int{3, 7}, 7)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestMetaBinarySearchHandlesPowerOfTwoLengthArray(t *testing.T) {
	result := metaBinarySearch([]int{1, 3, 5, 7, 9, 11, 13, 15}, 9)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}
