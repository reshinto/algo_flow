package main

import "testing"

func TestMinimumWindowSubstringClassicExample(t *testing.T) {
	if minimumWindowSubstring("ADOBECODEBANC", "ABC") != "BANC" {
		t.Error("expected BANC")
	}
}

func TestMinimumWindowSubstringSingleCharMatch(t *testing.T) {
	if minimumWindowSubstring("a", "a") != "a" {
		t.Error("expected 'a'")
	}
}

func TestMinimumWindowSubstringNeedsMoreCharsThanText(t *testing.T) {
	if minimumWindowSubstring("a", "aa") != "" {
		t.Error("expected empty string")
	}
}

func TestMinimumWindowSubstringPatternCharAbsent(t *testing.T) {
	if minimumWindowSubstring("hello", "z") != "" {
		t.Error("expected empty string")
	}
}

func TestMinimumWindowSubstringTextEqualsPattern(t *testing.T) {
	if minimumWindowSubstring("abc", "abc") != "abc" {
		t.Error("expected 'abc'")
	}
}

func TestMinimumWindowSubstringTextShorterThanPattern(t *testing.T) {
	if minimumWindowSubstring("ab", "abc") != "" {
		t.Error("expected empty string")
	}
}

func TestMinimumWindowSubstringDuplicateCharsInPattern(t *testing.T) {
	if minimumWindowSubstring("ADOBECODEBANC", "AABC") != "ADOBECODEBA" {
		t.Error("expected ADOBECODEBA")
	}
}

func TestMinimumWindowSubstringMultipleValidWindows(t *testing.T) {
	if minimumWindowSubstring("cabwefgewcwaefgcf", "cae") != "cwae" {
		t.Error("expected 'cwae'")
	}
}

func TestMinimumWindowSubstringSingleCharAtEnd(t *testing.T) {
	if minimumWindowSubstring("abcdef", "f") != "f" {
		t.Error("expected 'f'")
	}
}

func TestMinimumWindowSubstringEmptyPattern(t *testing.T) {
	if minimumWindowSubstring("abc", "") != "" {
		t.Error("expected empty string for empty pattern")
	}
}

func TestMinimumWindowSubstringAllSameChars(t *testing.T) {
	if minimumWindowSubstring("aaabbbccc", "b") != "b" {
		t.Error("expected 'b'")
	}
}

func TestMinimumWindowSubstringSpansFullText(t *testing.T) {
	if minimumWindowSubstring("abc", "cba") != "abc" {
		t.Error("expected 'abc'")
	}
}
