package main

import "testing"

func TestLongestCommonSubsequenceAbcbdabBdcab(t *testing.T) {
	if longestCommonSubsequence("ABCBDAB", "BDCAB") != 4 {
		t.Error("expected 4")
	}
}

func TestLongestCommonSubsequenceSourceEmpty(t *testing.T) {
	if longestCommonSubsequence("", "abc") != 0 {
		t.Error("expected 0 when source empty")
	}
}

func TestLongestCommonSubsequenceTargetEmpty(t *testing.T) {
	if longestCommonSubsequence("abc", "") != 0 {
		t.Error("expected 0 when target empty")
	}
}

func TestLongestCommonSubsequenceTwoEmptyStrings(t *testing.T) {
	if longestCommonSubsequence("", "") != 0 {
		t.Error("expected 0 for two empty strings")
	}
}

func TestLongestCommonSubsequenceIdenticalStrings(t *testing.T) {
	if longestCommonSubsequence("abc", "abc") != 3 {
		t.Error("expected 3 for identical strings")
	}
}

func TestLongestCommonSubsequenceNoSharedChars(t *testing.T) {
	if longestCommonSubsequence("abc", "xyz") != 0 {
		t.Error("expected 0 for no shared characters")
	}
}

func TestLongestCommonSubsequenceSingleSharedChar(t *testing.T) {
	if longestCommonSubsequence("a", "a") != 1 {
		t.Error("expected 1")
	}
}

func TestLongestCommonSubsequenceSingleCharsDiffer(t *testing.T) {
	if longestCommonSubsequence("a", "b") != 0 {
		t.Error("expected 0")
	}
}

func TestLongestCommonSubsequenceAggtabGxtxayb(t *testing.T) {
	if longestCommonSubsequence("AGGTAB", "GXTXAYB") != 4 {
		t.Error("expected 4")
	}
}

func TestLongestCommonSubsequenceAbcAc(t *testing.T) {
	if longestCommonSubsequence("ABC", "AC") != 2 {
		t.Error("expected 2")
	}
}

func TestLongestCommonSubsequenceRepeatedChars(t *testing.T) {
	if longestCommonSubsequence("aaa", "aa") != 2 {
		t.Error("expected 2")
	}
}

func TestLongestCommonSubsequenceAbB(t *testing.T) {
	if longestCommonSubsequence("AB", "B") != 1 {
		t.Error("expected 1")
	}
}

func TestLongestCommonSubsequenceAbcdeAce(t *testing.T) {
	if longestCommonSubsequence("ABCDE", "ACE") != 3 {
		t.Error("expected 3")
	}
}

func TestLongestCommonSubsequenceXmjyauzMzjawxu(t *testing.T) {
	if longestCommonSubsequence("XMJYAUZ", "MZJAWXU") != 4 {
		t.Error("expected 4")
	}
}
