package main

import "testing"

func TestJumpSearchFindsValuePresent(t *testing.T) {
	result := jumpSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 56)
	if result != 7 {
		t.Errorf("expected 7, got %d", result)
	}
}

func TestJumpSearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := jumpSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestJumpSearchHandlesEmptyArray(t *testing.T) {
	result := jumpSearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestJumpSearchSingleElementFound(t *testing.T) {
	result := jumpSearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestJumpSearchSingleElementNotFound(t *testing.T) {
	result := jumpSearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestJumpSearchFindsFirstElement(t *testing.T) {
	result := jumpSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestJumpSearchFindsLastElement(t *testing.T) {
	result := jumpSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestJumpSearchFindsMiddleElement(t *testing.T) {
	result := jumpSearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestJumpSearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := jumpSearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestJumpSearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := jumpSearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestJumpSearchHandlesNegativeNumbers(t *testing.T) {
	result := jumpSearch([]int{-10, -5, 0, 3, 7}, -5)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestJumpSearchFindsSecondElementInTwoElementArray(t *testing.T) {
	result := jumpSearch([]int{1, 2}, 2)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}
