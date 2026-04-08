package main

import "testing"

func TestLongestCommonSubstringAbabcBabcba(t *testing.T) {
	if longestCommonSubstring("ABABC", "BABCBA") != 4 {
		t.Error("expected 4")
	}
}

func TestLongestCommonSubstringSourceEmpty(t *testing.T) {
	if longestCommonSubstring("", "abc") != 0 {
		t.Error("expected 0 when source empty")
	}
}

func TestLongestCommonSubstringTargetEmpty(t *testing.T) {
	if longestCommonSubstring("abc", "") != 0 {
		t.Error("expected 0 when target empty")
	}
}

func TestLongestCommonSubstringTwoEmptyStrings(t *testing.T) {
	if longestCommonSubstring("", "") != 0 {
		t.Error("expected 0 for two empty strings")
	}
}

func TestLongestCommonSubstringIdenticalStrings(t *testing.T) {
	if longestCommonSubstring("abc", "abc") != 3 {
		t.Error("expected 3 for identical strings")
	}
}

func TestLongestCommonSubstringCompletelyDifferent(t *testing.T) {
	if longestCommonSubstring("abc", "xyz") != 0 {
		t.Error("expected 0 for completely different strings")
	}
}

func TestLongestCommonSubstringSingleMatchingChar(t *testing.T) {
	if longestCommonSubstring("abc", "xbz") != 1 {
		t.Error("expected 1")
	}
}

func TestLongestCommonSubstringSingleCharMatch(t *testing.T) {
	if longestCommonSubstring("a", "a") != 1 {
		t.Error("expected 1")
	}
}

func TestLongestCommonSubstringSingleCharDiffer(t *testing.T) {
	if longestCommonSubstring("a", "b") != 0 {
		t.Error("expected 0")
	}
}

func TestLongestCommonSubstringAtBeginning(t *testing.T) {
	if longestCommonSubstring("abcdef", "abcxyz") != 3 {
		t.Error("expected 3")
	}
}

func TestLongestCommonSubstringAtEnd(t *testing.T) {
	if longestCommonSubstring("xyzabc", "defabc") != 3 {
		t.Error("expected 3")
	}
}

func TestLongestCommonSubstringPickLongest(t *testing.T) {
	if longestCommonSubstring("abXYZcd", "abXYcd") != 4 {
		t.Error("expected 4")
	}
}

func TestLongestCommonSubstringRepeatedChars(t *testing.T) {
	if longestCommonSubstring("aaaa", "aa") != 2 {
		t.Error("expected 2")
	}
}
