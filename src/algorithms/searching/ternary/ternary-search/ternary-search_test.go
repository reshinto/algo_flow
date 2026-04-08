package main

import "testing"

func TestTernarySearchFindsValuePresent(t *testing.T) {
	result := ternarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 72)
	if result != 8 {
		t.Errorf("expected 8, got %d", result)
	}
}

func TestTernarySearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := ternarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestTernarySearchHandlesEmptyArray(t *testing.T) {
	result := ternarySearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestTernarySearchSingleElementFound(t *testing.T) {
	result := ternarySearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestTernarySearchSingleElementNotFound(t *testing.T) {
	result := ternarySearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestTernarySearchFindsFirstElement(t *testing.T) {
	result := ternarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestTernarySearchFindsLastElement(t *testing.T) {
	result := ternarySearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestTernarySearchFindsMiddleElement(t *testing.T) {
	result := ternarySearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestTernarySearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := ternarySearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestTernarySearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := ternarySearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestTernarySearchHandlesNegativeNumbers(t *testing.T) {
	result := ternarySearch([]int{-10, -5, 0, 3, 7}, -5)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestTernarySearchFindsElementInTwoElementArray(t *testing.T) {
	result := ternarySearch([]int{1, 2}, 2)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestTernarySearchFindsElementAtMid1Position(t *testing.T) {
	result := ternarySearch([]int{1, 2, 3, 4, 5, 6, 7, 8, 9}, 4)
	if result != 3 {
		t.Errorf("expected 3, got %d", result)
	}
}

func TestTernarySearchFindsElementAtMid2Position(t *testing.T) {
	result := ternarySearch([]int{1, 2, 3, 4, 5, 6, 7, 8, 9}, 7)
	if result != 6 {
		t.Errorf("expected 6, got %d", result)
	}
}
