package main

import (
	"strings"
	"testing"
)

func TestLongestRepeatedSubstringBanana(t *testing.T) {
	if longestRepeatedSubstring("banana") != "ana" {
		t.Error("expected 'ana'")
	}
}

func TestLongestRepeatedSubstringNoRepeat(t *testing.T) {
	if longestRepeatedSubstring("abcd") != "" {
		t.Error("expected empty string")
	}
}

func TestLongestRepeatedSubstringAab(t *testing.T) {
	if longestRepeatedSubstring("aab") != "a" {
		t.Error("expected 'a'")
	}
}

func TestLongestRepeatedSubstringSingleChar(t *testing.T) {
	if longestRepeatedSubstring("a") != "" {
		t.Error("expected empty string")
	}
}

func TestLongestRepeatedSubstringEmptyString(t *testing.T) {
	if longestRepeatedSubstring("") != "" {
		t.Error("expected empty string")
	}
}

func TestLongestRepeatedSubstringAbabcResult(t *testing.T) {
	if longestRepeatedSubstring("ababc") != "ab" {
		t.Error("expected 'ab'")
	}
}

func TestLongestRepeatedSubstringAllSame(t *testing.T) {
	result := longestRepeatedSubstring("aaa")
	if len(result) == 0 || !strings.Contains("aaa", result) {
		t.Errorf("expected non-empty substring of 'aaa', got: %s", result)
	}
}

func TestLongestRepeatedSubstringTwoIdenticalChars(t *testing.T) {
	if longestRepeatedSubstring("aa") != "a" {
		t.Error("expected 'a'")
	}
}

func TestLongestRepeatedSubstringTwoDifferentChars(t *testing.T) {
	if longestRepeatedSubstring("ab") != "" {
		t.Error("expected empty string")
	}
}

func TestLongestRepeatedSubstringAbcabc(t *testing.T) {
	if longestRepeatedSubstring("abcabc") != "abc" {
		t.Error("expected 'abc'")
	}
}

func TestLongestRepeatedSubstringMississippi(t *testing.T) {
	result := longestRepeatedSubstring("mississippi")
	if len(result) == 0 {
		t.Error("expected non-empty result for mississippi")
	}
	haystack := "mississippi"
	firstIdx := strings.Index(haystack, result)
	secondIdx := strings.Index(haystack[firstIdx+1:], result)
	if secondIdx == -1 {
		t.Errorf("expected repeated occurrence of '%s' in 'mississippi'", result)
	}
}

func TestLongestRepeatedSubstringNumericLike(t *testing.T) {
	if longestRepeatedSubstring("121212") != "1212" {
		t.Error("expected '1212'")
	}
}
