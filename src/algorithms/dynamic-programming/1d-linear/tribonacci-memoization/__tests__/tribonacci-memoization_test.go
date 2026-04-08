package main

import "testing"

func TestTribonacciMemoizationT0(t *testing.T) {
	memo := make(map[int]int)
	if tribonacciMemoization(0, memo) != 0 {
		t.Errorf("T(0) should be 0")
	}
}

func TestTribonacciMemoizationT1(t *testing.T) {
	memo := make(map[int]int)
	if tribonacciMemoization(1, memo) != 1 {
		t.Errorf("T(1) should be 1")
	}
}

func TestTribonacciMemoizationT2(t *testing.T) {
	memo := make(map[int]int)
	if tribonacciMemoization(2, memo) != 1 {
		t.Errorf("T(2) should be 1")
	}
}

func TestTribonacciMemoizationT4(t *testing.T) {
	memo := make(map[int]int)
	if tribonacciMemoization(4, memo) != 4 {
		t.Errorf("T(4) should be 4")
	}
}

func TestTribonacciMemoizationT7(t *testing.T) {
	memo := make(map[int]int)
	if tribonacciMemoization(7, memo) != 24 {
		t.Errorf("T(7) should be 24")
	}
}

func TestTribonacciMemoizationT10(t *testing.T) {
	memo := make(map[int]int)
	if tribonacciMemoization(10, memo) != 149 {
		t.Errorf("T(10) should be 149")
	}
}

func TestTribonacciMemoizationSequence(t *testing.T) {
	expected := []int{0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149}
	for targetIndex, expectedValue := range expected {
		memo := make(map[int]int)
		result := tribonacciMemoization(targetIndex, memo)
		if result != expectedValue {
			t.Errorf("T(%d) expected %d, got %d", targetIndex, expectedValue, result)
		}
	}
}
