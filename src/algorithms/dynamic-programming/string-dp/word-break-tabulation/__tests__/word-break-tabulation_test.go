package main

import "testing"

func TestWordBreakTabulationLeetcode(t *testing.T) {
	if !wordBreakTabulation("leetcode", []string{"leet", "code"}) {
		t.Errorf("leetcode should return true")
	}
}

func TestWordBreakTabulationApplepenapple(t *testing.T) {
	if !wordBreakTabulation("applepenapple", []string{"apple", "pen"}) {
		t.Errorf("applepenapple should return true")
	}
}

func TestWordBreakTabulationCatsandog(t *testing.T) {
	if wordBreakTabulation("catsandog", []string{"cats", "dog", "sand", "and", "cat"}) {
		t.Errorf("catsandog should return false")
	}
}

func TestWordBreakTabulationEmpty(t *testing.T) {
	if !wordBreakTabulation("", []string{"a"}) {
		t.Errorf("empty string should return true")
	}
}

func TestWordBreakTabulationCatsanddog(t *testing.T) {
	if !wordBreakTabulation("catsanddog", []string{"cats", "dog", "sand", "and", "cat"}) {
		t.Errorf("catsanddog should return true")
	}
}

func TestWordBreakTabulationNoMatch(t *testing.T) {
	if wordBreakTabulation("hello", []string{"world", "foo"}) {
		t.Errorf("no match should return false")
	}
}

func TestWordBreakTabulationExactMatch(t *testing.T) {
	if !wordBreakTabulation("apple", []string{"apple", "pen"}) {
		t.Errorf("exact match should return true")
	}
}

func TestWordBreakTabulationLeftover(t *testing.T) {
	if wordBreakTabulation("leetcoderr", []string{"leet", "code"}) {
		t.Errorf("leftover should return false")
	}
}
