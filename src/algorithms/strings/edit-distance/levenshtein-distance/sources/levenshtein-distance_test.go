package main

import "testing"

func TestLevenshteinDistanceKittenSitting(t *testing.T) {
	if levenshteinDistance("kitten", "sitting") != 3 {
		t.Error("expected 3 for kitten->sitting")
	}
}

func TestLevenshteinDistanceSourceEmpty(t *testing.T) {
	if levenshteinDistance("", "abc") != 3 {
		t.Error("expected 3 when source is empty")
	}
}

func TestLevenshteinDistanceTargetEmpty(t *testing.T) {
	if levenshteinDistance("abc", "") != 3 {
		t.Error("expected 3 when target is empty")
	}
}

func TestLevenshteinDistanceIdenticalStrings(t *testing.T) {
	if levenshteinDistance("abc", "abc") != 0 {
		t.Error("expected 0 for identical strings")
	}
}

func TestLevenshteinDistanceTwoEmptyStrings(t *testing.T) {
	if levenshteinDistance("", "") != 0 {
		t.Error("expected 0 for two empty strings")
	}
}

func TestLevenshteinDistanceSingleInsertion(t *testing.T) {
	if levenshteinDistance("cat", "cats") != 1 {
		t.Error("expected 1 for single insertion")
	}
}

func TestLevenshteinDistanceSingleDeletion(t *testing.T) {
	if levenshteinDistance("cats", "cat") != 1 {
		t.Error("expected 1 for single deletion")
	}
}

func TestLevenshteinDistanceSingleReplacement(t *testing.T) {
	if levenshteinDistance("cat", "bat") != 1 {
		t.Error("expected 1 for single replacement")
	}
}

func TestLevenshteinDistanceCompletelyDifferent(t *testing.T) {
	if levenshteinDistance("abc", "xyz") != 3 {
		t.Error("expected 3 for completely different strings")
	}
}

func TestLevenshteinDistanceSundaySaturday(t *testing.T) {
	if levenshteinDistance("sunday", "saturday") != 3 {
		t.Error("expected 3 for sunday->saturday")
	}
}

func TestLevenshteinDistanceSingleCharMatch(t *testing.T) {
	if levenshteinDistance("a", "a") != 0 {
		t.Error("expected 0 for same single char")
	}
}

func TestLevenshteinDistanceSingleCharDiffer(t *testing.T) {
	if levenshteinDistance("a", "b") != 1 {
		t.Error("expected 1 for different single chars")
	}
}

func TestLevenshteinDistanceRepeatedCharacters(t *testing.T) {
	if levenshteinDistance("aaa", "aa") != 1 {
		t.Error("expected 1 for repeated character deletion")
	}
}
