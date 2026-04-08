package maxproductsubarray

import "testing"

func TestDefaultInput(t *testing.T) {
	product, _, _ := maxProductSubarray([]int{2, 3, -2, 4, -1, 2})
	if product != 96 {
		t.Errorf("Expected 96, got %d", product)
	}
}

func TestAllPositive(t *testing.T) {
	product, _, _ := maxProductSubarray([]int{1, 2, 3, 4})
	if product != 24 {
		t.Errorf("Expected 24, got %d", product)
	}
}

func TestWithZero(t *testing.T) {
	product, _, _ := maxProductSubarray([]int{2, 3, 0, 4, 5})
	if product != 20 {
		t.Errorf("Expected 20, got %d", product)
	}
}

func TestSingleElement(t *testing.T) {
	product, start, end := maxProductSubarray([]int{7})
	if product != 7 || start != 0 || end != 0 {
		t.Errorf("Expected product=7 start=0 end=0, got %d %d %d", product, start, end)
	}
}

func TestTwoNegatives(t *testing.T) {
	product, _, _ := maxProductSubarray([]int{-2, -3})
	if product != 6 {
		t.Errorf("Expected 6, got %d", product)
	}
}

func TestNegativeFlip(t *testing.T) {
	product, _, _ := maxProductSubarray([]int{-2, 3, -4})
	if product != 24 {
		t.Errorf("Expected 24, got %d", product)
	}
}

func TestEmptyArray(t *testing.T) {
	product, _, _ := maxProductSubarray([]int{})
	if product != 0 {
		t.Errorf("Expected 0, got %d", product)
	}
}

func TestValidIndices(t *testing.T) {
	inputArray := []int{2, 3, -2, 4, -1, 2}
	_, start, end := maxProductSubarray(inputArray)
	if start > end || end >= len(inputArray) {
		t.Errorf("Invalid indices: start=%d end=%d len=%d", start, end, len(inputArray))
	}
}
