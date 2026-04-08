package main

import "testing"

func TestLongestWordInTrieFullChain(t *testing.T) {
	if longestWordInTrie([]string{"w", "wo", "wor", "worl", "world"}) != "world" {
		t.Error("expected 'world'")
	}
}

func TestLongestWordInTrieEmptyList(t *testing.T) {
	if longestWordInTrie([]string{}) != "" {
		t.Error("expected empty string")
	}
}

func TestLongestWordInTrieSingleCharWord(t *testing.T) {
	if longestWordInTrie([]string{"a"}) != "a" {
		t.Error("expected 'a'")
	}
}

func TestLongestWordInTrieNoWordWithAllPrefixes(t *testing.T) {
	if longestWordInTrie([]string{"world"}) != "" {
		t.Error("expected empty string")
	}
}

func TestLongestWordInTrieFullAppleChain(t *testing.T) {
	if longestWordInTrie([]string{"a", "ap", "app", "appl", "apple"}) != "apple" {
		t.Error("expected 'apple'")
	}
}

func TestLongestWordInTrieLexicographicallySmallestOnTie(t *testing.T) {
	if longestWordInTrie([]string{"b", "ba", "c", "ca"}) != "ba" {
		t.Error("expected 'ba'")
	}
}

func TestLongestWordInTrieSkipsIncompleteChain(t *testing.T) {
	if longestWordInTrie([]string{"d", "dog"}) != "d" {
		t.Error("expected 'd'")
	}
}

func TestLongestWordInTrieEmptyWordsWithNoPrefixes(t *testing.T) {
	if longestWordInTrie([]string{"abc", "def", "ghi"}) != "" {
		t.Error("expected empty string")
	}
}

func TestLongestWordInTriePicksLongerCompetingChain(t *testing.T) {
	if longestWordInTrie([]string{"a", "ab", "abc", "x", "xy"}) != "abc" {
		t.Error("expected 'abc'")
	}
}

func TestLongestWordInTrieDuplicateWords(t *testing.T) {
	if longestWordInTrie([]string{"a", "a", "ab", "ab"}) != "ab" {
		t.Error("expected 'ab'")
	}
}

func TestLongestWordInTrieLexSmallestSingleChars(t *testing.T) {
	if longestWordInTrie([]string{"b", "c"}) != "b" {
		t.Error("expected 'b'")
	}
}
