package findmissingnumber

import "testing"

func TestBasicCase(t *testing.T) {
	if findMissingNumber([]int{3, 0, 1}) != 2 {
		t.Error("Expected 2")
	}
}

func TestMissingZero(t *testing.T) {
	if findMissingNumber([]int{1, 2, 3}) != 0 {
		t.Error("Expected 0")
	}
}

func TestMissingN(t *testing.T) {
	if findMissingNumber([]int{0, 1, 2}) != 3 {
		t.Error("Expected 3")
	}
}

func TestSingleElementZero(t *testing.T) {
	if findMissingNumber([]int{0}) != 1 {
		t.Error("Expected 1")
	}
}

func TestSingleElementOne(t *testing.T) {
	if findMissingNumber([]int{1}) != 0 {
		t.Error("Expected 0")
	}
}

func TestEmptyArray(t *testing.T) {
	if findMissingNumber([]int{}) != 0 {
		t.Error("Expected 0")
	}
}

func TestMissingFour(t *testing.T) {
	if findMissingNumber([]int{0, 1, 2, 3, 5, 6, 7, 8, 9}) != 4 {
		t.Error("Expected 4")
	}
}

func TestUnsortedMissingTwo(t *testing.T) {
	if findMissingNumber([]int{0, 1, 3, 4, 5, 6, 7}) != 2 {
		t.Error("Expected 2")
	}
}
