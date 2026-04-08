package main

import "testing"

func TestLongestPalindromicSubstringBabad(t *testing.T) {
	result := longestPalindromicSubstring("babad")
	if result != "bab" && result != "aba" {
		t.Errorf("expected 'bab' or 'aba', got: %s", result)
	}
}

func TestLongestPalindromicSubstringCbbd(t *testing.T) {
	if longestPalindromicSubstring("cbbd") != "bb" {
		t.Error("expected 'bb'")
	}
}

func TestLongestPalindromicSubstringSingleChar(t *testing.T) {
	if longestPalindromicSubstring("a") != "a" {
		t.Error("expected 'a'")
	}
}

func TestLongestPalindromicSubstringEmptyString(t *testing.T) {
	if longestPalindromicSubstring("") != "" {
		t.Error("expected empty string")
	}
}

func TestLongestPalindromicSubstringFullPalindrome(t *testing.T) {
	if longestPalindromicSubstring("racecar") != "racecar" {
		t.Error("expected 'racecar'")
	}
}

func TestLongestPalindromicSubstringEvenLengthPalindrome(t *testing.T) {
	if longestPalindromicSubstring("abba") != "abba" {
		t.Error("expected 'abba'")
	}
}

func TestLongestPalindromicSubstringAllSameChars(t *testing.T) {
	if longestPalindromicSubstring("aaaa") != "aaaa" {
		t.Error("expected 'aaaa'")
	}
}

func TestLongestPalindromicSubstringAllUniqueChars(t *testing.T) {
	result := longestPalindromicSubstring("abcde")
	if len(result) != 1 {
		t.Errorf("expected length 1, got: %d", len(result))
	}
}

func TestLongestPalindromicSubstringEmbeddedPalindrome(t *testing.T) {
	if longestPalindromicSubstring("xyzracecarabc") != "racecar" {
		t.Error("expected 'racecar'")
	}
}

func TestLongestPalindromicSubstringEvenPalindromeEmbedded(t *testing.T) {
	if longestPalindromicSubstring("xyzabbadef") != "abba" {
		t.Error("expected 'abba'")
	}
}

func TestLongestPalindromicSubstringTwoCharPalindrome(t *testing.T) {
	if longestPalindromicSubstring("aa") != "aa" {
		t.Error("expected 'aa'")
	}
}

func TestLongestPalindromicSubstringTwoCharNonPalindrome(t *testing.T) {
	result := longestPalindromicSubstring("ab")
	if len(result) != 1 {
		t.Errorf("expected length 1, got: %d", len(result))
	}
}
