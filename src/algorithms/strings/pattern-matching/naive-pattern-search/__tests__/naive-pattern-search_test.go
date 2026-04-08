package main

import "testing"

func TestNaivePatternSearchPatternAtStart(t *testing.T) {
	if naivePatternSearch("ABCDEF", "ABC") != 0 {
		t.Error("expected 0")
	}
}

func TestNaivePatternSearchPatternInMiddle(t *testing.T) {
	if naivePatternSearch("AABAACAADAABAABA", "AABA") != 0 {
		t.Error("expected 0")
	}
}

func TestNaivePatternSearchPatternAtEnd(t *testing.T) {
	if naivePatternSearch("XYZABC", "ABC") != 3 {
		t.Error("expected 3")
	}
}

func TestNaivePatternSearchPatternNotFound(t *testing.T) {
	if naivePatternSearch("ABCDEFG", "XYZ") != -1 {
		t.Error("expected -1")
	}
}

func TestNaivePatternSearchSingleCharFound(t *testing.T) {
	if naivePatternSearch("HELLO", "L") != 2 {
		t.Error("expected 2")
	}
}

func TestNaivePatternSearchSingleCharNotFound(t *testing.T) {
	if naivePatternSearch("HELLO", "Z") != -1 {
		t.Error("expected -1")
	}
}

func TestNaivePatternSearchEmptyPattern(t *testing.T) {
	if naivePatternSearch("HELLO", "") != 0 {
		t.Error("expected 0 for empty pattern")
	}
}

func TestNaivePatternSearchTextEqualsPattern(t *testing.T) {
	if naivePatternSearch("ABCD", "ABCD") != 0 {
		t.Error("expected 0")
	}
}

func TestNaivePatternSearchPatternLongerThanText(t *testing.T) {
	if naivePatternSearch("AB", "ABCD") != -1 {
		t.Error("expected -1")
	}
}

func TestNaivePatternSearchRepeatedChars(t *testing.T) {
	if naivePatternSearch("AAAAAB", "AAAB") != 2 {
		t.Error("expected 2")
	}
}

func TestNaivePatternSearchWorstCase(t *testing.T) {
	if naivePatternSearch("AAAAAAB", "AAAAB") != 2 {
		t.Error("expected 2")
	}
}
