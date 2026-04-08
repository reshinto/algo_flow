package main

import "testing"

func TestSqrtBinarySearchExactSquareRoot(t *testing.T) {
	result := sqrtBinarySearch(49)
	if result != 7 {
		t.Errorf("expected 7, got %d", result)
	}
}

func TestSqrtBinarySearchFloorSquareRoot(t *testing.T) {
	result := sqrtBinarySearch(8)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestSqrtBinarySearchZero(t *testing.T) {
	result := sqrtBinarySearch(0)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestSqrtBinarySearchOne(t *testing.T) {
	result := sqrtBinarySearch(1)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestSqrtBinarySearchFour(t *testing.T) {
	result := sqrtBinarySearch(4)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestSqrtBinarySearchNine(t *testing.T) {
	result := sqrtBinarySearch(9)
	if result != 3 {
		t.Errorf("expected 3, got %d", result)
	}
}

func TestSqrtBinarySearchSixteen(t *testing.T) {
	result := sqrtBinarySearch(16)
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestSqrtBinarySearchFloorTwo(t *testing.T) {
	result := sqrtBinarySearch(2)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestSqrtBinarySearchFloorThree(t *testing.T) {
	result := sqrtBinarySearch(3)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestSqrtBinarySearchHundred(t *testing.T) {
	result := sqrtBinarySearch(100)
	if result != 10 {
		t.Errorf("expected 10, got %d", result)
	}
}

func TestSqrtBinarySearchFloorNinetyNine(t *testing.T) {
	result := sqrtBinarySearch(99)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestSqrtBinarySearchOneFourtyFour(t *testing.T) {
	result := sqrtBinarySearch(144)
	if result != 12 {
		t.Errorf("expected 12, got %d", result)
	}
}

func TestSqrtBinarySearchFloorTen(t *testing.T) {
	result := sqrtBinarySearch(10)
	if result != 3 {
		t.Errorf("expected 3, got %d", result)
	}
}
