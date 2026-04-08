package main

import "testing"

func fib(targetIndex int) int {
	memo := make(map[int]int)
	return fibonacciMemoization(targetIndex, memo)
}

func TestFibonacciMemoizationF0(t *testing.T) {
	if fib(0) != 0 {
		t.Errorf("F(0) should be 0")
	}
}

func TestFibonacciMemoizationF1(t *testing.T) {
	if fib(1) != 1 {
		t.Errorf("F(1) should be 1")
	}
}

func TestFibonacciMemoizationF2(t *testing.T) {
	if fib(2) != 1 {
		t.Errorf("F(2) should be 1")
	}
}

func TestFibonacciMemoizationF8(t *testing.T) {
	if fib(8) != 21 {
		t.Errorf("F(8) should be 21")
	}
}

func TestFibonacciMemoizationF10(t *testing.T) {
	if fib(10) != 55 {
		t.Errorf("F(10) should be 55")
	}
}

func TestFibonacciMemoizationF15(t *testing.T) {
	if fib(15) != 610 {
		t.Errorf("F(15) should be 610")
	}
}

func TestFibonacciMemoizationFullSequence(t *testing.T) {
	expected := []int{0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55}
	for targetIndex, expectedValue := range expected {
		if fib(targetIndex) != expectedValue {
			t.Errorf("F(%d) expected %d", targetIndex, expectedValue)
		}
	}
}
