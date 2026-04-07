package main

import (
	"sort"
	"testing"
)

func sortedStrings(input []string) []string {
	result := make([]string, len(input))
	copy(result, input)
	sort.Strings(result)
	return result
}

func containsStr(slice []string, val string) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}

func TestAhoCorasickSearchClassicExample(t *testing.T) {
	result := ahoCorasickSearch("ahishers", []string{"he", "she", "his", "hers"})
	expected := []string{"he", "hers", "his", "she"}
	if len(result) != 4 {
		t.Errorf("expected 4 patterns, got: %d", len(result))
		return
	}
	for _, pattern := range expected {
		if !containsStr(result, pattern) {
			t.Errorf("expected pattern '%s' in result", pattern)
		}
	}
}

func TestAhoCorasickSearchNoPatternsFound(t *testing.T) {
	result := ahoCorasickSearch("hello world", []string{"xyz", "abc"})
	if len(result) != 0 {
		t.Error("expected empty result")
	}
}

func TestAhoCorasickSearchEmptyPatternsList(t *testing.T) {
	result := ahoCorasickSearch("hello", []string{})
	if len(result) != 0 {
		t.Error("expected empty result for empty patterns")
	}
}

func TestAhoCorasickSearchEmptyText(t *testing.T) {
	result := ahoCorasickSearch("", []string{"hello", "world"})
	if len(result) != 0 {
		t.Error("expected empty result for empty text")
	}
}

func TestAhoCorasickSearchSinglePatternFound(t *testing.T) {
	result := ahoCorasickSearch("banana", []string{"nan"})
	if len(result) != 1 || result[0] != "nan" {
		t.Error("expected ['nan']")
	}
}

func TestAhoCorasickSearchDeduplication(t *testing.T) {
	result := ahoCorasickSearch("aaaa", []string{"aa"})
	if len(result) != 1 || !containsStr(result, "aa") {
		t.Error("expected exactly one 'aa'")
	}
}

func TestAhoCorasickSearchReturnsOnlyFound(t *testing.T) {
	result := ahoCorasickSearch("cat", []string{"cat", "dog", "bird"})
	if len(result) != 1 || result[0] != "cat" {
		t.Error("expected ['cat']")
	}
}

func TestAhoCorasickSearchCaseSensitive(t *testing.T) {
	result := ahoCorasickSearch("Hello", []string{"hello"})
	if len(result) != 0 {
		t.Error("expected empty result for case-mismatched pattern")
	}
}

func TestAhoCorasickSearchPatternAtEnd(t *testing.T) {
	result := ahoCorasickSearch("xyzabc", []string{"abc"})
	if len(result) != 1 || result[0] != "abc" {
		t.Error("expected ['abc']")
	}
}

func TestAhoCorasickSearchPatternAtStart(t *testing.T) {
	result := ahoCorasickSearch("abcxyz", []string{"abc"})
	if len(result) != 1 || result[0] != "abc" {
		t.Error("expected ['abc']")
	}
}
