package main

import "testing"

func TestRabinKarpSearchPatternAtStart(t *testing.T) {
	if rabinKarpSearch("ABCDEF", "ABC") != 0 {
		t.Error("expected 0")
	}
}

func TestRabinKarpSearchPatternInMiddle(t *testing.T) {
	if rabinKarpSearch("GEEKS FOR GEEKS", "GEEK") != 0 {
		t.Error("expected 0")
	}
}

func TestRabinKarpSearchPatternAtEnd(t *testing.T) {
	if rabinKarpSearch("XYZABC", "ABC") != 3 {
		t.Error("expected 3")
	}
}

func TestRabinKarpSearchPatternNotFound(t *testing.T) {
	if rabinKarpSearch("ABCDEFG", "XYZ") != -1 {
		t.Error("expected -1")
	}
}

func TestRabinKarpSearchSingleCharFound(t *testing.T) {
	if rabinKarpSearch("HELLO", "L") != 2 {
		t.Error("expected 2")
	}
}

func TestRabinKarpSearchSingleCharNotFound(t *testing.T) {
	if rabinKarpSearch("HELLO", "Z") != -1 {
		t.Error("expected -1")
	}
}

func TestRabinKarpSearchEmptyPattern(t *testing.T) {
	if rabinKarpSearch("HELLO", "") != 0 {
		t.Error("expected 0 for empty pattern")
	}
}

func TestRabinKarpSearchTextEqualsPattern(t *testing.T) {
	if rabinKarpSearch("ABCD", "ABCD") != 0 {
		t.Error("expected 0")
	}
}

func TestRabinKarpSearchPatternLongerThanText(t *testing.T) {
	if rabinKarpSearch("AB", "ABCD") != -1 {
		t.Error("expected -1")
	}
}

func TestRabinKarpSearchRepeatedChars(t *testing.T) {
	if rabinKarpSearch("AAAAAB", "AAAB") != 2 {
		t.Error("expected 2")
	}
}

func TestRabinKarpSearchFullTextPattern(t *testing.T) {
	if rabinKarpSearch("ABABCABAB", "ABABCABAB") != 0 {
		t.Error("expected 0")
	}
}

func TestRabinKarpSearchForInGeeks(t *testing.T) {
	if rabinKarpSearch("GEEKS FOR GEEKS", "FOR") != 6 {
		t.Error("expected 6")
	}
}
