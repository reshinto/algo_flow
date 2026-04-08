package main

import "testing"

func TestIntegerBreakTabulationN2(t *testing.T) {
	if integerBreakTabulation(2) != 1 {
		t.Errorf("n=2 should return 1")
	}
}

func TestIntegerBreakTabulationN3(t *testing.T) {
	if integerBreakTabulation(3) != 2 {
		t.Errorf("n=3 should return 2")
	}
}

func TestIntegerBreakTabulationN4(t *testing.T) {
	if integerBreakTabulation(4) != 4 {
		t.Errorf("n=4 should return 4")
	}
}

func TestIntegerBreakTabulationN5(t *testing.T) {
	if integerBreakTabulation(5) != 6 {
		t.Errorf("n=5 should return 6")
	}
}

func TestIntegerBreakTabulationN6(t *testing.T) {
	if integerBreakTabulation(6) != 9 {
		t.Errorf("n=6 should return 9")
	}
}

func TestIntegerBreakTabulationN8(t *testing.T) {
	if integerBreakTabulation(8) != 18 {
		t.Errorf("n=8 should return 18")
	}
}

func TestIntegerBreakTabulationN10(t *testing.T) {
	if integerBreakTabulation(10) != 36 {
		t.Errorf("n=10 should return 36")
	}
}
