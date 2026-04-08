package main

import "testing"

func TestValidAnagram_ReturnsTrueForAnagramNagaram(t *testing.T) {
	if !validAnagram("anagram", "nagaram") {
		t.Error("expected true")
	}
}

func TestValidAnagram_ReturnsFalseForRatCar(t *testing.T) {
	if validAnagram("rat", "car") {
		t.Error("expected false")
	}
}

func TestValidAnagram_ReturnsFalseForDifferentLengths(t *testing.T) {
	if validAnagram("ab", "abc") {
		t.Error("expected false")
	}
}

func TestValidAnagram_ReturnsTrueForIdenticalSingleChars(t *testing.T) {
	if !validAnagram("a", "a") {
		t.Error("expected true")
	}
}

func TestValidAnagram_ReturnsFalseForDifferentSingleChars(t *testing.T) {
	if validAnagram("a", "b") {
		t.Error("expected false")
	}
}

func TestValidAnagram_ReturnsTrueForEmptyStrings(t *testing.T) {
	if !validAnagram("", "") {
		t.Error("expected true")
	}
}

func TestValidAnagram_ReturnsTrueForIdenticalStrings(t *testing.T) {
	if !validAnagram("listen", "listen") {
		t.Error("expected true")
	}
}

func TestValidAnagram_ReturnsTrueForListenSilent(t *testing.T) {
	if !validAnagram("listen", "silent") {
		t.Error("expected true")
	}
}

func TestValidAnagram_ReturnsFalseWhenExtraRepeatedChar(t *testing.T) {
	if validAnagram("aab", "aaa") {
		t.Error("expected false")
	}
}

func TestValidAnagram_IsCaseSensitive(t *testing.T) {
	if validAnagram("Aa", "aa") {
		t.Error("expected false")
	}
}
