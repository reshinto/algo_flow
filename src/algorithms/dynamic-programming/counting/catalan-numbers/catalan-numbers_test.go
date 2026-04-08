package main

import "testing"

func TestCatalanNumberC0(t *testing.T) {
	if catalanNumber(0) != 1 {
		t.Errorf("C(0) should be 1")
	}
}

func TestCatalanNumberC1(t *testing.T) {
	if catalanNumber(1) != 1 {
		t.Errorf("C(1) should be 1")
	}
}

func TestCatalanNumberC2(t *testing.T) {
	if catalanNumber(2) != 2 {
		t.Errorf("C(2) should be 2")
	}
}

func TestCatalanNumberC3(t *testing.T) {
	if catalanNumber(3) != 5 {
		t.Errorf("C(3) should be 5")
	}
}

func TestCatalanNumberC5(t *testing.T) {
	if catalanNumber(5) != 42 {
		t.Errorf("C(5) should be 42")
	}
}

func TestCatalanNumberC8(t *testing.T) {
	if catalanNumber(8) != 1430 {
		t.Errorf("C(8) should be 1430")
	}
}
