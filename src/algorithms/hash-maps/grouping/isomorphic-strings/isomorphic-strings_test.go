package main

import "testing"

func TestIsomorphicStrings_ReturnsTrueForEggAdd(t *testing.T) {
	if !isomorphicStrings("egg", "add") {
		t.Error("expected true")
	}
}

func TestIsomorphicStrings_ReturnsFalseForFooBar(t *testing.T) {
	if isomorphicStrings("foo", "bar") {
		t.Error("expected false")
	}
}

func TestIsomorphicStrings_ReturnsTrueForPaperTitle(t *testing.T) {
	if !isomorphicStrings("paper", "title") {
		t.Error("expected true")
	}
}

func TestIsomorphicStrings_ReturnsFalseForDifferentLengths(t *testing.T) {
	if isomorphicStrings("ab", "abc") {
		t.Error("expected false")
	}
}

func TestIsomorphicStrings_ReturnsTrueForEmptyStrings(t *testing.T) {
	if !isomorphicStrings("", "") {
		t.Error("expected true")
	}
}

func TestIsomorphicStrings_ReturnsTrueForSingleCharacterStrings(t *testing.T) {
	if !isomorphicStrings("a", "b") {
		t.Error("expected true")
	}
}

func TestIsomorphicStrings_ReturnsFalseForBadcBaba(t *testing.T) {
	if isomorphicStrings("badc", "baba") {
		t.Error("expected false")
	}
}

func TestIsomorphicStrings_ReturnsTrueForIdenticalStrings(t *testing.T) {
	if !isomorphicStrings("abc", "abc") {
		t.Error("expected true")
	}
}
