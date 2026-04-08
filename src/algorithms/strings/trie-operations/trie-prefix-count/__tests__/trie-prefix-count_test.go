package main

import "testing"

func TestTriePrefixCountCountsSharedPrefix(t *testing.T) {
	if triePrefixCount([]string{"apple", "app", "apricot", "ape"}, "ap") != 4 {
		t.Error("expected 4")
	}
}

func TestTriePrefixCountSingleWordMatch(t *testing.T) {
	if triePrefixCount([]string{"hello"}, "he") != 1 {
		t.Error("expected 1")
	}
}

func TestTriePrefixCountEmptyWordList(t *testing.T) {
	if triePrefixCount([]string{}, "a") != 0 {
		t.Error("expected 0")
	}
}

func TestTriePrefixCountNoWordStartsWithPrefix(t *testing.T) {
	if triePrefixCount([]string{"apple", "app", "apricot"}, "banana") != 0 {
		t.Error("expected 0")
	}
}

func TestTriePrefixCountExactPrefixMatch(t *testing.T) {
	if triePrefixCount([]string{"apple", "app", "apricot", "ape"}, "apple") != 1 {
		t.Error("expected 1")
	}
}

func TestTriePrefixCountPrefixEqualsFullWord(t *testing.T) {
	if triePrefixCount([]string{"app", "apple", "application"}, "app") != 3 {
		t.Error("expected 3")
	}
}

func TestTriePrefixCountPrefixLongerThanStored(t *testing.T) {
	if triePrefixCount([]string{"app"}, "application") != 0 {
		t.Error("expected 0")
	}
}

func TestTriePrefixCountDuplicateWordsCounted(t *testing.T) {
	if triePrefixCount([]string{"apple", "apple"}, "ap") != 2 {
		t.Error("expected 2")
	}
}

func TestTriePrefixCountSingleCharPrefix(t *testing.T) {
	if triePrefixCount([]string{"apple", "ant", "ace"}, "a") != 3 {
		t.Error("expected 3")
	}
}

func TestTriePrefixCountNoCommonPrefix(t *testing.T) {
	if triePrefixCount([]string{"cat", "dog", "bird"}, "c") != 1 {
		t.Error("expected 1")
	}
}

func TestTriePrefixCountEmptyPrefixReturnsZero(t *testing.T) {
	if triePrefixCount([]string{"apple", "app"}, "") != 0 {
		t.Error("expected 0")
	}
}

func TestTriePrefixCountVaryingLengthWords(t *testing.T) {
	if triePrefixCount([]string{"a", "ab", "abc", "abcd"}, "ab") != 3 {
		t.Error("expected 3")
	}
}
