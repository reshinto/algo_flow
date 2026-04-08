package main

import "testing"

func TestLowerBoundSearchFindsFirstOccurrenceOfRepeatedValue(t *testing.T) {
	result := lowerBoundSearch([]int{1, 3, 3, 5, 5, 5, 8, 12}, 5)
	if result != 3 {
		t.Errorf("expected 3, got %d", result)
	}
}

func TestLowerBoundSearchFindsExactPosition(t *testing.T) {
	result := lowerBoundSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 23)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestLowerBoundSearchReturnsArrayLengthWhenValueLargerThanAll(t *testing.T) {
	result := lowerBoundSearch([]int{1, 3, 5, 7, 9}, 10)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestLowerBoundSearchReturnsZeroWhenValueSmallerThanFirst(t *testing.T) {
	result := lowerBoundSearch([]int{5, 10, 15, 20}, 3)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestLowerBoundSearchHandlesEmptyArray(t *testing.T) {
	result := lowerBoundSearch([]int{}, 5)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestLowerBoundSearchSingleElementFound(t *testing.T) {
	result := lowerBoundSearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestLowerBoundSearchSingleElementTargetLarger(t *testing.T) {
	result := lowerBoundSearch([]int{42}, 100)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestLowerBoundSearchFindsInsertionPointBetweenElements(t *testing.T) {
	result := lowerBoundSearch([]int{2, 5, 8, 12, 16}, 6)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestLowerBoundSearchHandlesAllDuplicateArray(t *testing.T) {
	result := lowerBoundSearch([]int{5, 5, 5, 5, 5}, 5)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestLowerBoundSearchReturnsArrayLengthForLargerTargetInDuplicateArray(t *testing.T) {
	result := lowerBoundSearch([]int{5, 5, 5, 5, 5}, 6)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestLowerBoundSearchFindsFirstOccurrenceAtArrayStart(t *testing.T) {
	result := lowerBoundSearch([]int{3, 3, 3, 5, 7}, 3)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}
