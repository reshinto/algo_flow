package main

import "testing"

func TestBoyerMooreSearchPatternAtStart(t *testing.T) {
	if boyerMooreSearch("ABCDEF", "ABC") != 0 {
		t.Error("expected 0")
	}
}

func TestBoyerMooreSearchPatternInMiddle(t *testing.T) {
	if boyerMooreSearch("ABAAABCD", "ABC") != 4 {
		t.Error("expected 4")
	}
}

func TestBoyerMooreSearchPatternAtEnd(t *testing.T) {
	if boyerMooreSearch("XYZABC", "ABC") != 3 {
		t.Error("expected 3")
	}
}

func TestBoyerMooreSearchPatternNotFound(t *testing.T) {
	if boyerMooreSearch("ABCDEFG", "XYZ") != -1 {
		t.Error("expected -1")
	}
}

func TestBoyerMooreSearchSingleCharFound(t *testing.T) {
	if boyerMooreSearch("HELLO", "L") != 2 {
		t.Error("expected 2")
	}
}

func TestBoyerMooreSearchSingleCharNotFound(t *testing.T) {
	if boyerMooreSearch("HELLO", "Z") != -1 {
		t.Error("expected -1")
	}
}

func TestBoyerMooreSearchEmptyPattern(t *testing.T) {
	if boyerMooreSearch("HELLO", "") != 0 {
		t.Error("expected 0 for empty pattern")
	}
}

func TestBoyerMooreSearchTextEqualsPattern(t *testing.T) {
	if boyerMooreSearch("ABCD", "ABCD") != 0 {
		t.Error("expected 0")
	}
}

func TestBoyerMooreSearchPatternLongerThanText(t *testing.T) {
	if boyerMooreSearch("AB", "ABCD") != -1 {
		t.Error("expected -1")
	}
}

func TestBoyerMooreSearchRepeatedChars(t *testing.T) {
	if boyerMooreSearch("AAAAABCD", "ABCD") != 4 {
		t.Error("expected 4")
	}
}

func TestBoyerMooreSearchMultipleShifts(t *testing.T) {
	if boyerMooreSearch("GCATCGCAGAGAGTATACAGTACG", "GCAGAGAG") != 5 {
		t.Error("expected 5")
	}
}

func TestBoyerMooreSearchNoRepeatedChars(t *testing.T) {
	if boyerMooreSearch("ABCDEFGHIJK", "DEF") != 3 {
		t.Error("expected 3")
	}
}
