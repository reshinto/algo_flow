package main

import "testing"

func TestWordBreakMemoizationLeetcode(t *testing.T) {
	if !wordBreakMemoization("leetcode", []string{"leet", "code"}) {
		t.Errorf("leetcode should return true")
	}
}

func TestWordBreakMemoizationCatsandog(t *testing.T) {
	if wordBreakMemoization("catsandog", []string{"cats", "dog", "sand", "and", "cat"}) {
		t.Errorf("catsandog should return false")
	}
}

func TestWordBreakMemoizationEmptyString(t *testing.T) {
	if !wordBreakMemoization("", []string{"leet", "code"}) {
		t.Errorf("empty string should return true")
	}
}

func TestWordBreakMemoizationExactMatch(t *testing.T) {
	if !wordBreakMemoization("leet", []string{"leet", "code"}) {
		t.Errorf("exact match should return true")
	}
}

func TestWordBreakMemoizationNoMatch(t *testing.T) {
	if wordBreakMemoization("abcd", []string{"leet", "code"}) {
		t.Errorf("no match should return false")
	}
}

func TestWordBreakMemoizationApplepenapple(t *testing.T) {
	if !wordBreakMemoization("applepenapple", []string{"apple", "pen"}) {
		t.Errorf("applepenapple should return true")
	}
}

func TestWordBreakMemoizationCatsanddog(t *testing.T) {
	if !wordBreakMemoization("catsanddog", []string{"cat", "cats", "and", "sand", "dog"}) {
		t.Errorf("catsanddog should return true")
	}
}

func TestWordBreakMemoizationAaaaab(t *testing.T) {
	if wordBreakMemoization("aaaaab", []string{"a", "aa", "aaa", "aaaa"}) {
		t.Errorf("aaaaab should return false")
	}
}
