package main

import "testing"

func TestTribonacciTabulationT0(t *testing.T) {
	if tribonacciTabulation(0) != 0 {
		t.Errorf("T(0) should be 0")
	}
}

func TestTribonacciTabulationT1(t *testing.T) {
	if tribonacciTabulation(1) != 1 {
		t.Errorf("T(1) should be 1")
	}
}

func TestTribonacciTabulationT2(t *testing.T) {
	if tribonacciTabulation(2) != 1 {
		t.Errorf("T(2) should be 1")
	}
}

func TestTribonacciTabulationT4(t *testing.T) {
	if tribonacciTabulation(4) != 4 {
		t.Errorf("T(4) should be 4")
	}
}

func TestTribonacciTabulationT7(t *testing.T) {
	if tribonacciTabulation(7) != 24 {
		t.Errorf("T(7) should be 24")
	}
}

func TestTribonacciTabulationT10(t *testing.T) {
	if tribonacciTabulation(10) != 149 {
		t.Errorf("T(10) should be 149")
	}
}
