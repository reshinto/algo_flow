package main

import "testing"

func TestFibonacciTabulationF0(t *testing.T) {
	if fibonacciTabulation(0) != 0 {
		t.Errorf("F(0) should be 0")
	}
}

func TestFibonacciTabulationF1(t *testing.T) {
	if fibonacciTabulation(1) != 1 {
		t.Errorf("F(1) should be 1")
	}
}

func TestFibonacciTabulationF2(t *testing.T) {
	if fibonacciTabulation(2) != 1 {
		t.Errorf("F(2) should be 1")
	}
}

func TestFibonacciTabulationF8(t *testing.T) {
	if fibonacciTabulation(8) != 21 {
		t.Errorf("F(8) should be 21")
	}
}

func TestFibonacciTabulationF10(t *testing.T) {
	if fibonacciTabulation(10) != 55 {
		t.Errorf("F(10) should be 55")
	}
}

func TestFibonacciTabulationF15(t *testing.T) {
	if fibonacciTabulation(15) != 610 {
		t.Errorf("F(15) should be 610")
	}
}
