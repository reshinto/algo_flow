package main

import "testing"

func TestRemoveKDigitsThreeFrom1432219(t *testing.T) {
	if removeKDigits("1432219", 3) != "1219" {
		t.Errorf("expected '1219'")
	}
}

func TestRemoveKDigitsOneFrom10200(t *testing.T) {
	if removeKDigits("10200", 1) != "200" {
		t.Errorf("expected '200'")
	}
}

func TestRemoveKDigitsAllFrom10(t *testing.T) {
	if removeKDigits("10", 2) != "0" {
		t.Errorf("expected '0'")
	}
}

func TestRemoveKDigitsNoRemovals(t *testing.T) {
	if removeKDigits("12345", 0) != "12345" {
		t.Errorf("expected '12345'")
	}
}

func TestRemoveKDigitsLeadingZeros(t *testing.T) {
	if removeKDigits("100", 1) != "0" {
		t.Errorf("expected '0'")
	}
}

func TestRemoveKDigitsSingleDigit(t *testing.T) {
	if removeKDigits("9", 1) != "0" {
		t.Errorf("expected '0'")
	}
}

func TestRemoveKDigitsNonDecreasing(t *testing.T) {
	if removeKDigits("12345", 3) != "12" {
		t.Errorf("expected '12'")
	}
}

func TestRemoveKDigitsRepeated(t *testing.T) {
	if removeKDigits("1111111", 3) != "1111" {
		t.Errorf("expected '1111'")
	}
}

func TestRemoveKDigitsDecreasing(t *testing.T) {
	if removeKDigits("9876", 2) != "76" {
		t.Errorf("expected '76'")
	}
}

func TestRemoveKDigitsKEqualsLength(t *testing.T) {
	if removeKDigits("12345", 5) != "0" {
		t.Errorf("expected '0'")
	}
}
