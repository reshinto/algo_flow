package main

import "testing"

func ibreak(targetNumber int) int {
	memo := make(map[int]int)
	return integerBreakMemoization(targetNumber, memo)
}

func TestIntegerBreakMemoizationN2(t *testing.T) {
	if ibreak(2) != 1 {
		t.Errorf("n=2 should return 1")
	}
}

func TestIntegerBreakMemoizationN3(t *testing.T) {
	if ibreak(3) != 2 {
		t.Errorf("n=3 should return 2")
	}
}

func TestIntegerBreakMemoizationN4(t *testing.T) {
	if ibreak(4) != 4 {
		t.Errorf("n=4 should return 4")
	}
}

func TestIntegerBreakMemoizationN5(t *testing.T) {
	if ibreak(5) != 6 {
		t.Errorf("n=5 should return 6")
	}
}

func TestIntegerBreakMemoizationN6(t *testing.T) {
	if ibreak(6) != 9 {
		t.Errorf("n=6 should return 9")
	}
}

func TestIntegerBreakMemoizationN8(t *testing.T) {
	if ibreak(8) != 18 {
		t.Errorf("n=8 should return 18")
	}
}

func TestIntegerBreakMemoizationN10(t *testing.T) {
	if ibreak(10) != 36 {
		t.Errorf("n=10 should return 36")
	}
}

func TestIntegerBreakMemoizationN13(t *testing.T) {
	if ibreak(13) != 108 {
		t.Errorf("n=13 should return 108")
	}
}
