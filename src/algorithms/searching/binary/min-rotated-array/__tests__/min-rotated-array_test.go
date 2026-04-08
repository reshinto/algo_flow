package main

import "testing"

func TestMinRotatedArrayFindsMinimum(t *testing.T) {
	result := minRotatedArray([]int{4, 5, 6, 7, 0, 1, 2})
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestMinRotatedArrayNotRotated(t *testing.T) {
	result := minRotatedArray([]int{1, 2, 3, 4, 5})
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestMinRotatedArrayRotationAtLastPosition(t *testing.T) {
	result := minRotatedArray([]int{2, 3, 4, 5, 1})
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestMinRotatedArraySingleElement(t *testing.T) {
	result := minRotatedArray([]int{42})
	if result != 42 {
		t.Errorf("expected 42, got %d", result)
	}
}

func TestMinRotatedArrayTwoElementRotated(t *testing.T) {
	result := minRotatedArray([]int{2, 1})
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestMinRotatedArrayTwoElementNotRotated(t *testing.T) {
	result := minRotatedArray([]int{1, 2})
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestMinRotatedArrayMinAtIndexZero(t *testing.T) {
	result := minRotatedArray([]int{0, 1, 2, 4, 5, 6, 7})
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestMinRotatedArrayLargerRotationOffset(t *testing.T) {
	result := minRotatedArray([]int{11, 13, 15, 17, 2, 5, 6, 7})
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestMinRotatedArrayMinimumAtLastPosition(t *testing.T) {
	result := minRotatedArray([]int{3, 4, 5, 6, 7, 8, 1})
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestMinRotatedArrayMinimumAtPivot(t *testing.T) {
	result := minRotatedArray([]int{6, 7, 0, 1, 2, 3, 4, 5})
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestMinRotatedArrayThreeElements(t *testing.T) {
	result := minRotatedArray([]int{3, 1, 2})
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestMinRotatedArrayMinimumAtMiddle(t *testing.T) {
	result := minRotatedArray([]int{5, 6, 7, 1, 2, 3, 4})
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}
