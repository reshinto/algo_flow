package main

import "testing"

func TestInterpolationSearchFindsValuePresent(t *testing.T) {
	result := interpolationSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 23)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestInterpolationSearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := interpolationSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestInterpolationSearchHandlesEmptyArray(t *testing.T) {
	result := interpolationSearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestInterpolationSearchSingleElementFound(t *testing.T) {
	result := interpolationSearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestInterpolationSearchSingleElementNotFound(t *testing.T) {
	result := interpolationSearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestInterpolationSearchFindsFirstElement(t *testing.T) {
	result := interpolationSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestInterpolationSearchFindsLastElement(t *testing.T) {
	result := interpolationSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestInterpolationSearchFindsMiddleElement(t *testing.T) {
	result := interpolationSearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestInterpolationSearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := interpolationSearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestInterpolationSearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := interpolationSearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestInterpolationSearchHandlesUniformlyDistributedData(t *testing.T) {
	result := interpolationSearch([]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}, 70)
	if result != 6 {
		t.Errorf("expected 6, got %d", result)
	}
}

func TestInterpolationSearchHandlesDuplicateValues(t *testing.T) {
	result := interpolationSearch([]int{5, 5, 5, 5, 5}, 5)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestInterpolationSearchReturnsMinusOneForTargetNotInUniformArray(t *testing.T) {
	result := interpolationSearch([]int{5, 5, 5, 5, 5}, 7)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}
