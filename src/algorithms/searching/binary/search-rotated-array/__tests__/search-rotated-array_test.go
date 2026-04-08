package main

import "testing"

func TestSearchRotatedArrayFindsTargetInRotatedArray(t *testing.T) {
	result := searchRotatedArray([]int{4, 5, 6, 7, 0, 1, 2}, 0)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestSearchRotatedArrayFindsTargetInLeftSortedHalf(t *testing.T) {
	result := searchRotatedArray([]int{4, 5, 6, 7, 0, 1, 2}, 5)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestSearchRotatedArrayFindsTargetInRightSortedHalf(t *testing.T) {
	result := searchRotatedArray([]int{4, 5, 6, 7, 0, 1, 2}, 1)
	if result != 5 {
		t.Errorf("expected 5, got %d", result)
	}
}

func TestSearchRotatedArrayReturnsMinusOneWhenNotFound(t *testing.T) {
	result := searchRotatedArray([]int{4, 5, 6, 7, 0, 1, 2}, 3)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestSearchRotatedArrayFindsTargetInNonRotatedArray(t *testing.T) {
	result := searchRotatedArray([]int{1, 2, 3, 4, 5, 6, 7}, 4)
	if result != 3 {
		t.Errorf("expected 3, got %d", result)
	}
}

func TestSearchRotatedArrayFindsTargetAtRotationPivot(t *testing.T) {
	result := searchRotatedArray([]int{6, 7, 0, 1, 2, 3, 4, 5}, 6)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSearchRotatedArraySingleElementFound(t *testing.T) {
	result := searchRotatedArray([]int{5}, 5)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSearchRotatedArraySingleElementNotFound(t *testing.T) {
	result := searchRotatedArray([]int{5}, 3)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestSearchRotatedArrayFindsTargetAtLastIndex(t *testing.T) {
	result := searchRotatedArray([]int{3, 4, 5, 1, 2}, 2)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestSearchRotatedArrayFindsTargetAtFirstIndex(t *testing.T) {
	result := searchRotatedArray([]int{3, 4, 5, 1, 2}, 3)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSearchRotatedArrayTwoElementRotated(t *testing.T) {
	result := searchRotatedArray([]int{2, 1}, 1)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestSearchRotatedArrayTwoElementFindingFirst(t *testing.T) {
	result := searchRotatedArray([]int{2, 1}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSearchRotatedArrayReturnsMinusOneForEmptyArray(t *testing.T) {
	result := searchRotatedArray([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}
