package singlenumber

import "testing"

func TestBasicArray(t *testing.T) {
	result := singleNumber([]int{4, 1, 2, 1, 2})
	if result != 4 {
		t.Errorf("Expected 4, got %d", result)
	}
}

func TestSingleElement(t *testing.T) {
	result := singleNumber([]int{42})
	if result != 42 {
		t.Errorf("Expected 42, got %d", result)
	}
}

func TestUniqueAtEnd(t *testing.T) {
	result := singleNumber([]int{1, 1, 2, 2, 3})
	if result != 3 {
		t.Errorf("Expected 3, got %d", result)
	}
}

func TestUniqueAtStart(t *testing.T) {
	result := singleNumber([]int{5, 3, 3, 7, 7})
	if result != 5 {
		t.Errorf("Expected 5, got %d", result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := singleNumber([]int{})
	if result != 0 {
		t.Errorf("Expected 0, got %d", result)
	}
}

func TestNegativeNumbers(t *testing.T) {
	result := singleNumber([]int{-1, 2, -1})
	if result != 2 {
		t.Errorf("Expected 2, got %d", result)
	}
}

func TestLargerArray(t *testing.T) {
	result := singleNumber([]int{1, 2, 3, 4, 5, 99, 5, 4, 3, 2, 1})
	if result != 99 {
		t.Errorf("Expected 99, got %d", result)
	}
}

func TestUniqueZero(t *testing.T) {
	result := singleNumber([]int{1, 2, 1, 2, 0})
	if result != 0 {
		t.Errorf("Expected 0, got %d", result)
	}
}
