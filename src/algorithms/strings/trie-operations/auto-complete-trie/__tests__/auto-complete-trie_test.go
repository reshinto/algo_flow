package main

import (
	"sort"
	"testing"
)

func sortStrings(input []string) []string {
	result := make([]string, len(input))
	copy(result, input)
	sort.Strings(result)
	return result
}

func containsString(slice []string, val string) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}

func TestAutoCompleteTrieMatchesPrefix(t *testing.T) {
	result := autoCompleteTrie([]string{"apple", "app", "apricot", "banana", "bat"}, "ap")
	expected := []string{"app", "apple", "apricot"}
	if len(result) != 3 {
		t.Errorf("expected 3 results, got: %d", len(result))
		return
	}
	for _, word := range expected {
		if !containsString(result, word) {
			t.Errorf("expected '%s' in result", word)
		}
	}
}

func TestAutoCompleteTrieSingleWordMatch(t *testing.T) {
	result := autoCompleteTrie([]string{"apple", "banana", "cherry"}, "ban")
	if len(result) != 1 || result[0] != "banana" {
		t.Error("expected ['banana']")
	}
}

func TestAutoCompleteTrieNoMatch(t *testing.T) {
	result := autoCompleteTrie([]string{"apple", "app", "apricot"}, "ba")
	if len(result) != 0 {
		t.Error("expected empty result")
	}
}

func TestAutoCompleteTriePrefixNotInTrie(t *testing.T) {
	result := autoCompleteTrie([]string{"apple", "app"}, "xyz")
	if len(result) != 0 {
		t.Error("expected empty result")
	}
}

func TestAutoCompleteTrieEmptyWordList(t *testing.T) {
	result := autoCompleteTrie([]string{}, "ap")
	if len(result) != 0 {
		t.Error("expected empty result")
	}
}

func TestAutoCompleteTriePrefixEqualsFullWord(t *testing.T) {
	result := autoCompleteTrie([]string{"apple", "app", "apricot"}, "app")
	if len(result) != 2 {
		t.Errorf("expected 2 results, got: %d", len(result))
		return
	}
	if !containsString(result, "app") || !containsString(result, "apple") {
		t.Error("expected app and apple")
	}
}

func TestAutoCompleteTrieSingleWordDictMatch(t *testing.T) {
	result := autoCompleteTrie([]string{"hello"}, "hel")
	if len(result) != 1 || result[0] != "hello" {
		t.Error("expected ['hello']")
	}
}

func TestAutoCompleteTrieSingleWordDictNoMatch(t *testing.T) {
	result := autoCompleteTrie([]string{"hello"}, "world")
	if len(result) != 0 {
		t.Error("expected empty result")
	}
}

func TestAutoCompleteTrieSingleCharPrefix(t *testing.T) {
	result := autoCompleteTrie([]string{"apple", "apricot", "banana"}, "a")
	if len(result) != 2 {
		t.Errorf("expected 2 results, got: %d", len(result))
		return
	}
	if !containsString(result, "apple") || !containsString(result, "apricot") {
		t.Error("expected apple and apricot")
	}
}
