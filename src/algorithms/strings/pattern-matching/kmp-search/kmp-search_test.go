package main

import "testing"

func TestKmpSearchPatternAtStart(t *testing.T) {
	if kmpSearch("ABCDEF", "ABC") != 0 {
		t.Error("expected 0")
	}
}

func TestKmpSearchPatternInMiddle(t *testing.T) {
	if kmpSearch("ABABDABACDABABCABAB", "ABABCABAB") != 10 {
		t.Error("expected 10")
	}
}

func TestKmpSearchPatternAtEnd(t *testing.T) {
	if kmpSearch("XYZABC", "ABC") != 3 {
		t.Error("expected 3")
	}
}

func TestKmpSearchPatternNotFound(t *testing.T) {
	if kmpSearch("ABCDEFG", "XYZ") != -1 {
		t.Error("expected -1")
	}
}

func TestKmpSearchSingleCharFound(t *testing.T) {
	if kmpSearch("HELLO", "L") != 2 {
		t.Error("expected 2")
	}
}

func TestKmpSearchSingleCharNotFound(t *testing.T) {
	if kmpSearch("HELLO", "Z") != -1 {
		t.Error("expected -1")
	}
}

func TestKmpSearchEmptyPattern(t *testing.T) {
	if kmpSearch("HELLO", "") != 0 {
		t.Error("expected 0 for empty pattern")
	}
}

func TestKmpSearchTextEqualsPattern(t *testing.T) {
	if kmpSearch("ABCD", "ABCD") != 0 {
		t.Error("expected 0")
	}
}

func TestKmpSearchPatternLongerThanText(t *testing.T) {
	if kmpSearch("AB", "ABCD") != -1 {
		t.Error("expected -1")
	}
}

func TestKmpSearchRepeatedCharacters(t *testing.T) {
	if kmpSearch("AAAAAB", "AAAB") != 2 {
		t.Error("expected 2")
	}
}
