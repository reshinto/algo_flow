package heaps

import "testing"

func TestUglyNumberIiN10(t *testing.T) {
	if uglyNumberIi(10) != 12 {
		t.Error("Expected 12")
	}
}

func TestUglyNumberIiN1(t *testing.T) {
	if uglyNumberIi(1) != 1 {
		t.Error("Expected 1")
	}
}

func TestUglyNumberIiN2(t *testing.T) {
	if uglyNumberIi(2) != 2 {
		t.Error("Expected 2")
	}
}

func TestUglyNumberIiN6(t *testing.T) {
	if uglyNumberIi(6) != 6 {
		t.Error("Expected 6")
	}
}

func TestUglyNumberIiN15(t *testing.T) {
	if uglyNumberIi(15) != 24 {
		t.Error("Expected 24")
	}
}

func TestUglyNumberIiKnownSequence(t *testing.T) {
	uglySequence := []int64{1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24}
	for position, expected := range uglySequence {
		result := uglyNumberIi(position + 1)
		if result != expected {
			t.Errorf("Position %d: expected %d, got %d", position+1, expected, result)
		}
	}
}
