package main

import "testing"

func TestRecursiveBinarySearchFindsValuePresent(t *testing.T) {
	result := recursiveBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 23)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestRecursiveBinarySearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := recursiveBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestRecursiveBinarySearchHandlesEmptyArray(t *testing.T) {
	result := recursiveBinarySearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestRecursiveBinarySearchSingleElementFound(t *testing.T) {
	result := recursiveBinarySearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestRecursiveBinarySearchSingleElementNotFound(t *testing.T) {
	result := recursiveBinarySearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestRecursiveBinarySearchFindsFirstElement(t *testing.T) {
	result := recursiveBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestRecursiveBinarySearchFindsLastElement(t *testing.T) {
	result := recursiveBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestRecursiveBinarySearchFindsMiddleElement(t *testing.T) {
	result := recursiveBinarySearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestRecursiveBinarySearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := recursiveBinarySearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestRecursiveBinarySearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := recursiveBinarySearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestRecursiveBinarySearchFindsValueInTwoElementArray(t *testing.T) {
	result := recursiveBinarySearch([]int{3, 7}, 7)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestRecursiveBinarySearchHandlesLargeArray(t *testing.T) {
	largeArray := make([]int, 1000)
	for index := range largeArray {
		largeArray[index] = index * 2
	}
	result := recursiveBinarySearch(largeArray, 500)
	if result != 250 {
		t.Errorf("expected 250, got %d", result)
	}
}
