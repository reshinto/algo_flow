package main

import "testing"

func TestUniformBinarySearchFindsValuePresent(t *testing.T) {
	result := uniformBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 23)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestUniformBinarySearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := uniformBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestUniformBinarySearchHandlesEmptyArray(t *testing.T) {
	result := uniformBinarySearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestUniformBinarySearchSingleElementFound(t *testing.T) {
	result := uniformBinarySearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestUniformBinarySearchSingleElementNotFound(t *testing.T) {
	result := uniformBinarySearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestUniformBinarySearchFindsFirstElement(t *testing.T) {
	result := uniformBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestUniformBinarySearchFindsLastElement(t *testing.T) {
	result := uniformBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestUniformBinarySearchFindsMiddleElement(t *testing.T) {
	result := uniformBinarySearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestUniformBinarySearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := uniformBinarySearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestUniformBinarySearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := uniformBinarySearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestUniformBinarySearchTwoElementArray(t *testing.T) {
	result := uniformBinarySearch([]int{3, 7}, 7)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestUniformBinarySearchPowerOfTwoLengthArray(t *testing.T) {
	result := uniformBinarySearch([]int{1, 3, 5, 7, 9, 11, 13, 15}, 9)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestUniformBinarySearchFindsValueNearStart(t *testing.T) {
	result := uniformBinarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 5)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}
