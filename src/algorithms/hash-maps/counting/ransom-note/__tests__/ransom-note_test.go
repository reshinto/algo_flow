package main

import "testing"

func TestRansomNote_ReturnsTrueWhenMagazineHasExactChars(t *testing.T) {
	if !ransomNote("aa", "aab") {
		t.Error("expected true")
	}
}

func TestRansomNote_ReturnsFalseWhenMagazineLacksRequiredChar(t *testing.T) {
	if ransomNote("a", "b") {
		t.Error("expected false")
	}
}

func TestRansomNote_ReturnsFalseWhenNotEnoughCopies(t *testing.T) {
	if ransomNote("aa", "ab") {
		t.Error("expected false")
	}
}

func TestRansomNote_ReturnsTrueWhenRansomNoteIsEmpty(t *testing.T) {
	if !ransomNote("", "abc") {
		t.Error("expected true")
	}
}

func TestRansomNote_ReturnsTrueWhenBothEmpty(t *testing.T) {
	if !ransomNote("", "") {
		t.Error("expected true")
	}
}

func TestRansomNote_ReturnsFalseWhenNoteNonEmptyMagazineEmpty(t *testing.T) {
	if ransomNote("a", "") {
		t.Error("expected false")
	}
}

func TestRansomNote_ReturnsTrueWithExtraMagazineChars(t *testing.T) {
	if !ransomNote("abc", "aabbcc") {
		t.Error("expected true")
	}
}

func TestRansomNote_ReturnsFalseForCharNotInMagazine(t *testing.T) {
	if ransomNote("z", "abcde") {
		t.Error("expected false")
	}
}

func TestRansomNote_ReturnsTrueForSingleMatchingChar(t *testing.T) {
	if !ransomNote("x", "x") {
		t.Error("expected true")
	}
}

func TestRansomNote_HandlesRepeatedCharsExactCount(t *testing.T) {
	if !ransomNote("aaa", "aaab") {
		t.Error("expected true for 'aaa' in 'aaab'")
	}
	if ransomNote("aaaa", "aaab") {
		t.Error("expected false for 'aaaa' in 'aaab'")
	}
}
