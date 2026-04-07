package main

import "testing"

func TestLongestSubstringWithoutRepeating_Returns3ForAbcabcbb(t *testing.T) {
	if longestSubstringWithoutRepeating("abcabcbb") != 3 {
		t.Error("expected 3")
	}
}

func TestLongestSubstringWithoutRepeating_Returns1ForBbbbb(t *testing.T) {
	if longestSubstringWithoutRepeating("bbbbb") != 1 {
		t.Error("expected 1")
	}
}

func TestLongestSubstringWithoutRepeating_Returns3ForPwwkew(t *testing.T) {
	if longestSubstringWithoutRepeating("pwwkew") != 3 {
		t.Error("expected 3")
	}
}

func TestLongestSubstringWithoutRepeating_Returns0ForEmptyString(t *testing.T) {
	if longestSubstringWithoutRepeating("") != 0 {
		t.Error("expected 0")
	}
}

func TestLongestSubstringWithoutRepeating_Returns1ForSingleChar(t *testing.T) {
	if longestSubstringWithoutRepeating("a") != 1 {
		t.Error("expected 1")
	}
}

func TestLongestSubstringWithoutRepeating_Returns5ForAbcde(t *testing.T) {
	if longestSubstringWithoutRepeating("abcde") != 5 {
		t.Error("expected 5")
	}
}

func TestLongestSubstringWithoutRepeating_Returns2ForAbba(t *testing.T) {
	if longestSubstringWithoutRepeating("abba") != 2 {
		t.Error("expected 2")
	}
}

func TestLongestSubstringWithoutRepeating_Returns3ForDvdf(t *testing.T) {
	if longestSubstringWithoutRepeating("dvdf") != 3 {
		t.Error("expected 3")
	}
}
