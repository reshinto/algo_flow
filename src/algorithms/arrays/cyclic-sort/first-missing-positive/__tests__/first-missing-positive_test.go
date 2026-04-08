package firstmissingpositive

import "testing"

func TestDefaultInput(t *testing.T) {
	if firstMissingPositive([]int{3, 4, -1, 1, 7, 5, 2}) != 6 {
		t.Error("Expected 6")
	}
}

func TestOneTwoZero(t *testing.T) {
	if firstMissingPositive([]int{1, 2, 0}) != 3 {
		t.Error("Expected 3")
	}
}

func TestThreeFourNegOne(t *testing.T) {
	if firstMissingPositive([]int{3, 4, -1, 1}) != 2 {
		t.Error("Expected 2")
	}
}

func TestLargeValues(t *testing.T) {
	if firstMissingPositive([]int{7, 8, 9, 11, 12}) != 1 {
		t.Error("Expected 1")
	}
}

func TestEmptyArray(t *testing.T) {
	if firstMissingPositive([]int{}) != 1 {
		t.Error("Expected 1")
	}
}

func TestCompleteSequence(t *testing.T) {
	if firstMissingPositive([]int{1, 2, 3, 4, 5}) != 6 {
		t.Error("Expected 6")
	}
}

func TestAllNegative(t *testing.T) {
	if firstMissingPositive([]int{-1, -2, -3}) != 1 {
		t.Error("Expected 1")
	}
}

func TestSingleOne(t *testing.T) {
	if firstMissingPositive([]int{1}) != 2 {
		t.Error("Expected 2")
	}
}

func TestSingleTwo(t *testing.T) {
	if firstMissingPositive([]int{2}) != 1 {
		t.Error("Expected 1")
	}
}

func TestDuplicates(t *testing.T) {
	if firstMissingPositive([]int{1, 1, 2, 2}) != 3 {
		t.Error("Expected 3")
	}
}
