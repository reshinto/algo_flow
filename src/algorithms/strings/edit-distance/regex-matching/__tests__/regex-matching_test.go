package main

import "testing"

func TestRegexMatchingAabCStarAStarB(t *testing.T) {
	if !regexMatching("aab", "c*a*b") {
		t.Error("expected true")
	}
}

func TestRegexMatchingAaAFalse(t *testing.T) {
	if regexMatching("aa", "a") {
		t.Error("expected false")
	}
}

func TestRegexMatchingAbDotStar(t *testing.T) {
	if !regexMatching("ab", ".*") {
		t.Error("expected true")
	}
}

func TestRegexMatchingEmptyMatchesEmpty(t *testing.T) {
	if !regexMatching("", "") {
		t.Error("expected true")
	}
}

func TestRegexMatchingAaAStar(t *testing.T) {
	if !regexMatching("aa", "a*") {
		t.Error("expected true")
	}
}

func TestRegexMatchingAaDotStar(t *testing.T) {
	if !regexMatching("aa", ".*") {
		t.Error("expected true")
	}
}

func TestRegexMatchingAabCStarAStarFalse(t *testing.T) {
	if regexMatching("aab", "c*a*") {
		t.Error("expected false")
	}
}

func TestRegexMatchingMississippi(t *testing.T) {
	if regexMatching("mississippi", "mis*is*p*.") {
		t.Error("expected false")
	}
}

func TestRegexMatchingAbDotStarCFalse(t *testing.T) {
	if regexMatching("ab", ".*c") {
		t.Error("expected false")
	}
}

func TestRegexMatchingADot(t *testing.T) {
	if !regexMatching("a", ".") {
		t.Error("expected true")
	}
}

func TestRegexMatchingBAFalse(t *testing.T) {
	if regexMatching("b", "a") {
		t.Error("expected false")
	}
}

func TestRegexMatchingEmptyAStar(t *testing.T) {
	if !regexMatching("", "a*") {
		t.Error("expected true")
	}
}

func TestRegexMatchingAaaAStarA(t *testing.T) {
	if !regexMatching("aaa", "a*a") {
		t.Error("expected true")
	}
}

func TestRegexMatchingAbcADotC(t *testing.T) {
	if !regexMatching("abc", "a.c") {
		t.Error("expected true")
	}
}
