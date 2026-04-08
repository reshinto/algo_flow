package main

import "testing"

func TestWordPattern_ReturnsTrueForAbbaDogCatCatDog(t *testing.T) {
	if !wordPattern("abba", "dog cat cat dog") {
		t.Error("expected true")
	}
}

func TestWordPattern_ReturnsFalseWhenCharMapsToTwoWords(t *testing.T) {
	if wordPattern("abba", "dog cat cat fish") {
		t.Error("expected false")
	}
}

func TestWordPattern_ReturnsTrueForAabbDogDogCatCat(t *testing.T) {
	if !wordPattern("aabb", "dog dog cat cat") {
		t.Error("expected true")
	}
}

func TestWordPattern_ReturnsFalseWhenAllSameButPatternVaried(t *testing.T) {
	if wordPattern("aaaa", "dog cat cat dog") {
		t.Error("expected false")
	}
}

func TestWordPattern_ReturnsFalseWhenPatternAndWordCountDiffer(t *testing.T) {
	if wordPattern("abc", "dog cat") {
		t.Error("expected false")
	}
}

func TestWordPattern_ReturnsTrueForSingleCharPattern(t *testing.T) {
	if !wordPattern("a", "dog") {
		t.Error("expected true")
	}
}

func TestWordPattern_ReturnsTrueForIdenticalPatternSameWord(t *testing.T) {
	if !wordPattern("aa", "dog dog") {
		t.Error("expected true")
	}
}

func TestWordPattern_ReturnsFalseWhenBijectionViolated(t *testing.T) {
	if wordPattern("ab", "dog dog") {
		t.Error("expected false")
	}
}

func TestWordPattern_HandlesAllUniqueCharsAndWords(t *testing.T) {
	if !wordPattern("abcd", "one two three four") {
		t.Error("expected true")
	}
}
