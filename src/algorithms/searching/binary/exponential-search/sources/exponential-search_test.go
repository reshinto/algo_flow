package main

import "testing"

func TestExponentialSearchFindsValuePresent(t *testing.T) {
	result := exponentialSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 8)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestExponentialSearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := exponentialSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestExponentialSearchHandlesEmptyArray(t *testing.T) {
	result := exponentialSearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestExponentialSearchSingleElementFound(t *testing.T) {
	result := exponentialSearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestExponentialSearchSingleElementNotFound(t *testing.T) {
	result := exponentialSearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestExponentialSearchFindsFirstElement(t *testing.T) {
	result := exponentialSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestExponentialSearchFindsLastElement(t *testing.T) {
	result := exponentialSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestExponentialSearchFindsMiddleElement(t *testing.T) {
	result := exponentialSearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestExponentialSearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := exponentialSearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestExponentialSearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := exponentialSearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestExponentialSearchFindsValueInTwoElementArray(t *testing.T) {
	result := exponentialSearch([]int{3, 7}, 7)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestExponentialSearchHandlesLargeArray(t *testing.T) {
	largeArray := make([]int, 1000)
	for index := range largeArray {
		largeArray[index] = index * 2
	}
	result := exponentialSearch(largeArray, 500)
	if result != 250 {
		t.Errorf("expected 250, got %d", result)
	}
}

func TestExponentialSearchFindsTargetNearBeginning(t *testing.T) {
	largeArray := make([]int, 1000)
	for index := range largeArray {
		largeArray[index] = index + 1
	}
	result := exponentialSearch(largeArray, 3)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}
